import type { EventBridgeEvent } from "aws-lambda";
import type { LazyReaderEventArgs } from "./utils/types";

import { supabaseClient } from "../supabase";
import { getTextFromS3, uploadImageToS3 } from "../aws/utils";
import { generateImageFromSummary } from "../openai";

export async function handler(event: EventBridgeEvent<"summary.requested", LazyReaderEventArgs>) {

  const { url, uid } = event.detail;

  const condition = { url, userUid: uid };

  const { data: record } = await supabaseClient.from("Record").select("summary, metadata").match(condition).single()

  if (record) {
    const summary = await getTextFromS3({
      key: record.summary
    })

    const buffer = await generateImageFromSummary({ text: summary })

    const imageKey = `image/${uid}/${btoa(url)}.png`;

    const objectUrl = await uploadImageToS3({
      buffer,
      key: imageKey
    })

    await supabaseClient.from("Record").update({
      image: objectUrl,
    }).match(condition)
  }
}
