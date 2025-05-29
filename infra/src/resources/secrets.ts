// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../.sst/platform/config.d.ts" />

export const supabaseUrl = new sst.Secret("SupabaseUrl");
export const supabaseKey = new sst.Secret("SupabaseKey");

export const openAiKey = new sst.Secret("OpenAiKey");
