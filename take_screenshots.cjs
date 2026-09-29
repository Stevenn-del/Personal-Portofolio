const { chromium } = require('playwright');
const path = require('path');

async function capture() {
  const artifactDir = path.resolve('C:/Users/unive/.gemini/antigravity-ide/brain/a36f69eb-d462-4a66-8fbc-5d860a2526c4');
  
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1024 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173/#nusa-bot ...');
  await page.goto('http://localhost:5173/#nusa-bot', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Click Show me more on Nusa Bot
  await page.click('.slide--project.is-active .btn');
  await page.waitForTimeout(800);

  // Scroll down into case study content
  await page.evaluate(() => window.scrollBy(0, 900));
  await page.waitForTimeout(600);
  const pathCaseStudy = path.join(artifactDir, 'screenshot-03b-underlayer-content.png');
  await page.screenshot({ path: pathCaseStudy });
  console.log('Saved:', pathCaseStudy);

  // Click back arrow
  await page.click('.back-arrow');
  await page.waitForTimeout(600);

  // Go to About slide
  console.log('Navigating to About slide...');
  await page.goto('http://localhost:5173/#about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.click('.slide--about .btn');
  await page.waitForTimeout(800);

  // Scroll into about content
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(600);
  const pathAbout = path.join(artifactDir, 'screenshot-04-underlayer-about.png');
  await page.screenshot({ path: pathAbout });
  console.log('Saved:', pathAbout);

  // Click back button in about
  await page.click('.back-arrow');
  await page.waitForTimeout(600);

  // Mobile Viewport
  console.log('Capturing mobile viewport...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/#top', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const pathMobile = path.join(artifactDir, 'screenshot-05-mobile-top.png');
  await page.screenshot({ path: pathMobile });
  console.log('Saved:', pathMobile);

  // Open mobile menu
  await page.click('.menuIcon');
  await page.waitForTimeout(500);
  const pathMobileMenu = path.join(artifactDir, 'screenshot-06-mobile-menu.png');
  await page.screenshot({ path: pathMobileMenu });
  console.log('Saved:', pathMobileMenu);

  await browser.close();
  console.log('All screenshots completed successfully!');
}

capture().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
