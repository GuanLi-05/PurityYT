import { Button } from "@/components/ui/button"
import CarouselDemo from "./CarouselDemo"
import ModeToggle from './ModeToggle'

export default function Home() {
  return (
    <div>
      <ModeToggle />
      <Button>Click me</Button>
      <CarouselDemo />
    </div>
  )
}