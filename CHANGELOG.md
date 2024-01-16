## v0.2.0

- documentation: digital inventory. created separate accounts.
- documented UX flow to keep users from fragmenting data between devices
  - See: https://github.com/patcon/astro-test-polis/issues/1
- added Banner component to make it obvious what environment we're in
  - made polis conversation dynamic based on environment
- updated typeform intake survey: open affiliation, AI context, country.
  - made typeform ID configurable
- made redirects smarter based on past progress
  - redirects `/participate` back to front page when incomplete
  - allows revisiting `/pre-survey` while incomplete
  - now redirects past intake once completed (clicked or typed)
- added support when user arrives through bad UX email flow
  - implemented `?return=true` email flow
  - documentation: setup of polis convos with `parent_url`
    - works fine when in same session
    - but if on new device/browser, shares warning
    - got flowbite theme JS working for modals
  - shows a ReturnModal component to explain what's going on when session state is missing
  - added a stub page for help "restoring session"

## v0.1.0

- created simple welcome page
- set up placeholder typeform survey
- creates intake survey page backed by typeform
  - generates a random xid that's saved in localstorage indefinitely (unless cleared)
  - allow sandbox usage of typeform, to not surpass monthly limit of 10 responses
  - allow arbitrary questions in intake survey, editable without programming
  - xid is stored in results for joining in data workup phase
- not done
  - readme
  - intake survey is restarted on each visit. not smart about redirects, or order of visits
  - email notification points to main pol.is website


