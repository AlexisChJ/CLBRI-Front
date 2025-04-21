"use client"

import { Prompt } from "next/font/google";
import NotificationSVG from "@/assets/notification.svg";
import { useEffect, useRef, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";

const prompt_300 = Prompt({ weight: "300" })
const prompt_500 = Prompt({ weight: "500" })


interface Notification {
    description: string,
    title?: string,
    creationDate?: Date,
}


interface NotificationIconProps {
    notifications: Notification[]
}


const NotificationIcon = ({ notifications = [] } : NotificationIconProps) => {
    const [seen, setSeen] = useState<boolean>(false);

    useEffect(() => {
        setSeen(false);
    }, [notifications])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-end">
                    <button className="w-auto h-fit aspect-auto selection:bg-transparent hover:cursor-pointer" onPointerDown={() => setSeen(true)}>
                        <div className="relative w-5">
                            <img src={NotificationSVG.src}/>
                            <div hidden={seen} className="absolute top-0 right-0 bg-red-500 w-2 h-2 rounded-full"></div>
                        </div>
                    </button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                {
                    notifications.length === 0 ? 
                    (
                        <DropdownMenuItem>No hay nuevas notificaciones.</DropdownMenuItem>
                    ) : notifications.map((value, index) => {
                        return (
                            <DropdownMenuItem key={index}>
                                <p>
                                    <b>{value?.title}</b>
                                    <br/>
                                    <span className="text-">{value.description}</span>
                                    <br/>
                                    <i className="text-gray-400 dark:text-gray-100">{value?.creationDate?.toDateString()}</i>
                                </p>
                            </DropdownMenuItem>
                        )
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


interface NavBarProps {
    title?: string,
    opts: string[],
    selected: number,
    notificaciones: Notification[]
    onValueChange: (index: number) => void,
}

const NavBar = ({ title = "", 
                  opts = [], 
                  selected = 0,
                  notificaciones = [], 
                  onValueChange = () => {} } : NavBarProps) => {
    const [current, setCurrent] = useState<number>(selected);

    return (
        <div className={`flex flex-row border-b-[1px] border-b-blue-800 pb-1`}>
            <span className={`${prompt_300.className} text-3xl`}>{title}</span>
            <div className="flex pl-15 gap-x-8 items-end">
                {
                    opts.map((value, index) => (
                        <button 
                            className={`${prompt_500.className} ${ current == index ? "text-[#3A70C3]" : "text-gray-600" } cursor-pointer`}
                            key={index}
                            onClick={(e) => {
                                onValueChange(index);
                                setCurrent(index);
                            }}
                        >
                            {value}
                        </button>
                    ))
                }
            </div>
            <div className="spacer flex-1/3"></div>
            <NotificationIcon notifications={notificaciones} />
        </div>
    )
}

export default NavBar;