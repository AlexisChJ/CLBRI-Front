"use client";
import { Zen_Maru_Gothic } from "next/font/google";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import React, { useEffect, useState } from "react";
import { cva } from "class-variance-authority";

const zen_700 = Zen_Maru_Gothic({
  weight: "700",
  subsets: ["latin"],
  preload: true,
});

const badgeVariants = cva(
  `${zen_700.className} hover:cursor-pointer text-nowrap rounded-full text-center`,
  {
    variants: {
      variant: {
        unselected: "bg-transparent text-stone-950",
        selected: "bg-stone-950 text-white",
      },
      size: {
        default: "px-4 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "unselected",
      size: "default",
    },
  }
);

interface DateBadgeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  data_index: number;
  variant: "selected" | "unselected";
  children: React.ReactNode;
}

const DateBadge = ({
  data_index,
  variant,
  children,
  ...props
}: DateBadgeProps) => {
  return (
    <button
      data-index={data_index}
      className={badgeVariants({ variant })}
      {...props}
    >
      {children}
    </button>
  );
};

interface CarruselProps {
  data: string[];
  onValueChange?: (index: number) => void;
}

const Carrusel = ({ data = [], onValueChange = () => {} }: CarruselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      onValueChange(api.selectedScrollSnap());
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const moveIndex = (e) => {
    const index = Number.parseInt(e.target.getAttribute("data-index"));
    if (api) {
      setCurrent(index + 1);
      api.scrollTo(index);
    }
  };

  return (
    <div className="px-12">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent>
          {data.map((data, index) => {
            return (
              <CarouselItem key={index} className="basis-1/8">
                <DateBadge
                  data_index={index}
                  variant={index === current - 1 ? "selected" : "unselected"}
                  onClick={moveIndex}
                >
                  {data}
                </DateBadge>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="bg-transparent" />
        <CarouselNext className="bg-transparent" />
      </Carousel>
    </div>
  );
};

export default Carrusel;
