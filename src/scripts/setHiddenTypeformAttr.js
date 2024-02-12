const polisXid = localStorage.getItem('polisUserXid');
const mailchimpUid = localStorage.getItem('mailchimpUid');
const elem = document.getElementById('myTypeform');

// Set the Typeform hidden field values through data attribute.
// See: https://www.typeform.com/developers/embed/hidden-fields/
//
// The `xid` is REQUIRED to later analysis, as it will be used to join
// both the Polis and Typeform exports through a common xid value.
// The `mailchimp_uid` allows (optional) ability to contact participants.
elem.setAttribute('data-tf-hidden', `xid=${polisXid},mailchimp_uid=${mailchimpUid}`);