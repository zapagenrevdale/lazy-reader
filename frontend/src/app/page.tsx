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
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  url: z.string().url(),
})


function SideBar() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
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


export function SummaryCard() {
  return <div>

  </div>
}


export default function Home() {

  return <ResizablePanelGroup
    direction="horizontal"
    className="w-full min-h-screen"
  >
    <ResizablePanel className="min-h-screen" defaultSize={15} maxSize={20} minSize={15}>
      <SideBar />
    </ResizablePanel>
    <ResizableHandle withHandle />
    <ResizablePanel defaultSize={85}>
      <div className="p-10">
        <h1 className="text-3xl">
          My Summaries
        </h1>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
}
