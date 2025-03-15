"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { WidgetType } from "@/types/widget"
import { useWidgets } from "@/hooks/use-widgets"
import { Checkbox } from "@/components/ui/checkbox"

interface WidgetConfigProps {
  widget: WidgetType
  open: boolean
  onClose: () => void
}

export function WidgetConfig({ widget, open, onClose }: WidgetConfigProps) {
  const { updateWidgetConfig } = useWidgets()
  const [title, setTitle] = useState(widget.title)
  const [config, setConfig] = useState({ ...widget.config })

  const handleSave = () => {
    updateWidgetConfig(widget.id, { ...config, title })
    onClose()
  }

  const renderConfigFields = () => {
    switch (widget.type) {
      case "orders-bar-chart":
      case "orders-line-chart":
        return (
          <>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="dataKey">Data Key</Label>
              <Select
                value={config.dataKey || "Order_Status"}
                onValueChange={(value) => setConfig({ ...config, dataKey: value })}
              >
                <SelectTrigger id="dataKey">
                  <SelectValue placeholder="Select data key" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Order_Status">Order Status</SelectItem>
                  <SelectItem value="Order_Type">Order Type</SelectItem>
                  <SelectItem value="Delivery_Status">Delivery Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case "orders-table":
        return (
          <>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="limit">Limit</Label>
              <Input
                id="limit"
                type="number"
                value={config.limit || 5}
                onChange={(e) => setConfig({ ...config, limit: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="sortBy">Sort By</Label>
              <Select
                value={config.sortBy || "Order_ID"}
                onValueChange={(value) => setConfig({ ...config, sortBy: value })}
              >
                <SelectTrigger id="sortBy">
                  <SelectValue placeholder="Select sort field" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Order_ID">Order ID</SelectItem>
                  <SelectItem value="Customer_Name">Customer Name</SelectItem>
                  <SelectItem value="Order_Status">Order Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case "orders-donut-chart":
        return (
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="dataKey">Data Key</Label>
            <Select
              value={config.dataKey || "Order_Type"}
              onValueChange={(value) => setConfig({ ...config, dataKey: value })}
            >
              <SelectTrigger id="dataKey">
                <SelectValue placeholder="Select data key" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Order_Type">Order Type</SelectItem>
                <SelectItem value="Order_Status">Order Status</SelectItem>
                <SelectItem value="Delivery_Status">Delivery Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      case "employee-delivery-count":
        return (
          <>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="limit">Limit</Label>
              <Input
                id="limit"
                type="number"
                value={config.limit || 5}
                onChange={(e) => setConfig({ ...config, limit: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="showOnlyActive">Display Options</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="showOnlyActive"
                  checked={config.showOnlyActive || false}
                  onCheckedChange={(checked) => setConfig({ ...config, showOnlyActive: checked === true })}
                />
                <label
                  htmlFor="showOnlyActive"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show only active delivery personnel
                </label>
              </div>
            </div>
          </>
        )
      case "popular-products-list":
        return (
          <>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="limit">Number of Products</Label>
              <Input
                id="limit"
                type="number"
                value={config.limit || 10}
                onChange={(e) => setConfig({ ...config, limit: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="sortBy">Sort By</Label>
              <Select
                value={config.sortBy || "quantity"}
                onValueChange={(value) => setConfig({ ...config, sortBy: value })}
              >
                <SelectTrigger id="sortBy">
                  <SelectValue placeholder="Select sort criteria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quantity">Quantity Sold</SelectItem>
                  <SelectItem value="revenue">Revenue Generated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case "potential-customers-chart":
        return (
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="chartType">Chart Type</Label>
            <Select
              value={config.chartType || "retention"}
              onValueChange={(value) => setConfig({ ...config, chartType: value })}
            >
              <SelectTrigger id="chartType">
                <SelectValue placeholder="Select chart type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="retention">Customer Retention</SelectItem>
                <SelectItem value="acquisition">Customer Acquisition</SelectItem>
                <SelectItem value="frequency">Order Frequency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )
      case "order-area-map":
        return (
          <>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="groupBy">Group By</Label>
              <Select
                value={config.groupBy || "area"}
                onValueChange={(value) => setConfig({ ...config, groupBy: value })}
              >
                <SelectTrigger id="groupBy">
                  <SelectValue placeholder="Select grouping" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="area">Area</SelectItem>
                  <SelectItem value="order_type">Order Type</SelectItem>
                  <SelectItem value="order_status">Order Status</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configure Widget</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Widget Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {renderConfigFields()}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}