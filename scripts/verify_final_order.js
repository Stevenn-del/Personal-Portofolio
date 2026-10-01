import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:\\Users\\unive\\.gemini\\antigravity-ide\\brain\\58ed9908-fb03-4b40-b326-ac1f8f6d05f6';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. HOME SLIDE (Slide 0)
  console.log('Capturing Slide 0: HOME...');
  await page.screenshot({ path: path.join(outDir, 'order-00-home.png') });

  // 2. ABOUT ME SLIDE (Slide 1)
  console.log('Navigating to Slide 1: ABOUT ME...');
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'order-01-about-preview.png') });

  // 3. Open ABOUT ME Detail Page
  console.log('Opening dedicated About Me page...');
  const aboutBtn = page.locator('.slide--about button:has-text("SHOW ME MORE")');
  await aboutBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'order-02-about-detail-hero.png') });

  // Scroll to Who I Am & Passion & Skill Set
  console.log('Scrolling down About Me detail...');
  await page.evaluate(() => {
    const el = document.querySelector('.who');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'order-03-about-detail-who-passion.png') });

  await page.evaluate(() => {
    const el = document.querySelector('.skill-set');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1600); // wait for skill bar animation
  await page.screenshot({ path: path.join(outDir, 'order-04-about-detail-skills.png') });

  // Scroll to bottom of About Detail to verify only BACK button is present
  await page.evaluate(() => {
    const el = document.querySelector('.detail-footer');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'order-04b-about-detail-bottom.png') });

  // Close About Detail Page
  await page.keyboard.press('Escape');
  await page.waitForTimeout(800);

  // 4. PROJECT SLIDE (Slide 2)
  console.log('Navigating to Slide 2: PROJECT...');
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'order-05-project-preview.png') });

  // 5. Open Dedicated Project Page
  console.log('Opening dedicated Project page...');
  const projectBtn = page.locator('.slide--project button:has-text("SHOW ME MORE")');
  await projectBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'order-06-projects-collection-hero.png') });

  // Scroll to Selected Works
  await page.evaluate(() => {
    const el = document.querySelector('.projects-collection-list');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'order-07-projects-collection-alternating.png') });

  // Click on first project to verify detail page opens
  console.log('Opening Project 01 detail...');
  await page.evaluate(() => {
    const btn = document.querySelector('.btn--project-view');
    if (btn) btn.click();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'order-08-project-detail-opened.png') });

  // Close Project Detail and return to slide 2
  await page.locator('.back-arrow').first().click();
  await page.waitForTimeout(800);

  // 6. EXPERIENCE SLIDE (Slide 3)
  console.log('Navigating to Slide 3: EXPERIENCE...');
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'order-09-experience-preview.png') });

  // 7. Open Dedicated Experience Page
  console.log('Opening dedicated Experience page...');
  const expBtn = page.locator('.slide--experience button:has-text("SHOW ME MORE")');
  await expBtn.click();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'order-10-experience-hero.png') });

  // Scroll to Experience 3 columns & verify NO GET IN TOUCH inside
  await page.evaluate(() => {
    const el = document.querySelector('.experience-editorial-columns');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'order-11-experience-columns.png') });

  // Scroll to Experience footer to verify Get In Touch is NOT rendered
  await page.evaluate(() => {
    const el = document.querySelector('.detail-footer');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'order-12-experience-footer-no-getintouch.png') });

  // Click Certificate to test modal
  console.log('Testing certificate preview modal...');
  await page.evaluate(() => {
    const item = document.querySelector('.exp-cert-item');
    if (item) item.click();
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, 'order-13-experience-cert-modal.png') });

  // Close modal
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);

  // Close Experience Detail
  await page.locator('.back-arrow').first().click();
  await page.waitForTimeout(800);

  // 8. GET IN TOUCH & FOOTER SLIDE (Slide 4)
  console.log('Navigating to Slide 4: GET IN TOUCH & FOOTER...');
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(outDir, 'order-14-get-in-touch-slide.png') });

  // Close context and test Mobile Viewport
  await context.close();

  console.log('Testing Mobile Viewport (390x844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173#top', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  // Mobile Slide 0: Home
  await mobilePage.screenshot({ path: path.join(outDir, 'order-mobile-00-home.png') });

  // Mobile Slide 1: About Me
  await mobilePage.keyboard.press('ArrowDown');
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: path.join(outDir, 'order-mobile-01-about.png') });

  // Mobile Slide 2: Project
  await mobilePage.keyboard.press('ArrowDown');
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: path.join(outDir, 'order-mobile-02-project.png') });

  // Mobile Slide 3: Experience
  await mobilePage.keyboard.press('ArrowDown');
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: path.join(outDir, 'order-mobile-03-experience.png') });

  // Mobile Slide 4: Get In Touch & Footer
  await mobilePage.keyboard.press('ArrowDown');
  await mobilePage.waitForTimeout(800);
  await mobilePage.screenshot({ path: path.join(outDir, 'order-mobile-04-contact.png') });

  // Test Mobile Navigation Menu
  const menuBtn = mobilePage.locator('.menuIcon');
  await menuBtn.click();
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({ path: path.join(outDir, 'order-mobile-05-nav-menu.png') });

  await mobileContext.close();
  await browser.close();
  console.log('Verification completed successfully!');
}

run().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
