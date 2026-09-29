const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const artifactDir = path.resolve('scratch/shots');
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173 ...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Initial Top Hero Slide
  await page.screenshot({ path: path.join(artifactDir, '01-top-hero.png') });
  console.log('Saved 01-top-hero.png');

  // 2. Project Slide (Slide 1)
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, '02-project-slide.png') });
  console.log('Saved 02-project-slide.png');

  // 3. Projects Collection (Click SHOW ME MORE on project slide)
  await page.locator('.slide--project .btn').click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, '03-projects-collection.png') });
  console.log('Saved 03-projects-collection.png');

  // 4. Project Detail (Nusa Bot - click first project in collection)
  await page.locator('.project-collection-item').first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, '04-nusa-bot-detail.png') });
  console.log('Saved 04-nusa-bot-detail.png');

  // Scroll down in Nusa Bot detail
  await page.locator('.underlayer-view').evaluate(el => el.scrollBy(0, 600));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, '05-nusa-bot-scrolled.png') });
  console.log('Saved 05-nusa-bot-scrolled.png');

  // 5. About Underlayer
  await page.goto('http://localhost:5173/#about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, '06-about-underlayer.png') });
  console.log('Saved 06-about-underlayer.png');

  // Scroll down to skills
  await page.locator('.underlayer-view').evaluate(el => el.scrollBy(0, 1200));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: path.join(artifactDir, '07-about-skills.png') });
  console.log('Saved 07-about-skills.png');

  // 6. Experience Underlayer
  await page.goto('http://localhost:5173/#experience', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(artifactDir, '08-experience-underlayer.png') });
  console.log('Saved 08-experience-underlayer.png');

  // 7. Hamburger Menu Open
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.locator('.menuIcon').click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, '09-menu-open.png') });
  console.log('Saved 09-menu-open.png');

  await browser.close();
  console.log('All screenshots captured!');
}

run().catch(console.error);
