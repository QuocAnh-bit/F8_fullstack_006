export const getSession = (req) => {
  const sessionCookie = req.cookies.get("session");

  if (!sessionCookie || !sessionCookie.value) {
    return false;
  }

  const decodedData = Buffer.from(sessionCookie.value, "base64").toString(
    "utf-8"
  );
  const value = JSON.parse(decodedData);

  return value.passport && value.passport.user;
};
