"use client"
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TabsContent } from "@radix-ui/react-tabs";
import { Link, Settings, WandSparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import z from "zod";


export function SideBar() {
  const { getUserUid } = useUserStore();

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true)
    try {
      const validUrl = z.string().url().parse(url);
      await fetch(process.env.NEXT_PUBLIC_API_URL!, {
        method: "POST",
        body: JSON.stringify({
          url: validUrl,
          uid: getUserUid()
        })
      })
      setUrl("");
    } catch (e) {
      console.log(e)
      toast.error("not a valid url!")
    }
    setLoading(false)
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
      <TabsContent value="simple" className="border-r-5 h-full min-h-full flex-1 p-3 flex flex-col gap-4">
        <Card className="gap-1">
          <CardTitle className="px-4">
            <Button variant="ghost" className="rounded-full">
              <Link className="h-8" />
            </Button>
          </CardTitle>
          <CardContent className="px-4 pb-3">
            <Input onChange={(e) => setUrl(e.target.value)} placeholder="Copy a URL from a blog and paste it in here." autoComplete="off" autoCorrect="off" className="border-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent dark:bg-transparent shadow-none" />
          </CardContent>
          <hr />
        </Card>
        <Button className="text-xl h-12" size="lg" onClick={submit} disabled={loading}>
          <WandSparkles />
          Create
        </Button>
      </TabsContent>
    </Tabs >

  </aside>

}
