"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Red_Hat_Display } from "next/font/google"
import { Barlow } from "next/font/google"

const redhat_700 = Red_Hat_Display({weight: "700", subsets: ['latin'], preload: true,})
const barlow_500 = Barlow({weight: "500", subsets: ['latin'], preload: true,})

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend, 
  ChartLegendContent,
} from "@/components/ui/chart"
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

export function LineChartComp() {
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
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={3}
              dot={false}
              
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
