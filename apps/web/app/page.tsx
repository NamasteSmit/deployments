import styles from "./page.module.css";
import {client} from "@repo/db/client"

export default async function Home() {
  const user  = await client.user.findFirst();
  return (
    <div>
      <span>email : {user?.username}</span>
      <span>password : {user?.password}</span>
    </div>
  );
}
