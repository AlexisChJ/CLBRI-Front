"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { Card, CardContent } from "../ui/card";
import { useState } from "react";

const Carrusel = () => {
    const [ data, setData ] = useState<string[]>([ "1", "2", "3", "4" ]);
    
    return (
        <Carousel
            opts={{
                align: "start",
            }} 
            className="w-full max-w-xs">
            <CarouselContent>
                {data.map((_, index) => (
                <CarouselItem key={index}>
                    <div className="p-1">
                    <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-4xl font-semibold">{index + 1}</span>
                        </CardContent>
                    </Card>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default Carrusel;