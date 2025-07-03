"use client"
import React from "react";
import { useSession } from "next-auth/react";
import Load from "../../Load";
import { useRouter } from "next/navigation";
import Logo from "../../Logo";
import SearchBar from '../../SearchBar'
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
        <div className="w-[97vw] h-auto flex flex-row justify-between items-center bg-red-500">
          <Logo />
          <SearchBar videoData={videoData} setShowSearch={setShowSearch} className="mt-2.5" />
          <Profile />
        </div>
        {showSearch ? (
          <>
            <SearchResults videoData={videoData} />
          </>
        ) : (
          <div>
            Body
          </div >
        )}
      </div>
    ) : (
      <Load />
    )
  )
}