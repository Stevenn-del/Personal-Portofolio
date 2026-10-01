import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:\\Users\\unive\\.gemini\\antigravity-ide\\brain\\58ed9908-fb03-4b40-b326-ac1f8f6d05f6';

async function run() {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Desktop Test (1440x900)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/#contact...');
  await page.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  console.log('Capturing Slide 4: GET IN TOUCH Hero (Top)...');
  await page.screenshot({ path: path.join(outDir, 'getintouch-restored-top.png') });

  // Scroll down to Footer
  console.log('Scrolling down Slide 4 to Footer...');
  await page.evaluate(() => {
    const contactSlide = document.querySelector('.slide--contact');
    if (contactSlide) contactSlide.scrollTo({ top: contactSlide.scrollHeight, behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'getintouch-restored-scrolled-footer.png') });

  // Partial scroll showing both bottom of Get In Touch and top of Footer (like Exabytes screenshot)
  console.log('Capturing midway scroll showing transition from Get In Touch to Footer...');
  await page.evaluate(() => {
    const contactSlide = document.querySelector('.slide--contact');
    if (contactSlide) contactSlide.scrollTo({ top: 380, behavior: 'instant' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'getintouch-exabytes-comparison.png') });

  // 2. Mobile Test (390x844)
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 }
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1200);

  console.log('Capturing Mobile Slide 4: GET IN TOUCH Top...');
  await mobilePage.screenshot({ path: path.join(outDir, 'mobile-getintouch-top.png') });

  console.log('Scrolling Mobile Slide 4 to Footer...');
  await mobilePage.evaluate(() => {
    const contactSlide = document.querySelector('.slide--contact');
    if (contactSlide) contactSlide.scrollTo({ top: contactSlide.scrollHeight, behavior: 'instant' });
  });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(outDir, 'mobile-getintouch-footer.png') });

  await browser.close();
  console.log('Verification script completed!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
