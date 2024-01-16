
## Development

- there is a custom `.env.development` file for running in local development mode via `npm start`.
  - the included Polis Conversation ID is set up to redirect from notification email back to `http://localhost:4321/participate/?return=true`

## Deployment

- this repo is configured to auto-deploy `main` branch to Netlify.
- production builds on netlify require setting `PUBLIC_POLIS_CONVO_ID` as an
  environment variable on their platform where your website gets built and
  deployed.
    - See below "Creating a Polis converation with proper email redirect".

## How To

### Creating a Polis conversation with proper email redirect

Background: The Polis platform will send emails to participants who leave an
email, inviting them to return when new statements are submitted. Without
proper attention, these emails will include a link that redirects back the
canonical Polis conversation URL, rather than the URL where your conversation
is embedded. This will have drastic consequences since that canonical Polis URL
will be unaware of the `xid` we're using to track users between visits.
Consequently, the user will be unable to resume their session. You can use the
instructions below to force that. This can only be done when creating a new
Polis conversation -- there is no way to update an existing Polis conversation.

1. Note the `base_url` where you will be running or testing your embedded Polis converation.
    - e.g., http://localhost:4321 (if testing locally), or https://my-polis-app.netlify.app (if testing using a hosted platform), or https://mydomain.com (if hosting on your own domain).
1. Log into your Polis admin account.
1. Visit the Integrate page: https://pol.is/integrate
1. Copy the value of `data-site_id` from the intergration code snippet.
    - it should be of the pattern `polis_site_id_XXXXXXXXXXXXXXXXXX`
    - we will call this `{{SITE_ID}}`
1. Visit the following URL: `https://pol.is/{{SITE_ID}}/{{ARBITRARY_STRING}}?parent_url={{BASE_URL}}/participate/?return=true`
    - use `{{SITE_ID}}` and `{{BASE_URL}}` from above
    - `{{ARBITRARY_STRING}}` can be value, and never shows up in the interface,
      but must be unique for every subsequently generated conversation. The
      recommendation is to either mash the keyboard, or just keep incrementing
      a value like `local-v1` or `prod-v1` whenever you want to generate a new
      polis convo.
    - e.g., `https://pol.is/polis_site_id_XXXXXXXXXXXXXXXXXX/foobar?parent_url=http://localhost:4321/participate/?return=true`
1. You will be redirected to a new Polis conversation URL
    - e.g., `https://pol.is/9dcfba8kv6?site_id=polis_site_id_XXXXXXXXXXXXXXXXXX&page_id=foobar&parent_url=http%3A%2F%2Flocalhost:4321/participate/?return=true`
1. Note the Polis convo ID (in the example above, `9dcfba8kv6`).
    - you will need it when you see mention of setting the envvar `PUBLIC_POLIS_CONVO_ID`.
1. You can confirm that this worked by visiting https://pol.is while logged in.
    - you will see a new Polis conversation at the top, annotated with:
      "Embedded on http://localhost:4321/participate/?return=true".
