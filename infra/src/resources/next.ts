// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../.sst/platform/config.d.ts" />

export const site = new sst.aws.Nextjs("LevelLearningSite", {
  path: "../frontend/",
});
