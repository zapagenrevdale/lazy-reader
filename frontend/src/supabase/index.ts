import { createClient } from "@supabase/supabase-js"
import { Database } from "./database.types";

//TODO: use t3 env
export const supabaseClient = createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
