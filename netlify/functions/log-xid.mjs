export default async (req, context) => {
  const jsonResponse = JSON.stringify(context, null, 2);
  console.log(jsonResponse);
  return new Response(jsonResponse);
};

export const config = {
  path: "/log-xid"
};