import Image from "next/image"
import LogoImage from "../public/Logo.png"
import DarkLogoImage from "../public/dark_Logo.png"
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/dashboard" passHref>
      <div className="dark:block hidden">
        <Image src={DarkLogoImage} alt="PurityYT" width={150} />
      </div>
      <div className="block dark:hidden">
        <Image src={LogoImage} alt="PurityYT" width={150} />
      </div>
    </Link>
  );
}
