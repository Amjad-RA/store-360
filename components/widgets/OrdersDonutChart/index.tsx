/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { DonutChart, Legend } from "@tremor/react"
import { fetchOrdersData } from "@/lib/api"
import { processOrdersForDonutChart } from "@/lib/data-utils"
import { Card } from "@/components/ui/card"

interface OrdersDonutChartProps {
  config: any
  dateRange: any
}

export function OrdersDonutChart({ config, dateRange }: OrdersDonutChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const orders = await fetchOrdersData(dateRange)
        const processedData = processOrdersForDonutChart(orders, config.dataKey || "Order_Type")
        console.log(processedData);
        
        setData(processedData)
      } catch (error) {
        console.error("Error loading donut chart data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [dateRange, config])

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center">Loading...</div>
  }

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">No data available</div>
    )
  }

  return (
    <div className="space-y-2">
      <DonutChart
        className="h-[150px] mt-4"
        data={data}
        category="value"
        index="name"
        colors={["primary", "blue", "amber", "emerald", "rose", "indigo"]}
        showAnimation
        customTooltip={({ payload }) => {
          if (!payload?.[0]) return null
          return (
            <Card className="p-2 shadow-md border-primary/20">
              <div className="font-medium">{payload[0].payload.name}</div>
              <div className="text-sm text-muted-foreground">{payload[0].payload.value} orders</div>
            </Card>
          )
        }}
      />
      <Card className="p-2">
        <Legend
          className="max-h-24 overflow-y-auto"
          categories={data.map((item) => item.name)}
          colors={["primary", "blue", "amber", "emerald", "rose", "indigo"]}
        />
      </Card>
    </div>
  )
}

