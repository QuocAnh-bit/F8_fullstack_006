import { getSession } from "@auth0/nextjs-auth0";
import Header from "./Header";

export default async function UserServer() {
  let user = null;
  const session = await getSession();
  if (session) {
    user = session.user;
  }
  console.log(user);
  return (
    <div>
      <Header user={user} />
    </div>
  );
}
