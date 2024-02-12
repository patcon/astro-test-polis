export default async (req, context) => {
  const {
    ip,
    requestId,
    geo: { city, country: { name: countryName } },
  } = context;

  const logLine = `${requestId} ${ip} ${city}, ${countryName}`;
  console.log(logLine);
  return new Response(logLine);
};

export const config = {
  path: "/log-xid"
};