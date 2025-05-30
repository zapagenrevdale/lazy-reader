"use client"
import type { LazyReaderRecord } from "@/schemas";

import { SummaryCard } from "@/components/summary-card";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable"
import { useMemo } from "react";
import { useRecordStore } from "@/store/record";
import { useQuery } from "@tanstack/react-query";
import { getText } from "@/services/s3";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AudioPlayer } from "@/components/audio-player";
import { Loader2 } from "lucide-react";
import Image from "next/image";


export function DynamicComponents({ records }: { records: LazyReaderRecord[] }) {
  const { id, setId } = useRecordStore();

  const selectedRecord = useMemo(() => id !== undefined ? records.at(id) : undefined, [id, records]);

  const { data } = useQuery({
    queryKey: [`record-${id}`, selectedRecord],
    queryFn: () => getText(selectedRecord?.summary ?? ""),
    enabled: Boolean(selectedRecord),
  })

  const goToNext = () => {
    if (id !== undefined) {
      if (id < records.length - 1) {
        setId(id + 1)
      } else {
        setId(0)
      }
    }
  }

  const goToPrev = () => {
    if (id !== undefined) {
      if (id > 0) {
        setId(id - 1)
      } else {
        setId(records.length - 1)
      }
    }
  }

  return <>
    <ResizablePanel defaultSize={id === undefined ? 80 : 50}>
      <div className="pt-10 pb-40 px-8">
        <h1 className="text-3xl mb-10">My Summaries</h1>
        <div className="grid gap-2">
          {/* TODO: use id instead of index */}
          {records.map((record, index) => <SummaryCard id={index} key={record.id} url={record.url} audio={record.audio} summary={record.summary} />)}
        </div>
      </div>
    </ResizablePanel>
    {selectedRecord === undefined ? null : <>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} maxSize={25} minSize={20}>
        <ScrollArea className="h-screen">
          <div className="pt-10 pb-40 px-3 space-y-3">
            <div className="h-64 bg-primary w-full rounded relative">
              {selectedRecord.image ? <Image src={selectedRecord.image} fill className="object-cover" alt="Image" /> : null}
            </div>
            <div className="mb-6">
              <h1 className="text-xl">{selectedRecord.metadata?.title ?? "~No Title yet"}</h1>
              <small className="bg-secondary p-1">{selectedRecord.metadata?.["word count"] ?? "???"} words</small>
            </div>
            {Boolean(data) ? <p className="font-light whitespace-pre-wrap">
              {data}
            </p> : <div className="h-40 w-full flex items-center justify-center">
              <Loader2 className="text-primary/80 animate-spin" />
            </div>
            }
          </div>
        </ScrollArea>
      </ResizablePanel>
      <div className="absolute bottom-0 left-0">
        {selectedRecord ? <AudioPlayer
          audioUrl={selectedRecord.audio!}
          title={selectedRecord.metadata?.title ?? "~No Title"}
          url={selectedRecord.url}
          albumArt={selectedRecord.image}
          goToNext={goToNext}
          goToPrev={goToPrev}
        />
          : null
        }
      </div>
    </>
    }
  </>
}
