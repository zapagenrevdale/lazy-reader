import type { EventBridgeEvent } from "aws-lambda";
import type { LazyReaderEventArgs } from "./utils/types";

import { supabaseClient } from "../supabase";
import { getTextFromS3, uploadAudioToS3 } from "../aws/utils";
import { textToAudio } from "../openai";

export async function handler(event: EventBridgeEvent<"summary.requested", LazyReaderEventArgs>) {

  const { url, uid } = event.detail;

  const condition = { url, userUid: uid };

  const { data: record } = await supabaseClient.from("Record").select("summary, metadata").match(condition).single()

  if (record) {
    const summary = await getTextFromS3({
      key: record.summary
    })

    const audioBuffer = await textToAudio({ text: summary })

    const audioKey = `audio/${uid}/${btoa(url)}.wav`;

    await uploadAudioToS3({
      audioBuffer: audioBuffer,
      key: audioKey
    })

    await supabaseClient.from("Record").update({
      audio: audioKey,
    }).match(condition)
  }
}
