import type { EventBridgeEvent } from "aws-lambda";
import type { LazyReaderEventArgs } from "./utils/types";

import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { supabaseClient } from "../supabase";
import { uploadText } from "../aws/utils";
import { sendSummaryEvent } from "../aws/utils/eb";

const LOCAL_CHROMIUM_PATH = "/tmp/localChromium/chromium/mac_arm-1466951/chrome-mac/Chromium.app/Contents/MacOS/Chromium";

export async function handler(event: EventBridgeEvent<"client.input", LazyReaderEventArgs>) {

  const { url, uid } = event.detail;

  const width = 1280;
  const height = 720;

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: process.env.SST_DEV
      ? LOCAL_CHROMIUM_PATH
      : await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: width,
    height: height,
  });

  await page.goto(url);

  const { content, title } = await page.evaluate(() => {
    const targetElement = document.querySelector('main') ||
      document.querySelector('article') ||
      document.querySelector('.content') ||
      document.querySelector('[role="main"]') ||
      document.body;

    return {
      title: document.title,
      content: targetElement.innerText,
    };
  });

  const contentKey = `content/${uid}/${btoa(url)}.txt`;

  await uploadText({
    text: content,
    key: contentKey,
  })

  //const { data: record } = await supabaseClient.from("Record").select("metadata").match({ url, uid }).single()
  //
  //const metadata = record.metadata;

  await supabaseClient.from("Record").update({
    content: contentKey,
    metadata: {
      title: title
    }
  }).match({ url, userUid: uid })


  await sendSummaryEvent({
    source: "scraping.lambda",
    detailType: "summary.requested",
    details: { url, uid }
  })
}
