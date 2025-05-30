"use client";

import { SideBar } from "@/components/side-bar"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { getRecords } from "@/services/records"
import { DynamicComponents } from "./dynamic-components";
import { use, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabaseClient } from "@/supabase";

export default function RecordsPage({ params }: { params: Promise<{ uid: string }> }) {
  const { uid } = use(params);

  const { data: records, refetch } = useQuery({
    queryKey: ["records"],
    queryFn: () => getRecords({ uid })
  })


  useEffect(() => {
    const subscription = supabaseClient
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: "Record",
          filter: `userUid=eq.${uid}`
        },
        () => {
          refetch()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe();
    }
  }, [refetch, uid])

  return <ResizablePanelGroup direction="horizontal" className="w-full min-h-screen">
    <ResizablePanel className="min-h-screen" defaultSize={20} maxSize={25} minSize={20}>
      <SideBar />
    </ResizablePanel>
    <ResizableHandle withHandle />
    <DynamicComponents records={records ?? []} />
  </ResizablePanelGroup>


}
