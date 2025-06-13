"use client"

import { CartesianGrid, Line, LineChart, XAxis} from "recharts"
import { Red_Hat_Display } from "next/font/google"
import { Barlow } from "next/font/google"

const barlow_500 = Barlow({weight: "500", subsets: ['latin'], preload: true,})

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend, 
  ChartLegendContent,
} from "@/components/ui/chart"
import { FoodLossGraphData, FoodStockGraphData } from "@/types/dashboard/Graph"


/*
const chartData = [
  { month: "Ene.", desktop: 186, mobile: 80 },
  { month: "Feb.", desktop: 305, mobile: 200 },
  { month: "Mar.", desktop: 237, mobile: 120 },
  { month: "Abr.", desktop: 73, mobile: 190 },
  { month: "May.", desktop: 209, mobile: 130 },
  { month: "Jun.", desktop: 214, mobile: 140 },
  { month: "Jul.", desktop: 200, mobile: 180 },
  { month: "Ago.", desktop: 156, mobile: 210 },
  { month: "Sep.", desktop: 123, mobile: 150 },
  { month: "Oct.", desktop: 204, mobile: 110 },
  { month: "Nov.", desktop: 310, mobile: 100 },
  { month: "Dic.", desktop: 192, mobile: 250 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig
*/


interface LineChartCompProps {
  chartConfig: ChartConfig;
  chartValue: string;
  chartData: FoodStockGraphData[] | FoodLossGraphData[];
}


export function LineChartComp({ chartConfig, chartValue, chartData } : LineChartCompProps) {
  return (
    <Card className="">

      {/* <CardHeader>
        <CardTitle className={ `${ redhat_700.className } text-[#5B5B5B]` }>Pérdida de alimento</CardTitle>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">

          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent className={ `${ barlow_500.className } text-[#5B5B5B]` }/>} />
            <Line
              dataKey={chartValue}
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={3}
              dot={false}
            />
            {
              /* 
            <Line
            dataKey="mobile"
            type="monotone"
            stroke="var(--color-mobile)"
            strokeWidth={3}
            dot={false}
            /> 
              */
            }
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
