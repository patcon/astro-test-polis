export default async (req, context) => {
  return new Response("Hello, world!");
};

export const config = {
  path: "/log-xid"
};