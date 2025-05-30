// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../.sst/platform/config.d.ts" />

import { bucket } from "./buckets";
import { openAiKey, supabaseKey, supabaseUrl } from "./secrets";

export const summaryBus = new sst.aws.Bus("SummaryBus");

summaryBus.subscribe("SummarizationSubscriber", {
  link: [supabaseKey, supabaseUrl, bucket, summaryBus, openAiKey],
  handler: "src/functions/summary.handler",
  timeout: "10 minutes",
  retries: 1,
}, {
  pattern: {
    detailType: ["summary.requested"],
    source: ["scraping.lambda"]
  }
});

summaryBus.subscribe("TTSSubscriber", {
  link: [supabaseKey, supabaseUrl, bucket, openAiKey],
  handler: "src/functions/tts.handler",
  timeout: "5 minutes",
  retries: 1,
}, {
  pattern: {
    detailType: ["summary.generated"],
    source: ["summary.lambda"]
  }
});

summaryBus.subscribe("ImageSubscriber", {
  link: [supabaseKey, supabaseUrl, bucket, openAiKey],
  handler: "src/functions/image.handler",
  timeout: "5 minutes",
  retries: 1,
}, {
  pattern: {
    detailType: ["summary.generated"],
    source: ["summary.lambda"]
  }
});

export const clientBus = new sst.aws.Bus("ClientBus");

clientBus.subscribe("ScrapingSubscriber",
  {
    link: [supabaseKey, supabaseUrl, bucket, summaryBus],
    handler: "src/functions/scraping.handler",
    timeout: "10 minutes",
    nodejs: {
      install: ["@sparticuz/chromium"],
    },
    retries: 2
  },
  {
    pattern: {
      detailType: ["scraping.requested"],
      source: ["client.input"]
    }
  }
);

