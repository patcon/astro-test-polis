export default async (req, context) => {
  switch (req.method) {
    case 'POST':
      const { polisXid, mailchimpUid } = await req.json();
      const responseObj = Object.assign({}, context, { polisXid, mailchimpUid });
      const prettyResponse = JSON.stringify(responseObj, null, 2);
      console.log(prettyResponse);
      return new Response(prettyResponse);

    default:
      return new Response('Method Not Allowed', { status: 405 });
  }
};

export const config = {
  path: "/api/log-xid"
};