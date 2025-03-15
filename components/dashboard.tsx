import ReportHeader from "@/app/widgets/ReportHeader";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { Plus, Download } from "lucide-react";
import { Button } from "./ui/button";
import { DatePickerWithRange } from "./ui/dateRangePicker";

export default function Dashboard() {
  return <ReportHeader>
  <DatePickerWithRange />
  <Button variant="outline">
    <Plus className="h-4 w-4 mr-2" />
    Add Widget
  </Button>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>
        <Download className="mr-2 h-4 w-4" /> Export
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>Export to PDF</MenubarItem>
        <MenubarItem>Export to PNG</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</ReportHeader>;
}