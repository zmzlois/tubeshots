import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer"

const time = 300
export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");



  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  let browser;

  try {
    browser = await puppeteer.launch({
      headless: false, args: [
        "--start-fullscreen",
      ]
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 3024, height: 1964 })
    await page.goto(url);

    // const closeButton = await page.waitForSelector(".sc-iipuKH > button")

    //if (closeButton) await closeButton.click()

    const fullScreen = await page.$("button[data-enter-fullscreen='true']")

    if (fullScreen) await fullScreen.click()

    const playButton = await page.$('button[aria-label="Play"]')
    // click on the play button
    if (playButton) playButton.click()

    const video = await page.waitForSelector("video")

    if (!video) {

      console.log("Video not found")
      return NextResponse.json(
        { error: "Video not found on this page" },
        { status: 400 }
      )

    }

    let screenshot

    for (let i = 0; i < time; i++) {
      setTimeout(async () => {
        screenshot = await video.screenshot({ type: "png" });
      }, 300);
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
      await browser.close();
    }
  }

}
