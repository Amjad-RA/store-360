/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchOrdersData } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface OrdersTableProps {
  config: any
  dateRange: any
}

export function OrdersTable({ config, dateRange }: OrdersTableProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const orders = await fetchOrdersData(dateRange)
        // Sort and limit the orders
        const sortedOrders = [...orders].sort((a, b) => {
          const sortKey = config.sortBy || "Order_ID"
          const key = sortKey as keyof typeof a;
          if (a?.[key] < b?.[key]) return -1
          if (a?.[key] > b?.[key]) return 1
          return 0
        })
        setData(sortedOrders.slice(0, config.limit || 5))
      } catch (error) {
        console.error("Error loading table data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [dateRange, config])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Badge variant="default">Delivered</Badge>
      case "In Transit":
        return <Badge variant="secondary">In Transit</Badge>
      case "Pending":
        return <Badge variant="destructive">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center">Loading...</div>
  }

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">No data available</div>
    )
  }

  return (
    <Card className="h-[300px] overflow-auto" data-export-container="true">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((order) => {
            // Calculate total price
            const totalPrice = order.Items.reduce((sum: number, item: any) => sum + item.Total_Price, 0)

            return (
              <TableRow key={order.Order_ID}>
                <TableCell className="font-medium">#{order.Order_ID}</TableCell>
                <TableCell>{order.Customer_Name}</TableCell>
                <TableCell>{getStatusBadge(order.Order_Status)}</TableCell>
                <TableCell className="text-right">${totalPrice.toFixed(2)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}