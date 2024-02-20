const MAILCHIMP_BAD_UID = "d7c6d2a743011f3253613888f"
const prevMailchimpUid = localStorage.getItem('mailchimpUid')
if (prevMailchimpUid === MAILCHIMP_BAD_UID) {
  localStorage.setItem('needsMigration', "true")
}

// Transfer Mailchimp UID from URL query parameter to localStorage.
const url = new URL(document.location);

if (url.searchParams.get("mailchimp_uid") || url.searchParams.get("mcuid")) {
  const mailchimpUid = url.searchParams.get("mailchimp_uid") || url.searchParams.get("mcuid");
  localStorage.setItem('mailchimpUid', mailchimpUid);

  // Remove the query parameter from the URL.
  url.searchParams.delete("mailchimp_uid");
  url.searchParams.delete("mcuid");
  window.history.replaceState({}, document.title, url.toString());
}