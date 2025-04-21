import React from "react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { MinusIcon } from "lucide-react";


interface VentanaProps {
    triggerComponent: React.ReactNode,
    children: React.ReactNode,
    title?: string
}


const Ventana = ({ triggerComponent, 
                   children, 
                   title = "" }: VentanaProps) => {
    return (
        <Dialog>
            <DialogTrigger className="bg-slate-800 text-white rounded-full px-4 py-1">
                {triggerComponent}
            </DialogTrigger>
            <DialogContent >
                <DialogClose><MinusIcon/></DialogClose>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {children}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default Ventana;