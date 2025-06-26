"use client"
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CarouselHome from "../Carousel";
import Load from "../Load";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  return (

    status === "loading" ? (
      <Load />
    ) : (status === "unauthenticated" && <>
      <CarouselHome />
    </>)
  )
}