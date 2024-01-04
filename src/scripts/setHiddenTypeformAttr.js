const xid = localStorage.getItem('polisUserXid');
const elem = document.getElementById('myTypeform');

// Set the Typeform hidden field value through data attribute.
// This is REQUIRED to later analysis, as it will be used to join
// both the Polis and Typeform exports through a common xid value.
elem.setAttribute('data-tf-hidden', `xid=${xid}`);