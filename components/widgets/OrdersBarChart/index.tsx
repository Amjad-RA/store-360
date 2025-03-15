/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Bar, BarChart, XAxis } from "recharts";
import { fetchOrdersData } from "@/lib/api";
import { processOrdersForBarChart } from "@/lib/data-utils";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface OrdersBarChartProps {
  config: any;
  dateRange: any;
}

const chartConfig = {
  count: {
    label: "Count",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function OrdersBarChart({ config, dateRange }: OrdersBarChartProps) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const orders = await fetchOrdersData(dateRange);
        const processedData = processOrdersForBarChart(
          orders,
          config.dataKey || "Order_Status",
          config.limit || 10
        );
        setData(processedData);
      } catch (error) {
        console.error("Error loading bar chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dateRange, config]);

  if (loading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart className="h-[200px]" accessibilityLayer data={data}>
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
