const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function verify() {
  const artifactDir = path.resolve('C:/Users/unive/.gemini/antigravity-ide/brain/d7de6c64-acea-4766-a01c-b72c98afa69e/scratch');
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  console.log('1. Testing Slide 0 (Home)...');
  await page.goto('http://localhost:5173/#top', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, '01-slide-home.png') });

  console.log('2. Testing Slide 1 (Featured Project Nusa Bot)...');
  await page.goto('http://localhost:5173/#projects', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, '02-slide-nusa-bot.png') });

  console.log('3. Testing Nusa Bot Underlayer...');
  await page.click('.slide--project.is-active .btn');
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(artifactDir, '03a-nusa-bot-top.png') });
  await page.evaluate(() => {
    const el = document.querySelector('.underlayer-view');
    if (el) el.scrollTop = 900;
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, '03b-nusa-bot-details.png') });
  await page.click('.back-arrow');
  await page.waitForTimeout(600);

  console.log('4. Testing Slide 2 (About Me)...');
  await page.goto('http://localhost:5173/#about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  // Close underlayer if it auto opened by hash or verify underlayer
  const aboutUnderlayer = await page.$('.underlayer-view');
  if (aboutUnderlayer) {
    await page.screenshot({ path: path.join(artifactDir, '04a-about-underlayer-top.png') });
    await page.evaluate(() => {
      const el = document.querySelector('.underlayer-view');
      if (el) el.scrollTop = 800;
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, '04b-about-underlayer-details.png') });
    await page.click('.back-arrow');
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: path.join(artifactDir, '04c-slide-about.png') });

  console.log('5. Testing Slide 3 (Experience)...');
  await page.goto('http://localhost:5173/#experience', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  const expUnderlayer = await page.$('.underlayer-view');
  if (expUnderlayer) {
    await page.screenshot({ path: path.join(artifactDir, '05a-experience-underlayer-top.png') });
    await page.evaluate(() => {
      const el = document.querySelector('.underlayer-view');
      if (el) el.scrollTop = 800;
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(artifactDir, '05b-experience-underlayer-details.png') });
    await page.click('.back-arrow');
    await page.waitForTimeout(600);
  }
  await page.screenshot({ path: path.join(artifactDir, '05c-slide-experience.png') });

  console.log('6. Testing Slide 4 (Contact)...');
  await page.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, '06-slide-contact.png') });

  console.log('7. Testing Navigation Hamburger Menu...');
  await page.click('.menuIcon');
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, '07-hamburger-menu.png') });

  await browser.close();
  console.log('Verification completed successfully!');
}

verify().catch((err) => {
  console.error('Verification error:', err);
  process.exit(1);
});
