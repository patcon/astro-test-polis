function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Polis')
      // Run this function when the menu item is clicked.
      .addItem('Update statement sheet', 'updateStatementSheet')
      .addToUi();
}

// Allow case-insensitive naming of the sheet.
// Require Polis conversation ID be in parentheses at the end.
const STATEMENT_SHEET_NAME_RE = /^live statements \((?<convoId>[a-z0-9]+)\)/i
// TODO: Allow Config class to use this regex.
// const CONFIG_SHEET_NAME_RE = /^configuration$/i

function getStatementsSheet() {
  const sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets()
  const statementsSheet = sheets.find(sh => sh.getName().match(STATEMENT_SHEET_NAME_RE))

  return statementsSheet
}

function getPolisConvoId() {
  const statementsSheet = getStatementsSheet()
  const match = statementsSheet?.getName().match(STATEMENT_SHEET_NAME_RE)
  const convoId = match?.groups.convoId

  // Logger.log(convoId)
  return convoId
}

function fetchStatements(convoId) {
  var options = {};
  const url = `https://pol.is/api/v3/comments?conversation_id=${convoId}&moderation=true&include_voting_patterns=true`;
  const response = UrlFetchApp.fetch(url, options);
  const allStatements = JSON.parse(response.getContentText());
  // Logger.log(JSON.stringify(allStatements, null, 2));

  return allStatements
}

function convertSheetToObject(sheet) {
  // See: https://hawksey.info/blog/2018/02/google-apps-script-patterns-conditionally-updating-rows-of-google-sheet-data-by-reading-and-writing-data-once/
  const dataRange = sheet.getDataRange()
  // Get values for each row in a range.
  var valuesArray = dataRange.getValues()
  // Get header row.
  const header = valuesArray.shift();

  // Get formulas and slice off the header to align with values.
  const [_, ...formulasArray] = dataRange.getFormulas();
  // Merge those formulas into the valuesArray, to avoid overriding.
  // Source: https://stackoverflow.com/a/54775843
  valuesArray = valuesArray.map((row, i) => {
    return row.map((cell, j) => {
      return formulasArray[i][j] || cell
    })
  })

  // Make array of objects for each row, keyed to header.
  var valuesObject = valuesArray.map(function(values) {
    return header.reduce(function(o, k, i) {
      o[k] = values[i];
      return o;
    }, {});
  });
  // Logger.log(JSON.stringify(valuesObject, null, 2));

  return { dataRange, valuesArray, header, valuesObject}
}

class Config {
  constructor(sheetName = "configuration") {
    this.sheetName = sheetName
    this.transformations = {}
    this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(this.sheetName)

    this.parseConfiguration()
  }

  parseConfiguration() {
    var conf = {transformations: {}}
    const configSheet = this.sheet
    const { valuesObject } = convertSheetToObject(configSheet)
    valuesObject.forEach(row => {
      // Create object level if doesn't exist.
      conf.transformations[row.key] = conf.transformations[row.key] || {}
      conf.transformations[row.key][row.origValue] = row.newValue
    })

    this.transformations = conf.transformations
  }

  getTransformedValue(statement, header) {
    const originalValue = statement[header]
    const newValue = this.transformations?.[header]?.[originalValue]

    return newValue !== undefined ? newValue : originalValue
  }
}

function updateStatementSheet() {
  const CONVO_ID = getPolisConvoId()
  const SHEET_NAME = getStatementsSheet().getName();
  const config = new Config()

  try {
    // Fetch all statements from Polis platform API.
    const allStatements = fetchStatements(CONVO_ID)

    // Get all the cell values.
    var statementsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const {dataRange, valuesArray: data, header, valuesObject: obj} = convertSheetToObject(statementsSheet)

    // For each row of allStatements
    allStatements.forEach((statement) => {
      // Find row in sheet obj with matching statement.tid
      const matchingRowIndex = obj.findIndex(row => row.tid === statement.tid)
      if (matchingRowIndex > -1) {
        // If found, fetch statements values based on header,
        // and if none, use previous cell value.
        data[matchingRowIndex] = header.map((headerVal, i) => {
          const updated = config.getTransformedValue(statement, headerVal)
          const previous = data[matchingRowIndex][i]
          // If value is missing from updated API response
          // (ie. custom columns and formulas), use previous state.
          return updated !== undefined ? updated : previous
        })
      } else {
        // Otherwise, append a new object.
        const newRow = header.map(headerVal => config.getTransformedValue(statement, headerVal))
        data.push(newRow)
        // Logger.log(newRow);
      }
    })

    // Update the sheet with new data, skipping header row.
    dataRange.offset(1, 0, data.length).setValues(data);
  } catch (f) {
      Logger.log(f.message);
  }
}