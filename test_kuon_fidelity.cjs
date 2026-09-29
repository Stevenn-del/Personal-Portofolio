const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ARTIFACT_DIR = 'C:/Users/unive/.gemini/antigravity-ide/brain/a12dcf2a-9abc-420e-a0c2-5de2af849939';
const RECORDINGS_DIR = path.join(__dirname, 'recordings');

if (!fs.existsSync(RECORDINGS_DIR)) {
  fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
}

(async () => {
  console.log('--- Launching Playwright Chromium for Kuon Yagi Rehaul Verification ---');
  const browser = await chromium.launch();
  
  // 1. Desktop Context with Video Recording enabled
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: {
      dir: RECORDINGS_DIR,
      size: { width: 1440, height: 900 }
    }
  });

  const page = await context.newPage();

  console.log('1. Navigating to http://localhost:5173 ...');
  await page.goto('http://localhost:5173/#top', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Screenshot Desktop Slide 0: Top Hero
  const shot1 = path.join(ARTIFACT_DIR, 'kuon-01-slide-top.png');
  await page.screenshot({ path: shot1 });
  console.log('Saved:', shot1);

  // Navigate to Slide 1: Nusa Bot (REILE counterpart)
  console.log('2. Navigating to Slide 1 (Nusa Bot)...');
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(1500);

  const shot2 = path.join(ARTIFACT_DIR, 'kuon-02-slide-nusa-bot.png');
  await page.screenshot({ path: shot2 });
  console.log('Saved:', shot2);

  // Verify elements on Slide 1: double red line, button, page-num 01
  const slide1Data = await page.evaluate(() => {
    const activeSlide = document.querySelector('.slide-item.is-active');
    const border = activeSlide?.querySelector('.border');
    const btn = activeSlide?.querySelector('.btn');
    const pageNum = activeSlide?.querySelector('.page-num');
    return {
      hasBorder: Boolean(border),
      borderSpans: border?.querySelectorAll('span').length,
      btnText: btn?.innerText,
      pageNum: pageNum?.innerText.trim()
    };
  });
  console.log('Slide 1 Data:', slide1Data);

  // Click "Show me more" to open case study underlayer
  console.log('3. Clicking "Show me more" to open underlayer...');
  await page.click('.slide-item.is-active .btn');
  await page.waitForTimeout(1500);

  // Screenshot Underlayer Top Fold
  const shot3 = path.join(ARTIFACT_DIR, 'kuon-03-underlayer-top.png');
  await page.screenshot({ path: shot3 });
  console.log('Saved:', shot3);

  // Scroll down the underlayer
  console.log('4. Scrolling down underlayer body...');
  await page.evaluate(() => {
    const underlayer = document.querySelector('.underlayer-view');
    if (underlayer) underlayer.scrollTop = 900;
  });
  await page.waitForTimeout(1500);

  const shot4 = path.join(ARTIFACT_DIR, 'kuon-04-underlayer-concept.png');
  await page.screenshot({ path: shot4 });
  console.log('Saved:', shot4);

  // Scroll further down to Development and Reflection
  await page.evaluate(() => {
    const underlayer = document.querySelector('.underlayer-view');
    if (underlayer) underlayer.scrollTop = 2200;
  });
  await page.waitForTimeout(1500);

  const shot5 = path.join(ARTIFACT_DIR, 'kuon-05-underlayer-development.png');
  await page.screenshot({ path: shot5 });
  console.log('Saved:', shot5);

  // Click BACK button
  console.log('5. Clicking BACK button...');
  await page.click('.back-btn');
  await page.waitForTimeout(1200);

  // Navigate to Slide 4: About Me
  console.log('6. Navigating to Slide 4 (About Me)...');
  await page.click('#fp-nav ul li:nth-child(5) button');
  await page.waitForTimeout(1500);

  const shot6 = path.join(ARTIFACT_DIR, 'kuon-06-slide-about.png');
  await page.screenshot({ path: shot6 });
  console.log('Saved:', shot6);

  // Click "Show me more" on About Me
  console.log('7. Opening About Underlayer...');
  await page.click('.slide-item.is-active .btn');
  await page.waitForTimeout(1500);

  const shot7 = path.join(ARTIFACT_DIR, 'kuon-07-about-underlayer-top.png');
  await page.screenshot({ path: shot7 });
  console.log('Saved:', shot7);

  // Scroll About underlayer to Passion (3 columns) & Skill set
  await page.evaluate(() => {
    const underlayer = document.querySelector('.underlayer-view');
    if (underlayer) underlayer.scrollTop = 1200;
  });
  await page.waitForTimeout(1500);

  const shot8 = path.join(ARTIFACT_DIR, 'kuon-08-about-underlayer-passion.png');
  await page.screenshot({ path: shot8 });
  console.log('Saved:', shot8);

  // Click BACK from About
  await page.click('.back-btn');
  await page.waitForTimeout(1000);

  // Close Desktop context to finalize video
  await context.close();

  // 2. Mobile Viewport Test (375x812 iPhone)
  console.log('8. Testing Mobile Viewport (375x812)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173/#top', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);

  // Check overflow
  const overflowCheck = await mobilePage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('Mobile Overflow Check (375px):', overflowCheck);

  const shot9 = path.join(ARTIFACT_DIR, 'kuon-09-mobile-slide.png');
  await mobilePage.screenshot({ path: shot9 });
  console.log('Saved:', shot9);

  // Open mobile menu
  await mobilePage.click('.menuIcon');
  await mobilePage.waitForTimeout(800);

  const shot10 = path.join(ARTIFACT_DIR, 'kuon-10-mobile-menu.png');
  await mobilePage.screenshot({ path: shot10 });
  console.log('Saved:', shot10);

  // Now test mobile underlayer
  await mobilePage.goto('http://localhost:5173/#nusa-bot', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1200);
  const shot11 = path.join(ARTIFACT_DIR, 'kuon-11-mobile-underlayer.png');
  await mobilePage.screenshot({ path: shot11 });
  console.log('Saved:', shot11);

  await mobileContext.close();
  await browser.close();

  console.log('--- All tests and screenshots completed successfully! ---');
})();
