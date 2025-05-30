"use server"

import { LazyReaderRecord } from "@/schemas";
import { supabaseClient } from "@/supabase";

export async function getRecords({ uid }: { uid: string }): Promise<LazyReaderRecord[]> {

  const { data } = await supabaseClient
    .from("Record")
    .select("*")
    .eq("userUid", uid);

  return (data ?? []) as LazyReaderRecord[];
}

