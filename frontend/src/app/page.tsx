"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent } from "@radix-ui/react-tabs";
import { Link, Settings, WandSparkles } from "lucide-react";
import {useState} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  url: z.string(),
})

type Summary = {
  id: string;
  url: string;
  content?: string;
  isSelected?: boolean
}

function SideBar({ onCreateSummary }: { onCreateSummary: (url: string) => void }) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.url) {
      return;
    }
    onCreateSummary(data.url);
    form.reset();
  }

  return <aside>
    <Tabs defaultValue="simple" className="min-h-screen flex flex-col gap-0">
      <div className="p-2.5 flex justify-between items-center px-3 border-b">
        <div className="w-fit rounded-full p-2 bg-secondary/30">
          <Settings />
        </div>
        <TabsList className="grid grid-cols-2 px-1">
          <TabsTrigger value="simple">Simple</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        <div>
        </div>
      </div>
      <TabsContent value="simple" className="border-r-5 h-full min-h-full flex-1 p-3 flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 flex flex-col justify-between flex-1">
            <Card className="gap-1">
              <CardTitle className="px-4">
                <Button variant="ghost" className="rounded-full">
                  <Link className="h-8" />
                </Button>
              </CardTitle>
              <CardContent className="px-4 pb-3">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input placeholder="Copy a URL from a blog and paste it in here." {...field} autoComplete="off" autoCorrect="off" className="border-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent dark:bg-transparent shadow-none" />
                      </FormControl>
                      <FormMessage className="text-sm text-center" />
                    </FormItem>
                  )}
                />
              </CardContent>
              <hr />
              <CardFooter className="h-4">
              </CardFooter>
            </Card>
            <Button className="text-xl h-12" size="lg" type="submit">
              <WandSparkles />
              Create
            </Button>
          </form>
        </Form>
      </TabsContent>
    </Tabs >

  </aside>

}


export function SummaryCard({ summary, onClick }: { summary: Summary, onClick?: () => void }) {
  return (
    <Card className={`w-full mb-4 cursor-pointer transition-colors hover:bg-accent ${summary.isSelected ? 'border-primary' : ''}`} onClick={onClick}>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-medium">{summary.url}</h2>
          <span className="text-sm text-muted-foreground">
            tite
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          tite
        </p>
      </CardContent>
    </Card>
  );
}


export default function Home() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [selectedSummaryId, setSelectedSummaryId] = useState<string | null>(null);

  const addSummary = (url: string) => {
    const newSummary: Summary = {
      id: Math.random().toString(36).substring(7),
      url,
    };
    setSummaries(prev => [newSummary, ...prev]);
  };

  const handleCardClick = (id: string) => {
    setSelectedSummaryId(id);
  };

  const selectedSummary = summaries.find(s => s.id === selectedSummaryId);

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full min-h-screen">
      <ResizablePanel className="min-h-screen" defaultSize={15} maxSize={20} minSize={15}>
        <SideBar onCreateSummary={addSummary} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={selectedSummary ? 55 : 85}>
        <div className="p-10">
          <h1 className="text-3xl mb-6">My Summaries</h1>
          <div className="grid gap-4">
            {summaries.map(summary => (
              <SummaryCard 
                key={summary.id} 
                summary={{...summary, isSelected: summary.id === selectedSummaryId}}
                onClick={() => handleCardClick(summary.id)}
              />
            ))}
          </div>
        </div>
      </ResizablePanel>
      {selectedSummary && (
        <>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={15} maxSize={20} minSize={15}>
            <div className="p-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Summary Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">URL</h3>
                      <p className="mt-1">{selectedSummary.url}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Content</h3>
                      <p className="mt-1">tite</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ResizablePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
}
