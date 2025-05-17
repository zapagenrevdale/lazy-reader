// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../.sst/platform/config.d.ts" />

export const bus = new sst.aws.Bus("LevelLearningBus");

bus.subscribe("UploadBusSubscriber", {
  handler: "src/functions/upload.handler",
  timeout: "60 seconds",
}, {
  pattern: {
    detailType: ["upload"],
    source: ["frontend.input"]
  }
});

bus.subscribe("LLMSummarySubscriber", {
  handler: "src/functions/upload.handler",
  timeout: "60 seconds",
}, {
  pattern: {
    detailType: ["summarize"],
    source: ["lambda.uploader"]
  }
});

bus.subscribe("NotificationSender", {
  handler: "src/functions/upload.handler",
  timeout: "60 seconds",
}, {
  pattern: {
    detailType: ["summarize"],
    source: ["lambda.uploader"]
  }
});


export const site = new sst.aws.Nextjs("LevelLearningSite", {
  path: "../frontend/",
});
