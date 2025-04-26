"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Advent_Pro } from "next/font/google";

const adventPro = Advent_Pro({ subsets: ["latin"], weight: ["400", "700"], preload: true }); // Puedes agregar más pesos si quieres


const DataContainerDashboard = () => {
  return (
    <div className="flex gap-4">
      <Card className="w-[170px] bg-blue-300 text-white">
        <CardHeader>
          <CardTitle className={`text-5xl ${adventPro.className}`}>171K</CardTitle>
        </CardHeader>
        <CardFooter>
          <p>Alimento Acopiado (kg)</p>
        </CardFooter>
      </Card>

      <Card className="w-[170px] bg-black text-white">
        <CardHeader>
          <CardTitle className={`text-5xl ${adventPro.className}`}>44K</CardTitle>
        </CardHeader>
        <CardFooter>
          <p>Alimento Desechado (kg)</p>
        </CardFooter>
      </Card>

      <Card className="w-[170px] bg-white text-black border-black-500">
        <CardHeader>
          <CardTitle className={`text-5xl ${adventPro.className}`}>26%</CardTitle>
        </CardHeader>
        <CardFooter>
          <p>Alimento Desechado (%)</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataContainerDashboard;
