/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { fetchOrdersData } from "@/lib/api"
import { processPopularProductsData } from "@/lib/data-utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface PopularProductsListProps {
  config: any
  dateRange: any
}

export function PopularProductsList({ config, dateRange }: PopularProductsListProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const orders = await fetchOrdersData(dateRange)
        const processedData = processPopularProductsData(orders, config.limit || 10, config.sortBy || "quantity")
        setData(processedData)
      } catch (error) {
        console.error("Error loading popular products data:", error)
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
    <Card className="h-[300px] overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product, index) => (
            <TableRow key={product.name}>
              <TableCell>
                {index < 3 ? (
                  <Badge variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}>#{index + 1}</Badge>
                ) : (
                  `#${index + 1}`
                )}
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="text-right">{product.quantity}</TableCell>
              <TableCell className="text-right">${product.revenue.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}