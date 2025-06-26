"use client"
import { Button } from "@/components/ui/button"
import CarouselHome from "./Carousel"
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
        <Button onClick={() => signOut({ callbackUrl: '/login' })}>
          Logout
        </Button>
        <p>Home Page</p>
      </div >
    ) : (
      <CarouselHome />
    )
  )
}