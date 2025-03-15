/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ReportHeader from "@/components/widgets/ReportHeader";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";
import { Plus, Download } from "lucide-react";
import { Button } from "./ui/button";
import { DatePickerWithRange } from "./ui/dateRangePicker";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { WidgetGrid } from "./widget-grid";
import { useWidgets } from "@/hooks/use-widgets";
import { useDateRange } from "@/contexts/date-range-context";
import { WidgetSelector } from "./widget-selector";
import { useState } from "react";
import { exportDashboardAsPdf, exportDashboardAsPng } from "@/lib/export-utils";

export default function Dashboard() {
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    reorderWidgets(result.source.index, result.destination.index);
  };

  const {
    widgets,
    addWidget,
    removeWidget,
    reorderWidgets,
    refreshWidget,
  } = useWidgets();
  const { dateRange } = useDateRange();

  return (
    <>
      <ReportHeader>
        <DatePickerWithRange />
        <Button variant="outline" onClick={() => setShowWidgetSelector(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Widget
        </Button>
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Download className="mr-2 h-4 w-4" /> Export
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={() => exportDashboardAsPdf("dashboard")}>Export to PDF</MenubarItem>
              <MenubarItem onClick={() => exportDashboardAsPng("dashboard")}>Export to PNG</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </ReportHeader>
      <div className="p-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="widgets" direction="vertical">
          {(provided) => (
            <div
              id="dashboard"
              className="space-y-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <WidgetGrid
                widgets={widgets}
                dateRange={dateRange}
                onRemove={removeWidget}
                onRefresh={refreshWidget}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      </div>
      <WidgetSelector
        open={showWidgetSelector}
        onClose={() => setShowWidgetSelector(false)}
        onAddWidget={addWidget}
      />
    </>
  );
}
