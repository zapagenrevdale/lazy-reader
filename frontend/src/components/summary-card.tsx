"use client"

import { useRecordStore } from "@/store/record";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check, Loader2, Music, Text } from "lucide-react";

type Summary = {
  id: number;
  url: string;
  summary: string | null;
  audio: string | null;
}

export function SummaryCard({ id, url, summary, audio }: Summary) {
  const { id: recordId, setId } = useRecordStore()

  return (
    <Card className={cn("w-full mb-4 cursor-pointer transition-colors hover:bg-accent", { "border border-accent": id === recordId })} onClick={() => setId(id)}>
      <CardContent>
        <div className="flex justify-between items-start">
          <h2 className="font-medium">{url}</h2>
        </div>
        <div className="flex gap-3 pt-2">
          <div className="flex items-center gap-1">
            <div className="p-1 bg-secondary rounded flex items-center justify-center">
              <Text className="text-primary/80 size-4" />
            </div>
            {Boolean(summary) ? <Check className="text-green-500/80 size-4" /> :
              <Loader2 className="text-foreground/80 size-4 animate-spin" />
            }
          </div>
          <div className="flex items-center gap-1">
            <div className="p-1 bg-secondary rounded flex items-center justify-center">
              <Music className="text-primary/80 size-4" />
            </div>
            {Boolean(audio) ? <Check className="text-green-500/80 size-4" /> :
              <Loader2 className="text-foreground/80 size-4 animate-spin" />
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
