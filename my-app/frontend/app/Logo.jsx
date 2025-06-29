import Image from "next/image"
import LogoImage from "../public/Logo.png"
import DarkLogoImage from "../public/dark_Logo.png"
import { useRouter } from "next/navigation"


export default function Logo() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard');
  }

  return (
    <div onClick={handleClick}>
      <div className="dark:block hidden">
        <Image src={DarkLogoImage} alt="PurityYT" width={150} placeholder="blur" />
      </div>
      <div className="block dark:hidden">
        <Image src={LogoImage} alt="PurityYT" width={150} placeholder="blur" />
      </div>
    </div>
  )
}
