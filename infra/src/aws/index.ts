import { EventBridgeClient } from "@aws-sdk/client-eventbridge";
import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({})
export const ebClient = new EventBridgeClient({})

