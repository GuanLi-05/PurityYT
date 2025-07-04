"use client"
import React from "react";
import { useSession } from "next-auth/react";
import Load from "../../Load";
import { useRouter } from "next/navigation";
import Logo from "../../Logo";
import SearchBar from '../../SearchBar'
import SearchResults from "./SearchResults";
import { Profile } from "../../Profile";
import DashboardText from "./DashboardText";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const videoData = React.useRef([]);
  const [showSearch, setShowSearch] = React.useState(false);
  const [errorShow, setErrorShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  return (
    status === "authenticated" ? (
      <div>
        <Nav videoData={videoData} setShowSearch={setShowSearch} setErrorShow={setErrorShow} setLoading={setLoading} />
        {loading ? (
          <Load />
        ) : showSearch ? (
          <SearchResults videoData={videoData} />
        ) : (
          <div>
            <DashboardText error={errorShow} />
          </div>
        )}
      </div>
    ) : (
      <Load />
    )
  )
}

function Nav({ videoData, setShowSearch, setErrorShow, setLoading }) {
  return (
    <div className="h-auto flex flex-row justify-between items-center sticky top-0 z-10">
      <Logo />
      <div className="w-[39vw]">
        <SearchBar videoData={videoData} setShowSearch={setShowSearch} setErrorShow={setErrorShow} setLoading={setLoading} />
      </div>
      <div className="mr-[1vw]">
        <Profile className="mr-4" />
      </div>
    </div>
  )
}