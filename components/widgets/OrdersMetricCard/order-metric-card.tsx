/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { fetchOrdersData } from "@/lib/api";
import { calculateOrderMetrics } from "@/lib/data-utils";
import { Card } from "@/components/ui/card";

interface OrdersMetricCardProps {
  config: any;
  dateRange: any;
}

export function OrdersMetricCard({ config, dateRange }: OrdersMetricCardProps) {
  const [metrics, setMetrics] = useState<any>({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    itemsSold: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const orders = await fetchOrdersData(dateRange);
        const calculatedMetrics = calculateOrderMetrics(orders);
        setMetrics(calculatedMetrics);
      } catch (error) {
        console.error("Error loading metrics data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dateRange, config]);

  if (loading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium leading-none">Total Orders</p>
            <p className="text-lg font-semibold">{metrics.totalOrders}</p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium leading-none">Total Revenue</p>
            <p className="text-lg font-semibold">
              ${metrics.totalRevenue.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium leading-none">Avg. Order Value</p>
            <p className="text-lg font-semibold">
              ${metrics.averageOrderValue.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium leading-none">Items Sold</p>
            <p className="text-lg font-semibold">
            {metrics.itemsSold}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
