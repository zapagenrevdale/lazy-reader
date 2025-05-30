import { createClient } from "@supabase/supabase-js"
import { Database } from "./database.types";

//TODO: use t3 env

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export const supabaseClient = createClient<Database>(url, key)
