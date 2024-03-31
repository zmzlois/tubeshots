import { env } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer"
import { UTApi, createRouteHandler, UTFile } from "uploadthing/server"
import { FileEsque, UploadFileResult, UploadFilesOptions } from "uploadthing/types";
import { utapi } from "@/server/uploadthing";
import { uptime } from "process";

const time = 300

const delay = (ms: any) => new Promise(res => setTimeout(res, ms));

// https://vimeo.com/325644669
export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const videoId = url?.split("/").pop()
  console.log("Video ID", videoId)


  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--start-fullscreen",
      ]
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 3024, height: 1964 })
    await page.goto(url);

    // const closeButton = await page.waitForSelector(".sc-iipuKH > button")

    //if (closeButton) await closeButton.click()

    // const fullScreen = await page.$("button[data-enter-fullscreen='true']")

    //if (fullScreen) await fullScreen.click()

    const playButton = await page.waitForSelector('button[aria-label="Play"]')
    // click on the play button
    if (!playButton) { console.log("Play button not found") }

    if (playButton) {
      await playButton.click()
      console.log("Play button clicked")
    }

    await page.mouse.move(-300, 0)

    const video = await page.waitForSelector("video")

    if (!video) {

      console.log("Video not found")
      return NextResponse.json(
        { error: "Video not found on this page" },
        { status: 400 }
      )

    }

    let screenshot

    await delay(30000);



    for (let i = 0; i < time; i++) {
      setTimeout(async () => {
        screenshot = await video.screenshot({ type: "png" });

        const file = new UTFile([screenshot], `vimeo-${videoId}-${i}.png`, {
          customId: `vimeo-${videoId}-${i}`,
        })

        await utapi.uploadFiles(file)
      }, 500);
    }

    // wait for 5 seconds and start to loop millieseconds

    console.log("We found the video!")



    // TO GET THE SCREENSHOT IN BINARY FORMAT
    // const screenshot = await video.screenshot({ type: "png" });
    // set headers for binary response
    const init = {
      headers: {
        "Content-Type": "image/png",
      },
    };

    return new Response(screenshot, init);
  } catch (error) {
    console.log("Error", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 200 }
    );
  } finally {
    if (browser) {
      // await browser.close();
    }
  }

}


