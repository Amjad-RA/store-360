/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { LineChart } from "@tremor/react"
import { fetchOrdersData } from "@/lib/api"
import { processOrdersForLineChart } from "@/lib/data-utils"
import { Card } from "@/components/ui/card"

interface OrdersLineChartProps {
  config: any
  dateRange: any
}

export function OrdersLineChart({ config, dateRange }: OrdersLineChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const orders = await fetchOrdersData(dateRange)
        const processedData = processOrdersForLineChart(orders, config.limit || 10)
        setData(processedData)
      } catch (error) {
        console.error("Error loading line chart data:", error)
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
    <LineChart
      className="h-[200px] mt-4"
      data={data}
      index="date"
      categories={["revenue"]}
      showLegend={false}
      showGridLines={false}
      showAnimation
      curveType="monotone"
      customTooltip={({ payload }) => {
        if (!payload?.[0]) return null
        return (
          <Card className="p-2 shadow-md border-primary/20">
            <div className="font-medium">{payload[0].payload.date}</div>
            <div className="text-sm text-muted-foreground">${Number(payload[0].value).toFixed(2)}</div>
          </Card>
        )
      }}
    />
  )
}