import type { EventBridgeEvent } from "aws-lambda";

export async function handler(event: EventBridgeEvent<"frontend.input", { gago: string }>) {

  console.log(event)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from surigao!" }),
  };
}
