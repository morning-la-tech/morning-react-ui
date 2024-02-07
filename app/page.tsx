import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {Titi, Toto} from "@/components";

export default async function Home() {
    const session = await getServerSession(authOptions);

  return (
    <div style={{display: "flex", flexDirection: "row"}}>
        {session && (
            <div>
                <p>Signed in as {session.user && session.user.name}</p>
                <a href="/api/auth/signout">Sign out by link</a>
            </div>
        )}

        {!session && (
            <div>
                <p>Not signed in</p>
                <a href="/api/auth/signin">Sign In</a>
            </div>
        )}

        <Toto/>
        <Titi/>
    </div>
  )
}
