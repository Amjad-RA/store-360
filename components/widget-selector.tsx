"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, LineChart, Table, PieChart, Activity, Users, ShoppingBag } from "lucide-react"

interface WidgetSelectorProps {
  open: boolean
  onClose: () => void
  onAddWidget: (widgetType: string) => void
}

export const AVAILABLE_WIDGETS = [
  {
    type: "orders-bar-chart",
    title: "Orders by Day",
    icon: BarChart3,
    description: "Bar chart showing orders by day",
  },
  {
    type: "orders-line-chart",
    title: "Revenue Trend",
    icon: LineChart,
    description: "Line chart showing revenue over time",
  },
  {
    type: "orders-table",
    title: "Recent Orders",
    icon: Table,
    description: "Table of recent orders",
  },
  {
    type: "orders-donut-chart",
    title: "Order Types",
    icon: PieChart,
    description: "Donut chart showing order types",
  },
  {
    type: "orders-metric-card",
    title: "Key Metrics",
    icon: Activity,
    description: "Key performance metrics",
  },
  {
    type: "employee-delivery-count",
    title: "Employee Delivery Count",
    icon: Users,
    description: "Delivery count by employee",
  },
  {
    type: "potential-customers-chart",
    title: "Customer Insights",
    icon: Users,
    description: "Customer acquisition and retention metrics",
  },
  {
    type: "popular-products-list",
    title: "Popular Products",
    icon: ShoppingBag,
    description: "Most ordered products ranking",
  },
]

export function WidgetSelector({ open, onClose, onAddWidget }: WidgetSelectorProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const handleAddWidget = () => {
    if (selectedType) {
      onAddWidget(selectedType)
      onClose()
      setSelectedType(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
          <DialogDescription>Select a widget to add to your dashboard.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 max-h-[60vh] overflow-y-auto">
          {AVAILABLE_WIDGETS.map((widget) => (
            <Card
              key={widget.type}
              className={`cursor-pointer transition-all py-4 ${selectedType === widget.type ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedType(widget.type)}
            >
              <CardContent className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <widget.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{widget.title}</h3>
                  <p className="text-sm text-muted-foreground">{widget.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAddWidget} disabled={!selectedType}>
            Add Widget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}