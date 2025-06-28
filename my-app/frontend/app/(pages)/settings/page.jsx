"use client"
import { Button } from "@/components/ui/button"
import React from "react";
import ModeToggle from '../../ModeToggle'
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
        <ModeToggle />
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