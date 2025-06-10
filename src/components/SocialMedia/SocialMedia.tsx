import { Red_Hat_Display } from "next/font/google"
import Facebook from "@/assets/icons/facebook.png"
import Instagram from "@/assets/icons/instagram.png"
import Linkedin from "@/assets/icons/linkedin.png"
import Image from "next/image"

const redhat_600 = Red_Hat_Display({weight: "600",
  subsets: ['latin'], // ✅ Especifica el subset
  preload: true, // ✅ Esto ya no causará error
})

export function SocialMedia() {
  return (
    <div className="flex flex-col text-center w-fit">
        <div className="flex">
            <div className="relative h-auto w-fit p-2 mr-5 rounded-full bg-[#FDFDFD] hover:bg-[#CCCCCC]">
                <a href="https://www.instagram.com/" target="blank">
                    <Image src={Instagram} alt={"IG"}/>
                </a>
            </div>
            <div className="relative h-auto w-fit p-2 mx-5 rounded-full bg-[#FDFDFD] hover:bg-[#CCCCCC]">
                <a href="https://www.facebook.com/" target="blank">
                    <Image src={Facebook} alt={"FB"}/>
                </a>
            </div>
            <div className="relative h-auto w-fit p-2 ml-5 rounded-full bg-[#FDFDFD] hover:bg-[#CCCCCC]">
                <a href="https://mx.linkedin.com/" target="blank">
                    <Image src={Linkedin} alt={"IN"}/>
                </a>
            </div>
        </div>
        <span className={`${ redhat_600.className } text-3xl text-[#FDFDFD] my-7`}>clbri@correo.com</span>
    </div>
  )
}