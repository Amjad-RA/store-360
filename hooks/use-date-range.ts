/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"

const STORAGE_KEY = "dashboard-date-range"

// Helper to get default date range (last 30 days)
const getDefaultDateRange = (): any => {
  const today = new Date()
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(today.getDate() - 30)

  return {
    from: thirtyDaysAgo,
    to: today,
  }
}

export function useDateRange() {
  const [dateRange, setDateRange] = useState(getDefaultDateRange())

  // Load date range from localStorage on initial render
  useEffect(() => {
    const savedDateRange = localStorage.getItem(STORAGE_KEY)
    if (savedDateRange) {
      try {
        const parsed = JSON.parse(savedDateRange)
        // Convert string dates back to Date objects
        setDateRange({
          from: parsed.from ? new Date(parsed.from) : undefined,
          to: parsed.to ? new Date(parsed.to) : undefined,
        })
      } catch (error) {
        console.error("Error parsing saved date range:", error)
      }
    }
  }, [])

  // Save date range to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dateRange))
  }, [dateRange])

  return {
    dateRange,
    setDateRange,
  }
}