export default async (req, context) => {
  const {
    geo: { city },
  } = context;

  return new Response("Hello, world! from " + city);
};

export const config = {
  path: "/log-xid"
};