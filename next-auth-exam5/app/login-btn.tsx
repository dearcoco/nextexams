"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import UserInformation from "./user-information";

export default function Component({ children }: { children: React.ReactNode}) {
  const {data: session} = useSession();
  //console.log('use session local');
  if (session) {
    return (
      <>
        Signed in as {session!.user!.email} <br />
        <UserInformation data={session!} />
        <button onClick={() => signOut()}>Sign out</button>
        {children}
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
