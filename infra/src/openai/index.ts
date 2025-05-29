// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../sst-env.d.ts" />

import { Resource } from "sst";

import { createOpenAI } from "@ai-sdk/openai"
import { generateText, experimental_generateSpeech as generateSpeech } from "ai";


const openai = createOpenAI({
  apiKey: Resource.OpenAiKey.value,
});

export async function summarizeText({ text }: { text: string }) {
  try {
    const { text: summary } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt: `You are an expert content summarizer. Your task is to create a clear, engaging summary of the following blog post.

      Requirements:
      - Length: 150-180 words (perfect for 1-minute audio)
      - Style: Natural, conversational tone suitable for audio narration
      - Structure: Start with the main topic, then cover 2-3 key points, end with conclusion/takeaway
      - Content: Focus on actionable insights and practical information readers can use

      Guidelines:
      - Use active voice and clear, simple language  
      - Avoid jargon unless essential (then briefly explain it)
      - Connect ideas smoothly with transition words
      - Write as if explaining to an intelligent friend

      Blog post to summarize:
      ${text}

      Summary:`,
      maxTokens: 300,
      temperature: 0.3,
    });

    return summary;
  } catch (error) {
    console.error('Error summarizing text:', error);
    throw new Error('Failed to summarize text');
  }
}

export async function textToAudio({ text }: { text: string }) {
  try {
    const instructions = `Voice Affect: Engaging, knowledgeable, and approachable. Professional yet conversational, building listener interest.
    Tone: Informative and enthusiastic, with genuine interest in sharing valuable insights.
    Pacing: Moderate and steady throughout. Slightly slower for key concepts to ensure comprehension. Faster when listing examples to maintain engagement.
    Emotions: Calm confidence, curiosity, and helpfulness.
    Pronunciation: Clear and articulate. Emphasize key terms and important takeaways.
    Pauses: Brief pauses before introducing new concepts. Longer pause before the conclusion to signal transition.`

    const { audio } = await generateSpeech({
      model: openai.speech("gpt-4o-mini-tts"),
      voice: "echo",
      text,
      instructions
    });

    const audioBuffer = audio.uint8Array;
    return Buffer.from(audioBuffer);
  } catch (error) {
    console.error('Error generating audio:', error);
    throw new Error(`Failed to generate audio: ${error}`);
  }
}
