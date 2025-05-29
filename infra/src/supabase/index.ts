// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../sst-env.d.ts" />

import { createClient } from '@supabase/supabase-js'
import { Resource } from "sst";
import { Database } from './database.types';

const supabaseKey = Resource.SupabaseKey.value;
const supabaseUrl = Resource.SupabaseUrl.value;

export const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey)
