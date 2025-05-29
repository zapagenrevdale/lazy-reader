import type { EventBridgeEvent } from "aws-lambda";
import type { LazyReaderEventArgs } from "./utils/types";

import { supabaseClient } from "../supabase";
import { getTextFromS3, uploadText } from "../aws/utils";
import { summarizeText } from "../openai";
import { sendSummaryEvent } from "../aws/utils/eb";

function getWordCount(text: string): number {
  if (!text || typeof text !== 'string') {
    return 0;
  }

  return text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .length;
}

export async function handler(event: EventBridgeEvent<"summary.requested", LazyReaderEventArgs>) {

  const { url, uid } = event.detail;

  const condition = { url, userUid: uid };

  const { data: record } = await supabaseClient.from("Record").select("content, metadata").match(condition).single()

  if (record) {
    const rawContent = await getTextFromS3({
      key: record.content
    })

    const summary = await summarizeText({
      text: rawContent
    })

    const metadata = (record.metadata ?? {}) as Record<string, string | number>;

    const summaryKey = `summary/${uid}/${btoa(url)}.txt`;

    await uploadText({
      text: summary,
      key: summaryKey,
    })

    await supabaseClient.from("Record").update({
      summary: summaryKey,
      metadata: {
        ...metadata,
        "word count": getWordCount(summary)
      }
    }).match(condition)

    await sendSummaryEvent({
      source: "summary.lambda",
      detailType: "summary.generated",
      details: { url, uid }
    })
  }
}
