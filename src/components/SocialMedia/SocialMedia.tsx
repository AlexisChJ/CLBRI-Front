import { Red_Hat_Display } from "next/font/google"

const redhat_700 = Red_Hat_Display({weight: "700"})

export function SocialMedia() {
  return (
    <div className="relative text-center w-fit">
        <div className="flex">
            <div className="relative h-auto w-fit p-2 mr-5 rounded-2xl bg-[#FDFDFD] hover:bg-[#CCCCCC]">
                <a href="https://www.instagram.com/" target="blank">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="IG" className="h-7.5 w-7.5 object-cover" />
                </a>
            </div>
            <div className="relative h-auto w-fit p-2 mx-5 rounded-2xl bg-[#FDFDFD] hover:bg-[#CCCCCC]">
                <a href="https://www.facebook.com/" target="blank">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png" alt="FB" className="h-7.5 w-7.5 object-cover" />
                </a>
            </div>
            <div className="relative h-auto w-fit p-2 ml-5 rounded-2xl bg-[#FDFDFD] hover:bg-[#CCCCCC]">
                <a href="https://mx.linkedin.com/" target="blank">
                    <img src="https://cdn-icons-png.flaticon.com/256/174/174857.png" alt="IN" className="h-7.5 w-7.5 object-cover" />
                </a>
            </div>
        </div>
        <span className={`${ redhat_700.className } text-2xl text-[#FDFDFD] my-7`}>clbri@correo.com</span>
    </div>
  )
}