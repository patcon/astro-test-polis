export default async (req, context) => {
  const {
    geo: { city },
  } = Astro.locals.netlify.context;

  return new Response("Hello, world! from " + city);
};

export const config = {
  path: "/log-xid"
};