"use server"

import { SideBar } from "@/components/side-bar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { getRecords } from "@/services/records"
import { DynamicComponents } from "./dynamic-components";

export default async function RecordsPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = await params;

  const records = await getRecords({ uid })

  return <ResizablePanelGroup direction="horizontal" className="w-full min-h-screen">
    <ResizablePanel className="min-h-screen" defaultSize={20} maxSize={25} minSize={20}>
      <SideBar />
    </ResizablePanel>
    <ResizableHandle withHandle />
    <DynamicComponents records={records} />
  </ResizablePanelGroup>


}
