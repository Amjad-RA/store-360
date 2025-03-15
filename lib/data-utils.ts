/* eslint-disable @typescript-eslint/no-explicit-any */
// Utility functions for processing data for charts and widgets

export function processOrdersForBarChart(orders: any[], dataKey: string, limit: number) {
  // Count occurrences of each value for the given dataKey
  const counts: Record<string, number> = {}

  orders.forEach((order) => {
    const value = order[dataKey] || "Unknown"
    counts[value] = (counts[value] || 0) + 1
  })

  // Convert to array format for BarChart
  const result = Object.entries(counts).map(([name, count]) => ({
    name,
    count,
  }))

  // Sort by count descending and limit
  return result.sort((a, b) => b.count - a.count).slice(0, limit)
}

export function processOrdersForLineChart(orders: any[], limit: number) {
  // Group orders by date and calculate daily revenue
  const dailyRevenue: Record<string, number> = {}

  orders.forEach((order) => {
    const date = new Date(order.Timestamp)
    const dateStr = date.toISOString().split("T")[0]

    const orderTotal = order.Items.reduce((sum: number, item: any) => sum + item.Total_Price, 0)

    dailyRevenue[dateStr] = (dailyRevenue[dateStr] || 0) + orderTotal
  })

  // Convert to array format for LineChart
  const result = Object.entries(dailyRevenue).map(([date, revenue]) => ({
    date,
    revenue,
  }))

  // Sort by date ascending and limit
  return result.sort((a, b) => a.date.localeCompare(b.date)).slice(-limit)
}

export function processOrdersForDonutChart(orders: any[], dataKey: string) {
  // Count occurrences of each value for the given dataKey
  const counts: Record<string, number> = {}

  orders.forEach((order) => {
    const value = order[dataKey] || "Unknown"
    counts[value] = (counts[value] || 0) + 1
  })

  // Convert to array format for DonutChart
  return Object.entries(counts).map(([name, count]) => ({
    name,
    value: count,
  }))
}

export function calculateOrderMetrics(orders: any[]) {
  const totalOrders = orders.length
  let totalRevenue = 0
  let itemsSold = 0

  orders.forEach((order) => {
    // Calculate total revenue
    const orderTotal = order.Items.reduce((sum: number, item: any) => sum + item.Total_Price, 0)
    totalRevenue += orderTotal

    // Count total items sold
    itemsSold += order.Items.reduce((sum: number, item: any) => sum + item.Quantity, 0)
  })

  // Calculate average order value
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    itemsSold,
  }
}

export function processOrdersForStatusCard(orders: any[]) {
  // Count orders by status
  const statusCounts: Record<string, number> = {}

  orders.forEach((order) => {
    const status = order.Order_Status || "Unknown"
    statusCounts[status] = (statusCounts[status] || 0) + 1
  })

  // Convert to array format for BarList
  return Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }))
}

export function processEmployeeDeliveryData(orders: any[], limit: number, showOnlyActive: boolean) {
  const employeeCounts: Record<string, number> = {}

  orders.forEach((order) => {
    if (order.Delivery_Person) {
      employeeCounts[order.Delivery_Person] = (employeeCounts[order.Delivery_Person] || 0) + 1
    }
  })

  let result = Object.entries(employeeCounts).map(([name, deliveries]) => ({
    name,
    deliveries,
  }))

  if (showOnlyActive) {
    result = result.filter((employee) => employee.deliveries > 0) // Example of filtering active employees
  }

  return result.sort((a, b) => b.deliveries - a.deliveries).slice(0, limit)
}

export function processCustomerInsightData(orders: any[]) {
  const dailyData: Record<string, { new: number; returning: number; customers: number; frequency: number }> = {}

  orders.forEach((order) => {
    const date = new Date(order.Timestamp).toISOString().split("T")[0]
    if (!dailyData[date]) {
      dailyData[date] = { new: 0, returning: 0, customers: 0, frequency: 0 }
    }

    // Simple logic for new vs returning (improve with actual customer IDs)
    if (dailyData[date].customers === 0) {
      dailyData[date].new += 1
    } else {
      dailyData[date].returning += 1
    }
    dailyData[date].customers += 1
    dailyData[date].frequency += order.Items.length
  })

  const result = Object.entries(dailyData).map(([date, values]) => ({
    date,
    new: values.new,
    returning: values.returning,
    customers: values.customers,
    frequency: values.frequency,
  }))

  return result.sort((a, b) => a.date.localeCompare(b.date))
}

export function processPopularProductsData(orders: any[], limit: number, sortBy: string) {
  const productCounts: Record<string, { quantity: number; revenue: number }> = {}

  orders.forEach((order) => {
    order.Items.forEach((item: any) => {
      if (!productCounts[item.Item_Name]) {
        productCounts[item.Item_Name] = { quantity: 0, revenue: 0 }
      }
      productCounts[item.Item_Name].quantity += item.Quantity
      productCounts[item.Item_Name].revenue += item.Total_Price
    })
  })

  const result = Object.entries(productCounts).map(([name, values]) => ({
    name,
    quantity: values.quantity,
    revenue: values.revenue,
  }))

  return result
    .sort((a, b) => {
      if (sortBy === "quantity") {
        return b.quantity - a.quantity
      } else {
        return b.revenue - a.revenue
      }
    })
    .slice(0, limit)
}

export function processOrderAreaData(orders: any[], mapType: string, groupBy: string) {
  const areaCounts: Record<string, number> = {}

  orders.forEach((order) => {
    let area = order.Customer_Address
    if (groupBy === "area") {
      area = order.Customer_Address.split(" ").pop() || "Unknown"
    } else if (groupBy === "order_type") {
      area = order.Order_Type
    } else if (groupBy === "order_status") {
      area = order.Order_Status
    }

    areaCounts[area] = (areaCounts[area] || 0) + 1
  })

  // Convert to array format for ScatterChart (bubble chart)
  // Generate x and y coordinates for each area to create a bubble chart layout
  return Object.entries(areaCounts).map(([name, value], index) => {
    // Create a grid-like layout for the bubbles
    // This is a simple algorithm to position bubbles in a grid
    const gridSize = Math.ceil(Math.sqrt(Object.keys(areaCounts).length))
    const row = Math.floor(index / gridSize)
    const col = index % gridSize

    // Add some randomness to make it look more natural
    const jitter = () => (Math.random() - 0.5) * 0.5

    return {
      name,
      value,
      // Position bubbles in a grid with some randomness
      x: col + 1 + jitter(),
      y: row + 1 + jitter(),
    }
  })
}