import { z } from "zod";

export const looseUrlSchema = z.string().refine((val) => {
  try {
    new URL(val.startsWith("http") ? val : `http://${val}`);
    return true;
  } catch {
    return false;
  }
}, {
  message: "Invalid URL"
});

export type LazyReaderRecord = {
  audio: string | null;
  content: string | null;
  createdAt: string;
  id: number;
  image: string | null;
  metadata: { "word count": number; title: string } | null;
  summary: string | null;
  updatedAt: string;
  url: string;
  userUid: string;
}

