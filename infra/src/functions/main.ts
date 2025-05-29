import type { APIGatewayProxyEventV2 } from "aws-lambda";
import type { LazyReaderEventArgs } from "./utils/types";
import { supabaseClient } from "../supabase";
import { sendClientEvent } from "../aws/utils/eb";


export async function handler(event: APIGatewayProxyEventV2) {
  const { url, uid }: LazyReaderEventArgs = JSON.parse(event.body);

  const { data: user, error: userError } = await supabaseClient.from("User").select("id").match({ uid }).single();

  if (!user || userError) {
    await supabaseClient.from("User").insert([
      { uid }
    ])
  }

  const { data: record, error: recordError } = await supabaseClient.from("Record").select("id").match({ userUid: uid, url }).single();

  if (!record || recordError) {

    await supabaseClient.from("Record").insert([
      {
        userUid: uid,
        updatedAt: new Date().toISOString(),
        url,
      }
    ])

    await sendClientEvent({
      source: "client.input",
      details: { url, uid },
      detailType: "scraping.requested"
    });
  }

  return {
    status: "ok",
  }

}
