/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { BarChart } from "@tremor/react"
import { fetchOrdersData } from "@/lib/api"
import { processEmployeeDeliveryData } from "@/lib/data-utils"
import { Card } from "@/components/ui/card"

interface EmployeeDeliveryCountProps {
  config: any
  dateRange: any
}

export function EmployeeDeliveryCount({ config, dateRange }: EmployeeDeliveryCountProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const orders = await fetchOrdersData(dateRange)
        const processedData = processEmployeeDeliveryData(orders, config.limit || 5, config.showOnlyActive || false)
        setData(processedData)
      } catch (error) {
        console.error("Error loading employee delivery data:", error)
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
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">No delivery data available</div>
    )
  }

  return (
    <div className="space-y-2">
      <BarChart
        className="h-[200px] mt-4"
        data={data}
        index="name"
        categories={["deliveries"]}
        colors={["primary"]}
        showLegend={false}
        showGridLines={false}
        showAnimation
        customTooltip={({ payload }) => {
          if (!payload?.[0]) return null
          return (
            <Card className="p-2 shadow-md border-primary/20">
              <div className="font-medium">{payload[0].payload.name}</div>
              <div className="text-sm text-muted-foreground">{payload[0].value} deliveries</div>
            </Card>
          )
        }}
      />
    </div>
  )
}