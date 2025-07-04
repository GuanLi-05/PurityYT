"use client";

import { useRouter } from 'next/navigation';
import Carousel from "@/components/ui/carousel";
export default function CarouselHome() {
  const router = useRouter();

  const slideData = [
    {
      title: "Mystic Mountains",
      button: "Get Started",
      src: "https://images.unsplash.com/photo-1494806812796-244fe51b774d?q=80&w=3534&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      path: "/register"
    },
    {
      title: "Urban Dreams",
      button: "Get Started",
      src: "https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      path: "/register"
    },
    {
      title: "Neon Nights",
      button: "Get Started",
      src: "https://images.unsplash.com/photo-1590041794748-2d8eb73a571c?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      path: "/register"
    },
    {
      title: "Desert Whispers",
      button: "Get Started",
      src: "https://images.unsplash.com/photo-1679420437432-80cfbf88986c?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      path: "/register"
    },
  ];

  const buttonClick = (slide) => {
    router.push(slide.path);
  };

  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel
        slides={slideData}
        onButtonClick={(slide) => buttonClick(slide)}
      />
    </div>
  );
}
