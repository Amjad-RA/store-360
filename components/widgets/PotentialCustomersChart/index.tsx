/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { AreaChart } from "@tremor/react"
import { fetchOrdersData } from "@/lib/api"
import { processCustomerInsightData } from "@/lib/data-utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PotentialCustomersChartProps {
  config: any
  dateRange: any
}

export function PotentialCustomersChart({ config, dateRange }: PotentialCustomersChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const orders = await fetchOrdersData(dateRange)
        const processedData = processCustomerInsightData(orders)
        setData(processedData)
      } catch (error) {
        console.error("Error loading customer insight data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [dateRange, config])

  if (loading) {
    return <div className="h-[200px] flex items-center justify-center">Loading...</div>
  }

  if (data.length === 0) {
    return (
      <div className="h-[200px] flex items-center justify-center text-muted-foreground">No data available</div>
    )
  }

  // Determine categories based on chart type
  const categories =
    config.chartType === "retention"
      ? ["returning", "new"]
      : config.chartType === "acquisition"
        ? ["customers"]
        : ["frequency"]

  const title =
    config.chartType === "retention"
      ? "Customer Retention"
      : config.chartType === "acquisition"
        ? "Customer Acquisition"
        : "Order Frequency"

  return (
    <div className="space-y-2">
      <Badge variant="outline" className="mb-2">
        {title}
      </Badge>
      <AreaChart
        className="h-[180px]"
        data={data}
        index="date"
        categories={categories}
        colors={["primary", "blue"]}
        showLegend={true}
        showGridLines={false}
        showAnimation
        curveType="monotone"
        customTooltip={({ payload }) => {
          if (!payload?.[0]) return null
          return (
            <Card className="p-2 shadow-md border-primary/20">
              <div className="font-medium">{payload[0].payload.date}</div>
              {categories.map((category, index) => (
                <div key={category} className="text-sm text-muted-foreground">
                  {category}: {payload[index]?.value || 0}
                </div>
              ))}
            </Card>
          )
        }}
      />
    </div>
  )
}