/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, GripVertical, RefreshCw, X, Settings } from "lucide-react"
import type { WidgetType } from "@/types/widget"
import { exportWidgetAsPdf, exportWidgetAsPng } from "@/lib/export-utils"
import { WidgetConfig } from "@/components/widget-config"
import { OrdersBarChart } from "@/components/widgets/OrdersBarChart"
import { OrdersMetricCard } from "./widgets/OrdersMetricCard/order-metric-card"
// import { OrdersLineChart } from "@/components/widgets/orders-line-chart"
// import { OrdersTable } from "@/components/widgets/orders-table"
// import { OrdersDonutChart } from "@/components/widgets/orders-donut-chart"
// import { OrdersMetricCard } from "@/components/widgets/orders-metric-card"
// import { OrdersStatusCard } from "@/components/widgets/orders-status-card"
// import { EmployeeDeliveryCount } from "@/components/widgets/employee-delivery-count"
// import { PotentialCustomersChart } from "@/components/widgets/potential-customers-chart"
import { PopularProductsList } from "@/components/widgets/PopularProductList"
// import { OrderAreaMap } from "@/components/widgets/order-area-map"

interface WidgetProps {
  widget: WidgetType
  dateRange: any
  onRemove: (id: string) => void
  onRefresh: (id: string) => void
}

export function Widget({ widget, dateRange, onRemove, onRefresh }: WidgetProps) {
  const [loading, setLoading] = useState(false)
  const [showConfig, setShowConfig] = useState(false)

  useEffect(() => {
    // Update local config state when widget config changes from parent
    setShowConfig(false)
  }, [widget.config])

  const handleRefresh = () => {
    setLoading(true)
    onRefresh(widget.id)
    setTimeout(() => setLoading(false), 1000)
  }

  const renderWidgetContent = () => {
    if (loading) {
      return (
        <div className="w-full h-[300px] flex items-center justify-center">
          <Skeleton className="h-[300px] w-full" />
        </div>
      )
    }

    switch (widget.type) {
      case "orders-bar-chart":
        return <OrdersBarChart config={widget.config} dateRange={dateRange} />
      // case "orders-line-chart":
      //   return <OrdersLineChart config={widget.config} dateRange={dateRange} />
      // case "orders-table":
      //   return <OrdersTable config={widget.config} dateRange={dateRange} />
      // case "orders-donut-chart":
      //   return <OrdersDonutChart config={widget.config} dateRange={dateRange} />
      case "orders-metric-card":
        return <OrdersMetricCard config={widget.config} dateRange={dateRange} />
      // case "orders-status-card":
      //   return <OrdersStatusCard config={widget.config} dateRange={dateRange} />
      // case "employee-delivery-count":
      //   return <EmployeeDeliveryCount config={widget.config} dateRange={dateRange} />
      // case "potential-customers-chart":
      //   return <PotentialCustomersChart config={widget.config} dateRange={dateRange} />
      case "popular-products-list":
        return <PopularProductsList config={widget.config} dateRange={dateRange} />
      // case "order-area-map":
      //   return <OrderAreaMap config={widget.config} dateRange={dateRange} />
      default:
        return <div>Unknown widget type</div>
    }
  }

  return (
    <>
      <Card className="relative shadow-sm" id={`widget-${widget.id}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
            <CardTitle className="text-md">{widget.title}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowConfig(true)}>
              <Settings className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => exportWidgetAsPdf(`widget-${widget.id}`)}>
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => exportWidgetAsPng(`widget-${widget.id}`)}>
                  Export as PNG
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={() => onRemove(widget.id)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>{renderWidgetContent()}</CardContent>
      </Card>

      <WidgetConfig widget={widget} open={showConfig} onClose={() => setShowConfig(false)} />
    </>
  )
}