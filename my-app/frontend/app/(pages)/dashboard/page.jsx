"use client"
import { Button } from "@/components/ui/button"
import React from "react";
import ModeToggle from '../../ModeToggle'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Load from "../../Load";
import { useRouter } from "next/navigation";
import Logo from "../../Logo";
import Search from '../search'
import SearchResults from "./SearchResults";
import { Profile } from "../../Profile";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const videoData = React.useRef([]);
  const [showSearch, setShowSearch] = React.useState(false)

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    status === "authenticated" ? (
      <div>
        <div className="w-[97vw] h-auto flex flex-row justify-between items-center">
          <Logo />
          <Profile />
        </div>
        {showSearch ? (
          <>
            <SearchResults videoData={videoData} />
          </>
        ) : (
          <div>
            <ModeToggle />
            <Button onClick={() => signOut({ callbackUrl: '/login' })}>
              Logout
            </Button>
            <Search videoData={videoData} setShowSearch={setShowSearch} />
            <p>Home Page</p>
          </div >
        )}
      </div>
    ) : (
      <Load />
    )
  )
}