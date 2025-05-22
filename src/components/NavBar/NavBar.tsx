"use client"

import { Prompt } from "next/font/google";
import NotificationSVG from "@/assets/notification.svg";
import { useEffect, useRef, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";

const prompt_300 = Prompt({ weight: "300", subsets: ["latin"], preload: true })
const prompt_500 = Prompt({ weight: "500", subsets: ["latin"], preload: true })

export interface Notification {
    description: string,
    title?: string,
    creationDate?: Date,
}

export interface NotificationIconProps {
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
                            <img src={NotificationSVG.src} />
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
                    ) : notifications.map((value, index) => (
                        <DropdownMenuItem key={index}>
                            <p>
                                <b>{value?.title}</b>
                                <br />
                                <span>{value.description}</span>
                                <br />
                                <i className="text-gray-400 dark:text-gray-100">{value?.creationDate?.toDateString()}</i>
                            </p>
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

interface NavBarProps {
    title: string
    opts: any[]
    selected: number
    notificaciones: Notification[]
    onValueChange: (index: number) => void
    center?: React.ReactNode 
}

export const NavBar = ({ 
    title = "", 
    opts = [], 
    selected = 0,
    notificaciones = [], 
    onValueChange = () => {}, 
    center
}: NavBarProps) => {
    const [current, setCurrent] = useState<number>(selected);

    return (
        <div className="relative flex flex-col sm:flex-row sm:justify-between border-b-[1px] border-b-blue-800 pb-2 w-full items-center px-4 gap-2 sm:gap-0 h-auto sm:h-16">
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-center w-full sm:w-auto">
                <span className={`${prompt_300.className} text-2xl sm:text-3xl text-center sm:text-left`}>{title}</span>
                <div className="flex flex-wrap justify-center sm:justify-start gap-x-4">
                    {opts.map((value, index) => (
                        <button 
                            className={`${prompt_500.className} ${ current === index ? "text-[#3A70C3]" : "text-gray-600" } cursor-pointer`}
                            key={index}
                            onClick={() => {
                                onValueChange(index);
                                setCurrent(index);
                            }}
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>

            {center && (
                <div className="order-last sm:order-none sm:absolute left-1/2 top-1/2 transform sm:-translate-x-1/2 sm:-translate-y-1/2 mt-2 sm:mt-0">
                    {center}
                </div>
            )}

            <div className="ml-auto sm:ml-0 flex items-center">
                <NotificationIcon notifications={notificaciones} />
            </div>
        </div>
    )
}

export default NavBar;
