"use client"
import { Button } from "@/components/ui/button"
import CarouselDemo from "./CarouselDemo"
import ModeToggle from './ModeToggle'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    status === "loading" ? (
      <p>Loading...</p>
    ) : status === "authenticated" ? (
      <div>
        <ModeToggle />
        <Button>Click me</Button>
        <CarouselDemo />
        <Button onClick={() => signOut({ callbackUrl: '/login' })}>
          Logout
        </Button>

      </div >
    ) : (
      <p>You are not logged in.</p>
    )
  )
}