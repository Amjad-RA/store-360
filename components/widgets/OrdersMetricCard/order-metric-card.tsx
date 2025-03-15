/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { fetchOrdersData } from "@/lib/api";
import { calculateOrderMetrics } from "@/lib/data-utils";
import { Card } from "@/components/ui/card";
import { useDateRange } from "@/hooks/use-date-range";

interface OrdersMetricCardProps {
  config: any;
  dateRange: any;
}

export function OrdersMetricCard({ config }: OrdersMetricCardProps) {
  const [metrics, setMetrics] = useState<any>({
    totalOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0,
    itemsSold: 0,
  });
  const [loading, setLoading] = useState(true);

  const { dateRange } = useDateRange();

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
      <div className="h-[300px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[300px]">
      <Card className="p-4">
      <div className="flex items-center justify-between w-full h-full">
          <div className="flex flex-col w-full h-full">
            <div className="text-sm font-medium leading-none text-muted-foreground">Total Orders</div>
            <div className="flex items-center justify-between w-full h-full">
              <span className="m-auto text-2xl font-semibold">{metrics.totalOrders}
            </span>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4">
      <div className="flex items-center justify-between w-full h-full">
          <div className="flex flex-col w-full h-full">
            <div className="text-sm font-medium leading-none text-muted-foreground">Total Revenue</div>
            <div className="flex items-center justify-between w-full h-full">
              <span className="m-auto text-2xl font-semibold">
              $ {metrics.totalRevenue.toFixed(2)}
            </span>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4">
      <div className="flex items-center justify-between w-full h-full">
          <div className="flex flex-col w-full h-full">
            <div className="text-sm font-medium leading-none text-muted-foreground">Avg. Order Value</div>
            <div className="flex items-center justify-between w-full h-full">
              <span className="m-auto text-2xl font-semibold">
              $ {metrics.averageOrderValue.toFixed(2)}
            </span>
            </div>
          </div>
        </div>
      </Card>
      <Card className="p-4">
        <div className="flex items-center justify-between w-full h-full">
          <div className="flex flex-col w-full h-full">
            <div className="text-sm font-medium leading-none text-muted-foreground">
              Items Sold
            </div>
            <div className="flex items-center justify-between w-full h-full">
              <span className="m-auto text-2xl font-semibold">
                {metrics.itemsSold}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
