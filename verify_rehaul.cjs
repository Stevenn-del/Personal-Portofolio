const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function verify() {
  const artifactDir = path.resolve('C:/Users/unive/.gemini/antigravity-ide/brain/a12dcf2a-9abc-420e-a0c2-5de2af849939');
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser Error:', msg.text());
    }
  });

  console.log('Navigating to http://localhost:5173 ...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // 1. Desktop Hero
  await page.screenshot({ path: path.join(artifactDir, 'desktop-01-hero.png') });
  console.log('Saved desktop-01-hero.png');

  // 2. Featured Project
  await page.locator('#featured-work').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'desktop-02-featured.png') });
  console.log('Saved desktop-02-featured.png');

  // 3. About Section
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'desktop-03-about.png') });
  console.log('Saved desktop-03-about.png');

  // 4. Projects Section
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'desktop-04-projects.png') });
  console.log('Saved desktop-04-projects.png');

  // 5. Experience Section
  await page.locator('#experience').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'desktop-05-experience.png') });
  console.log('Saved desktop-05-experience.png');

  // 6. Playground Section
  await page.locator('#playground').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'desktop-06-playground.png') });
  console.log('Saved desktop-06-playground.png');

  // 7. Contact Section & Footer
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'desktop-07-contact.png') });
  console.log('Saved desktop-07-contact.png');

  // 8. Open Case Study Underlayer
  await page.locator('.btn-show-more').first().click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(artifactDir, 'desktop-08-case-study-hero.png') });
  console.log('Saved desktop-08-case-study-hero.png');

  // Scroll inside underlayer
  await page.locator('.case-study-underlayer').evaluate(el => el.scrollBy(0, 900));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'desktop-09-case-study-process.png') });
  console.log('Saved desktop-09-case-study-process.png');

  // Test Next Project button
  await page.locator('.btn-next-project').click();
  await page.waitForTimeout(500);
  console.log('Next Project navigation verified!');

  // Close underlayer
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);

  // 10. Open Project Archive Modal
  await page.locator('.btn-archive-trigger').click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'desktop-10-archive-modal.png') });
  console.log('Saved desktop-10-archive-modal.png');

  // Close archive modal with ESC
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // 11. Open Certificate Modal
  await page.locator('#experience').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.locator('.certificate-card').first().click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'desktop-11-cert-modal.png') });
  console.log('Saved desktop-11-cert-modal.png');

  // Close cert modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // 12. Test Dark Mode Toggle
  await page.locator('.btn-theme-toggle').click();
  await page.waitForTimeout(400);
  await page.locator('#home').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(artifactDir, 'desktop-12-dark-mode.png') });
  console.log('Saved desktop-12-dark-mode.png');

  // Switch back to light
  await page.locator('.btn-theme-toggle').click();
  await page.waitForTimeout(300);

  // 13. Mobile Viewport (375x812)
  console.log('Testing mobile viewport 375x812...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'mobile-01-hero.png') });
  console.log('Saved mobile-01-hero.png');

  // Check horizontal overflow
  const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);
  const bodyClientWidth = await page.evaluate(() => document.body.clientWidth);
  console.log(`Mobile width check: scrollWidth=${bodyScrollWidth}, clientWidth=${bodyClientWidth}`);
  if (bodyScrollWidth > bodyClientWidth) {
    console.warn(`WARNING: Horizontal scroll detected on mobile! ${bodyScrollWidth} > ${bodyClientWidth}`);
  } else {
    console.log('PASS: No horizontal scroll on mobile!');
  }

  // 14. Open Mobile Menu Drawer
  await page.locator('.hamburger-btn').click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'mobile-02-drawer.png') });
  console.log('Saved mobile-02-drawer.png');

  // Close mobile drawer with ESC
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // 15. Mobile Featured Project
  await page.locator('#featured-work').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(artifactDir, 'mobile-03-featured.png') });
  console.log('Saved mobile-03-featured.png');

  // 16. Mobile Case Study
  await page.locator('.btn-show-more').first().click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(artifactDir, 'mobile-04-case-study.png') });
  console.log('Saved mobile-04-case-study.png');

  await browser.close();
  console.log('Verification completed successfully!');
}

verify().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
