## v0.2.0

- documentation: digital inventory. created separate accounts.
- documentation: setup of polis convos with `parent_url`
- documented UX flow to keep users from fragmenting data between devices
  - See: https://github.com/patcon/astro-test-polis/issues/1
- added Banner component to make it obvious what environment we're in
- got flowbite theme JS working for modals
- updated typeform intake survey: open affiliation, AI context, country.
- now redirects past intake once completed (clicked or typed)
- implemented `?return=true` email flow
- made typeform ID configurable
- added a stub page for help "restoring session"
- made polis conversation dynamic based on environment

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


