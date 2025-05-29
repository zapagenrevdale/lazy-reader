// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../.sst/platform/config.d.ts" />

import { clientBus } from "./bus";
import { supabaseKey, supabaseUrl } from "./secrets";

export const api = new sst.aws.ApiGatewayV2("LazyReaderApi", {
  link: [clientBus, supabaseKey, supabaseUrl],
});

api.route("POST /", {
  handler: "src/functions/main.handler",
  link: [clientBus, supabaseKey, supabaseUrl]
});
