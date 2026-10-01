import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:\\Users\\unive\\.gemini\\antigravity-ide\\brain\\58ed9908-fb03-4b40-b326-ac1f8f6d05f6';

async function run() {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Desktop Test
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/#contact...');
  await page.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  console.log('Capturing Slide 4: GET IN TOUCH & FOOTER (Desktop)...');
  await page.screenshot({ path: path.join(outDir, 'footer-photo-slide-desktop.png') });

  // 2. Mobile Test
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1200);

  console.log('Capturing Slide 4: GET IN TOUCH & FOOTER (Mobile)...');
  await mobilePage.screenshot({ path: path.join(outDir, 'footer-photo-slide-mobile.png') });

  // Scroll down mobile slide 4 if scrollable
  await mobilePage.evaluate(() => window.scrollBy(0, 300));
  await mobilePage.waitForTimeout(500);
  await mobilePage.screenshot({ path: path.join(outDir, 'footer-photo-slide-mobile-scrolled.png') });

  // 3. Test navigation from the footer
  console.log('Testing click on HOME in footer navigation...');
  const homeBtn = page.locator('.detail-footer-nav button:has-text("HOME")');
  await homeBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'footer-photo-nav-clicked-home.png') });

  await browser.close();
  console.log('Verification completed successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
