/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Storage key for persisting date range
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

type DateRangeContextType = {
  dateRange: any
  setDateRange: (value: any) => void
  refreshTrigger: number
  refreshData: () => void
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined)

export function DateRangeProvider({ children }: { children: React.ReactNode }) {
  const [dateRange, setDateRange] = useState<any>(getDefaultDateRange())
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Load date range from localStorage on initial render
  useEffect(() => {
    const savedDateRange = localStorage.getItem(STORAGE_KEY)
    if (savedDateRange) {
      try {
        const parsed = JSON?.parse(savedDateRange)
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

  // Function to update date range and trigger a refresh
  const handleSetDateRange = (value: any) => {
    setDateRange(value)
    // Trigger a refresh when date range changes
    setRefreshTrigger((prev) => prev + 1)
  }

  // Function to manually trigger a refresh
  const refreshData = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <DateRangeContext.Provider
      value={{
        dateRange,
        setDateRange: handleSetDateRange,
        refreshTrigger,
        refreshData,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  )
}

export function useDateRange() {
  const context = useContext(DateRangeContext)
  if (context === undefined) {
    throw new Error("useDateRange must be used within a DateRangeProvider")
  }
  return context
}