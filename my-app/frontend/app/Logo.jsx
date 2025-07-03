import Image from "next/image"
import LogoImage from "../public/Logo.png"
import DarkLogoImage from "../public/dark_Logo.png"


export default function Logo() {

  const handleClick = () => {
    window.location.href = "/dashboard"
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
