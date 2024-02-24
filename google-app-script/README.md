# Polis Moderator Spreadsheet Automation

This Google App Script sub-project is intended to help provide a Google
Spreadsheet that makes managing a Polis conversation simpler.

## Features
- Adds menu item to allow populating spreadsheet with basic per-statement data
  automatically. This data includes:
    - `tid` internal statement ID
    - `txt` statement text
    - `mod` moderation status
    - `lang` detected language
    - `*_count` agree/disagree/pass vote counts
    - `created` submission date
    - `is_seed` whether a statement was submitted via admin UI
    - `is_meta` whether a statement has been designated as a "meta statement"
- Allows removing any unwanted automated columns. Automation will just stop
  adding that type of data.
- Allows customizing sheet with arbitrary columns, formulas, and validation.
  They will be left alone by automation.
- Supports drafting proposed statements to sheet (automation will just ignore
  these rows)
- During update process, supports transformation of raw values from the Polis
  API via a `configuration` sheet.
    - Example: instead of seeing every language in `lang` column, you can draw
      attention too non-English statements by replacing "en" values with an
      empty string.
    - Example: instead of seeing TRUE/FALSE in the `is_seed` column, you can
      replace TRUE values with :seedling: emoji, and FALSE with an empty
      string.

## Usage

First, create a spreadsheet and add an app script via `Extensions > Apps
Script`. Note the script ID in the URL.

- `#todo` document requirements for spreadsheet:
    - sheet named `Live Statements (xxxxxxx)` where `xxxxx` is the Polis convo ID.
    - required column header: `tid`
    - every other column is optional: `txt`, `mod`, `active`, `is_seed`, `is_meta`,
      `lang`, `created`, `count`, `agree_count`, `disagree_count`, `pass_count`
    - optional: sheet named `configuration` with the replacement patterns. `#todo` document.

`#todo` share a template spreadsheet.

```
npm install -g @google/clasp
clasp login

# Optional: Set your own script ID if needed.
clasp settings scriptId <your app script ID>

# Push this code to your spreadsheet.
clasp push

# Open the script editor
clasp open

# Then run the `updateStatementSheet` function to test if things work
```

Once you know it works, you can update the data by clicking menu item `Polis >
Update statement sheet`.

## Roadmap
- Add additional metadata about each statements (from PCA data used in viz)
    - [ ] `group-informed-consensus`
    - [ ] `comment-priorities` to indicate "comment routing" order
    - [ ] `consensus` statements (both agree/disagree)
    - [ ] `repness` to show which clusters a statement is representative of
- [ ] Offer a template spreadsheet that can be used to get up and running quickly.
- From the spreadsheet itself...
    - [ ] Accept/reject submitted statements
    - [ ] Submit new seed statements
    - [ ] Show/update conversation setttings
