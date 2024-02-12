export default async (req, context) => {
  const {
    ip,
    geo: { city, country },
  } = context;

  const logLine = `${ip} ${city}, ${country}`;
  console.log(logLine);
  return new Response(logLine);
};

export const config = {
  path: "/log-xid"
};