import { GetObjectCommand, PutObjectCommand, type PutObjectCommandInput } from "@aws-sdk/client-s3";

import { Resource } from "sst";
import { s3Client } from "..";

export async function uploadText({
  text,
  key,
}: {
  text: string;
  key: string;
}) {

  const uploadParams: PutObjectCommandInput = {
    Bucket: Resource.LazyReaderBucket.name,
    Key: key,
    Body: text,
    ContentType: "text/plain"
  };

  await s3Client.send(new PutObjectCommand(uploadParams));
}

export async function uploadAudio({
  audioStream,
  key,
}: {
  audioStream: ReadableStream<Uint8Array>;
  key: string;
}) {

  const uploadParams: PutObjectCommandInput = {
    Bucket: Resource.LazyReaderBucket.name,
    Key: key,
    Body: audioStream,
    ContentType: "audio/wav",
  };

  await s3Client.send(new PutObjectCommand(uploadParams));
}

export async function getTextFromS3({
  key
}: {
  key: string;
}): Promise<string> {
  try {
    const command = new GetObjectCommand({
      Bucket: Resource.LazyReaderBucket.name,
      Key: key,
    });

    const response = await s3Client.send(command);
    const text = await response.Body?.transformToString();

    if (!text) {
      throw new Error("No content found in S3 object");
    }

    return text;
  } catch (error) {
    console.error("Error fetching from S3:", error);
    throw new Error(`Failed to fetch text from S3: ${error}`);
  }
}

export async function uploadAudioToS3({
  audioBuffer,
  key
}: {
  audioBuffer: Buffer<ArrayBuffer>;
  key: string;
}) {
  try {
    const command = new PutObjectCommand({
      Bucket: Resource.LazyReaderBucket.name,
      Key: key,
      Body: audioBuffer,
      ContentType: "audio/wav",
    });

    await s3Client.send(command);

  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw new Error(`Failed to upload audio to S3: ${error}`);
  }
}

