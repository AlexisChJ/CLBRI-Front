"use client";
import Carrusel from "@/components/Carrusel/Carrusel";
import { LineChartComp } from "@/components/Chart/LineChart";
import DataContainerDashboard from "@/components/DataContainerDashboard/DataContainerDashboard";
import { NavBar } from "@/components/NavBar/NavBar";
import { TablaBasica } from "@/components/TablaBasica/TablaBasica";
import { Red_Hat_Display} from "next/font/google";
import { months } from "@/lib/months";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { getBatchLogs } from "@/services/dashboard/batchLogs";
import { getFoodLossData } from "@/services/dashboard/foodLoss";
import { NetFood } from "@/types/dashboard/NetFood";
import { getRecentDistributions } from "@/services/dashboard/recentDistributions";
import { BatchLogEntry, Distribution, UserWaste } from "@/types/dashboard/BatchLogs";
import { FoodLossGraphData, FoodStockGraphData } from "@/types/dashboard/Graph";
import { GroupFoodLossData, GroupFoodStockData } from "@/utils/graphDataGrouping";
import { ChartConfig } from "@/components/ui/chart";

const redhat_700 = Red_Hat_Display({
  weight: "700",
  subsets: ["latin"],
  preload: true,
});

const foodLossGraphConfig = {
  desktop: {
    label: "Pérdida de alimentos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


const foodStockGraphConfig = {
  desktop: {
    label: "Acoplado",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig


const calculateNetFood = (batchLogsEntry: BatchLogEntry[], monthDate: Date) => {
  let netFoodCalc = { totalFood: 0, totalWaste: 0 }
  batchLogsEntry.forEach((entry) => {  
      const filteredEntries = entry.batchLogs.filter((i) => {
          return (new Date(i.entryDate).getMonth()) === monthDate.getMonth()
      });

      const totalUserFood = filteredEntries.reduce((sum, e) => sum + e.stockBatches, 0);
      const totalUserWaste = filteredEntries.reduce((sum, e) => sum + e.wasteBatches, 0);

      netFoodCalc = { totalFood: netFoodCalc.totalFood + totalUserFood, 
                      totalWaste: netFoodCalc.totalWaste + totalUserWaste };
  });
  return netFoodCalc;
}


export default function Dashboard() {
  const { user } = useAuth();
  const [netFoodData, setNetFoodData] = useState<NetFood>({
    totalFood: 1,
    totalWaste: 2
  });

  const batchLogs = useRef<BatchLogEntry[]>([]);
  const [distribuciones, setDistribuciones] = useState<Distribution[]>([]);
  const [userFoodLoss, setUserFoodLoss] = useState<UserWaste[]>([]);
  const [foodLossGraphData, setFoodLossGraphData] = useState<FoodLossGraphData[]>([]);
  const [foodStockGraphData, setFoodStockGraphData] = useState<FoodStockGraphData[]>([]);

  useEffect(() => {
    async function fetchData() { 
      if (!user) return;
      const token = await user.getIdToken();

      const currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      const thisMonth = new Date();
      thisMonth.setDate(1);

      const placeholderMonth = new Date();
      placeholderMonth.setMonth(1);  
      placeholderMonth.setDate(1);

      const batchLogsData = await getBatchLogs({ from: currentDate.toISOString() }, token);
      batchLogs.current = batchLogsData;
      setNetFoodData(calculateNetFood(batchLogsData, placeholderMonth));
      const foodLossEntries = await getFoodLossData({ from: thisMonth.toISOString() }, token);
      setUserFoodLoss(foodLossEntries);
      const recentDistributions = await getRecentDistributions(token);
      setDistribuciones(recentDistributions);
      createGraphData();
    }

    function createGraphData() {
      setFoodLossGraphData(GroupFoodLossData(batchLogs.current));
      setFoodStockGraphData(GroupFoodStockData(batchLogs.current));
    }

    fetchData();
  }, [user]);


  const onCarrouselChange = (index: number) => {
    const date = new Date();
    date.setMonth(index);
    setNetFoodData(calculateNetFood(batchLogs.current, date));
  }


  const getTendenciaIcon = (valor: string) => {
    return valor === "up" ? (
      <ArrowUpRight className="text-green-500 w-5 h-5" />
    ) : (
      <ArrowDownRight className="text-red-500 w-5 h-5" />
    );
  };

  return (
    <div
      id="tesss"
      className="p-5 flex flex-col gap-5 h-full overflow-y-auto"
    >
      <NavBar
        title="Dashboard"
        opts={[]}
        selected={0}
        onValueChange={() => {}}
      />
      <div className="flex gap-3">
        <div className="w-3/5 h-auto">
          <div className="my-5">
            <h2
              className={`${redhat_700.className} text-xl font-semibold text-[#5B5B5B] mb-2`}
            >
              Alimento Neto
            </h2>
            <Carrusel data={months} onValueChange={onCarrouselChange} />
            <DataContainerDashboard totalFood={netFoodData.totalFood} totalWaste={netFoodData.totalWaste}  />
          </div>
          <div className="my-5">
            <h2
              className={`${redhat_700.className} text-xl font-semibold text-[#5B5B5B] mb-2`}
            >
              Pérdidas de alimento
            </h2>
            <LineChartComp chartConfig={foodLossGraphConfig} chartValue={"waste"} chartData={foodLossGraphData} />
          </div>
          <div className="my-5">
            <h2
              className={`${redhat_700.className} text-xl font-semibold text-[#5B5B5B] mb-2`}
            >
              Alimento acoplado
            </h2>
            <LineChartComp chartConfig={foodStockGraphConfig} chartValue={"stock"} chartData={foodStockGraphData} />
          </div>
        </div>
        <div className="w-2/5 h-auto">
          <TablaBasica
            titulo="Menor Pérdida por Usuario"
            fecha="junio, 2025"
            encabezados={[
              { label: "Usuario", key: "usuario", align: "left" },
              {
                label: "",
                key: "icon",
                icono: (_valor, fila) => getTendenciaIcon(fila.icon),
                align: "center",
              },
              { label: "Pérdida", key: "kg", align: "right" },
            ]}
            datos={userFoodLoss.map((e) => ({ usuario: e.user.name, kg: e.wastedBatches + " lote" }))}
          />

          <TablaBasica
            titulo="Distribución Reciente"
            encabezados={[
              { label: "Usuario", key: "usuario" },
              { label: "Fecha", key: "fecha", align: "right" },
            ]}
            datos={distribuciones.map((entry) => ({ usuario: entry.user.name, fecha: new Date(entry.dateTime).toDateString() }))}
          />
        </div>
      </div>
    </div>
  );
}
