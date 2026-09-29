const { chromium } = require('playwright');
const path = require('path');

async function captureAll() {
  const artifactDir = path.resolve('C:/Users/unive/.gemini/antigravity-ide/brain/ce5bee0b-8810-4f9f-85d6-ac02d2470eb5');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Homepage Hero
  await page.goto('http://localhost:5173/#top', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, '01_homepage_hero.png') });

  // 2. Homepage Slide 1 (Project Section)
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(artifactDir, '02_homepage_project_slide.png') });

  // 3. Hamburger Menu Open
  await page.locator('.kuon-header .menuIcon').click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, '03_hamburger_menu_open.png') });
  await page.locator('.kuon-header .menuIcon').click();
  await page.waitForTimeout(300);

  // 4. Projects Collection Page
  await page.locator('.slide--project .btn').click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, '04_projects_collection_page.png') });

  // 5. Nusa Bot Project Detail Page
  await page.locator('.project-collection-item').first().locator('.btn--project-view').click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, '05_nusa_bot_detail_page.png') });

  // 6. About Me Detail Page (navigate via URL hash)
  await page.goto('http://localhost:5173/#about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(artifactDir, '06_about_detail_who_passion.png') });

  // 7. Scroll down to Skill Set in About Me
  await page.locator('.skill-set').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1600);
  await page.screenshot({ path: path.join(artifactDir, '07_about_detail_skillset_animated.png') });

  // 8. Experience / Certificates Page (navigate via URL hash)
  await page.goto('http://localhost:5173/#experience', { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(artifactDir, '08_certificates_learning_page.png') });

  // 9. Certificate Preview Detail
  await page.locator('.cert-editorial-item').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, '09_certificate_preview_detail.png') });

  // 10. Mobile Viewport (375px) Hero
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/#top', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, '10_mobile_hero_375.png') });

  // 11. Mobile Project Slide
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(artifactDir, '11_mobile_project_slide_375.png') });

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

captureAll().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
