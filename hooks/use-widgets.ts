/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import type { WidgetType } from "@/types/widget"

const STORAGE_KEY = "dashboard-widgets"

const DEFAULT_WIDGET_CONFIGS = {
  "orders-bar-chart": {
    dataKey: "Order_Status",
    limit: 10,
  },
  "orders-line-chart": {
    limit: 10,
  },
  "orders-table": {
    limit: 5,
    sortBy: "Order_ID",
  },
  "orders-donut-chart": {
    dataKey: "Order_Type",
  },
  "orders-metric-card": {},
  "orders-status-card": {},
  "employee-delivery-count": {
    limit: 5,
    showOnlyActive: false,
  },
  "potential-customers-chart": {
    chartType: "retention",
  },
  "popular-products-list": {
    limit: 10,
    sortBy: "quantity",
  },
  "order-area-map": {
    mapType: "heatmap",
    groupBy: "area",
  },
}

const WIDGET_TITLES = {
  "orders-bar-chart": "Orders by Status",
  "orders-line-chart": "Revenue Trend",
  "orders-table": "Recent Orders",
  "orders-donut-chart": "Order Types",
  "orders-metric-card": "Key Metrics",
  "orders-status-card": "Order Status",
  "employee-delivery-count": "Employee Delivery Count",
  "potential-customers-chart": "Customer Insights",
  "popular-products-list": "Popular Products",
  "order-area-map": "Order Locations",
}

export function useWidgets() {
  const [widgets, setWidgets] = useState<WidgetType[]>([])

  // Load widgets from localStorage on initial render
  useEffect(() => {
    const savedWidgets = localStorage.getItem(STORAGE_KEY)
    if (savedWidgets) {
      try {
        setWidgets(JSON.parse(savedWidgets))
      } catch (error) {
        console.error("Error parsing saved widgets:", error)
      }
    }
  }, [])

  // Save widgets to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets))
  }, [widgets])

  const addWidget = (widgetType: string) => {
    const newWidget: WidgetType = {
      id: uuidv4(),
      type: widgetType,
      title: WIDGET_TITLES[widgetType as keyof typeof WIDGET_TITLES] || "New Widget",
      config: DEFAULT_WIDGET_CONFIGS[widgetType as keyof typeof DEFAULT_WIDGET_CONFIGS] || {},
    }

    setWidgets((prev) => [...prev, newWidget])
  }

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id))
  }

  const reorderWidgets = (sourceIndex: number, destinationIndex: number) => {
    setWidgets((prev) => {
      const result = Array.from(prev)
      const [removed] = result.splice(sourceIndex, 1)
      result.splice(destinationIndex, 0, removed)
      return result
    })
  }

  const updateWidgetConfig = (id: string, newConfig: any) => {
    setWidgets((prev) =>
      prev.map((widget) =>
        widget.id === id ? { ...widget, title: newConfig.title || widget.title, config: newConfig } : widget,
      ),
    )
  }

  const refreshWidget = (id: string) => {
    // This function doesn't actually modify the widget,
    // but it's called when the refresh button is clicked
    // The actual refresh happens in the widget component
    console.log(`Refreshing widget ${id}`)
  }

  return {
    widgets,
    setWidgets,
    addWidget,
    removeWidget,
    reorderWidgets,
    updateWidgetConfig,
    refreshWidget,
  }
}