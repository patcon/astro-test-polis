import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Config variables
const SPREADSHEET_ID = process.env.PUBLIC_SPREADSHEET_ID;
const SHEET_ID = process.env.PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY = process.env.GOOGLE_SERVICE_PRIVATE_KEY;

// Source: https://www.mridul.tech/blogs/save-form-data-in-google-sheets-with-next-js
// Source: https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication?id=service-account
const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
];

const jwt = new JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});

// GoogleSpreadsheet Initialize
const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);

// Append Function
const appendSpreadsheet = async (row) => {
  try {
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    await sheet.addRow(row);
  } catch (e) {
    console.error('Error: ', e);
  }
};

export default async (req, context) => {
  switch (req.method) {
    case 'POST':
      const { polisXid, mailchimpUid } = await req.json();
      const newRecord = {
        polisXid,
        mailchimpUid,
        timestamp: new Date(),
        ipAddress: context.ip,
        city: context.geo.city,
        subRegion: context.geo.subdivision.name,
        country: context.geo.country.name,
        requestId: context.requestId,
      };
      appendSpreadsheet(newRecord);

      const responseObj = Object.assign({}, context, { polisXid, mailchimpUid });
      console.log(JSON.stringify(responseObj));
      return new Response(JSON.stringify(responseObj, null, 2));

    default:
      return new Response('Method Not Allowed', { status: 405 });
  }
};

export const config = {
  path: "/api/log-xid"
};