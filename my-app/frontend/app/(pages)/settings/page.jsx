"use client"
import { Button } from "@/components/ui/button"
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Load from "../../Load";
import { useRouter } from "next/navigation";
import Logo from "../../Logo";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    status === "authenticated" ? (
      <div>
        <Logo />
        <Button onClick={() => signOut({ callbackUrl: '/login' })}>
          Logout
        </Button>
        <p>Settings</p>
      </div >
    ) : (
      <Load />
    )
  )
}

// whitelist ?
// veto tokens ? or x amount of time to spend on non-productive
// subscription autowhitelist ? only whitelist videos released x days ago
// lock settings