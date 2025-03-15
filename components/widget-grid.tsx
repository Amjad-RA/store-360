/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Draggable } from "@hello-pangea/dnd"
import { Widget } from "@/components/widget"
import type { WidgetType } from "@/types/widget"

interface WidgetGridProps {
  widgets: WidgetType[]
  dateRange: any
  onRemove: (id: string) => void
  onRefresh: (id: string) => void
}

export function WidgetGrid({ widgets, dateRange, onRemove, onRefresh }: WidgetGridProps) {
  if (widgets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-lg">
        <p className="text-muted-foreground text-center">
          No widgets added yet. Click &quot;Add Widget&quot; to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {widgets.map((widget, index) => (
        <Draggable key={widget.id} draggableId={widget.id} index={index}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <Widget widget={widget} dateRange={dateRange} onRemove={onRemove} onRefresh={onRefresh} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  )
}