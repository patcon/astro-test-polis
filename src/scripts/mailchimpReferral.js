// Transfer Mailchimp UID from URL query parameter to localStorage.
const params = new URLSearchParams(document.location.search);
const mailchimpUid = params.get("mailchimp_uid");

if (mailchimpUid) {
  localStorage.setItem('mailchimpUid', mailchimpUid);
  params.delete("mailchimp_uid");
  window.history.replaceState({}, document.title, document.location.pathname + '?' + params);
}
