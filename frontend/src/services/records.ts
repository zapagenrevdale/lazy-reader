"use server"

import { LazyReaderRecord } from "@/schemas";
import { supabaseClient } from "@/supabase";
import { unstable_noStore as noStore } from 'next/cache';

export async function getRecords({ uid }: { uid: string }): Promise<LazyReaderRecord[]> {
  noStore(); // Opt out of caching

  const { data } = await supabaseClient
    .from("Record")
    .select("*")
    .eq("userUid", uid);

  return (data ?? []) as LazyReaderRecord[];
}

