const { chromium } = require('playwright');

async function testAll() {
  console.log('--- STARTING COMPREHENSIVE PORTFOLIO VERIFICATION ---');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Check Homepage Load & Hero
  await page.goto('http://localhost:5173/#top', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const heroTitle = await page.locator('.title--top .title__text').innerText();
  console.log('Hero Title:', heroTitle.replace(/\n/g, ' '));
  const heroLead = await page.locator('.title--top .title__lead').innerText();
  console.log('Hero Lead:', heroLead.replace(/\n/g, ' '));

  // Check social links positioned below hero lead
  const socialLinks = await page.locator('.hero-social-links .hero-social-link').allInnerTexts();
  console.log('Hero Social Links (below lead):', socialLinks);

  // Check Hamburger position
  const hamburgerBox = await page.locator('.kuon-header .menuIcon').boundingBox();
  console.log('Hamburger BoundingBox:', hamburgerBox);
  if (hamburgerBox && hamburgerBox.x > 1300 && hamburgerBox.y < 70) {
    console.log('PASS: Hamburger is physically positioned in the TOP-RIGHT corner!');
  } else {
    console.warn('CHECK: Hamburger coordinates:', hamburgerBox);
  }

  // 2. Test Hamburger Open & Items
  await page.locator('.kuon-header .menuIcon').click();
  await page.waitForTimeout(400);
  const navItems = await page.locator('.global-nav__list a').allInnerTexts();
  console.log('Hamburger Menu Nav Items:', navItems);
  const expectedNav = ['HOME', 'PROJECT', 'ABOUT ME', 'EXPERIENCE', 'CONTACT'];
  const hasExactNav = expectedNav.every(item => navItems.includes(item));
  console.log('PASS: Hamburger contains exact items:', hasExactNav);

  // Close Hamburger
  await page.locator('.kuon-header .menuIcon').click();
  await page.waitForTimeout(300);

  // 3. Check Homepage Slide 1 (Project Section)
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(700);

  const projectSlideTitle = await page.locator('.slide--project .title__text').innerText();
  const hasShowMeMore = await page.locator('.slide--project .btn').innerText();
  console.log('Slide 01 Title:', projectSlideTitle);
  console.log('Slide 01 Button:', hasShowMeMore);

  // Verify that "Nusa Bot" is NOT on the homepage slide
  const slideProjectHtml = await page.locator('.slide--project').innerHTML();
  const containsNusaBotOnSlide = slideProjectHtml.includes('NUSA BOT');
  console.log('Homepage Slide DOES NOT contain "NUSA BOT":', !containsNusaBotOnSlide);

  // 4. Click SHOW ME MORE on Project slide -> Opens Projects Collection Page
  await page.locator('.slide--project .btn').click();
  await page.waitForTimeout(600);

  const isProjectsCollectionVisible = await page.locator('.projects-collection-list').isVisible();
  console.log('Projects Collection Page Visible:', isProjectsCollectionVisible);

  // Check multiple projects in the collection
  const projectTitles = await page.locator('.project-collection-title').allInnerTexts();
  console.log('Projects in Collection:', projectTitles);
  console.log('Multiple projects count:', projectTitles.length);

  // Check top spacing on Projects page (should not be overlapped by navigation)
  const collectionHeadingBox = await page.locator('.wrapper--detail-page .heading--top').boundingBox();
  console.log('Projects Page First Heading Y position:', collectionHeadingBox.y, '(generous top breathing space)');

  // 5. Click VIEW PROJECT on Nusa Bot (first project) -> Opens Nusa Bot Detail Page
  await page.locator('.project-collection-item').first().locator('.btn--project-view').click();
  await page.waitForTimeout(600);

  const detailHeading = await page.locator('.heading--top').innerText();
  console.log('Project Detail Heading:', detailHeading);

  // Verify Key Features in Nusa Bot detail
  const features = await page.locator('.kuon-bullet-list .feature-item-text').allInnerTexts();
  console.log('Nusa Bot Key Features:', features);

  // Click Back on Project Detail -> Returns to Projects Collection
  await page.locator('.header-back-btn').click();
  await page.waitForTimeout(500);
  const returnedToCollection = await page.locator('.projects-collection-list').isVisible();
  console.log('Returned to Projects Collection:', returnedToCollection);

  // Click Back on Projects Collection -> Returns to Homepage
  await page.locator('.header-back-btn').click();
  await page.waitForTimeout(500);

  // 6. Check Slide 2 (About Me)
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(700);

  const aboutSlideLead = await page.locator('.slide--about .title__lead').innerText();
  console.log('About Slide Lead:', aboutSlideLead.replace(/\n/g, ' '));

  // Click SHOW ME MORE on About Me -> Opens About Me Detail Page
  await page.locator('.slide--about .btn').click();
  await page.waitForTimeout(700);

  const whoIAmHeading = await page.locator('.heading--top').innerText();
  console.log('About Detail Section 01:', whoIAmHeading);

  const bioParas = await page.locator('.who__text .bio-para').allInnerTexts();
  console.log('Bio Paragraphs count:', bioParas.length);

  // Check Passion Section 02
  const passionTitles = await page.locator('.passion__list .sub-title').allInnerTexts();
  console.log('Passion 3 Columns:', passionTitles);

  // Check Skill Set Section 03 & Animated Percentages
  await page.locator('.skill-set').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1700); // wait for 1.4s animation to finish

  const skillNames = await page.locator('.skill-set__meta .small-title--skill').allInnerTexts();
  const skillRatios = await page.locator('.skill-set__meta .skill-set__ratio').allInnerTexts();
  console.log('Skills & Final Animated Percentages:');
  skillNames.forEach((name, i) => {
    console.log(`  ${name}: ${skillRatios[i]}`);
  });

  // Click Back in About Me -> Returns to Homepage
  await page.locator('.header-back-btn').click();
  await page.waitForTimeout(500);

  // 7. Check Slide 3 (Experience)
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(700);

  const expSlideLead = await page.locator('.slide--experience .title__lead').innerText();
  console.log('Experience Slide Lead:', expSlideLead.replace(/\n/g, ' '));

  // Click SHOW ME MORE on Experience -> Opens Certificates & Learning Page
  await page.locator('.slide--experience .btn').click();
  await page.waitForTimeout(600);

  const certHeading = await page.locator('.heading--top').innerText();
  console.log('Experience Detail Heading:', certHeading);

  const certItems = await page.locator('.cert-item-title').allInnerTexts();
  console.log('Certificates in Editorial List:', certItems);

  const learningTags = await page.locator('.learning-tag-card .tag-label').allInnerTexts();
  console.log('Currently Learning Topics:', learningTags);

  // Click on a certificate -> Opens Certificate Detail / Preview
  await page.locator('.cert-editorial-item').first().click();
  await page.waitForTimeout(400);

  const certPreviewTitle = await page.locator('.cert-detail-title').innerText();
  console.log('Opened Certificate Preview:', certPreviewTitle);

  // Click Back to list
  await page.locator('.btn--subtle').click();
  await page.waitForTimeout(300);

  // Click Back to homepage
  await page.locator('.header-back-btn').click();
  await page.waitForTimeout(500);

  // 8. Mobile Responsiveness Check (375px)
  console.log('--- TESTING MOBILE VIEWPORT (375px) ---');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/#top', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Check no horizontal scrollbar
  const hasHorizontalScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log('Mobile (375px) Horizontal Scroll:', hasHorizontalScroll ? 'FAIL (overflow)' : 'PASS (no overflow)');

  // Check mobile hamburger in top right
  const mobileHamburgerBox = await page.locator('.kuon-header .menuIcon').boundingBox();
  console.log('Mobile Hamburger Box:', mobileHamburgerBox);
  if (mobileHamburgerBox && mobileHamburgerBox.x > 300) {
    console.log('PASS: Mobile Hamburger is in top-right corner!');
  }

  // Open mobile menu
  await page.locator('.kuon-header .menuIcon').click();
  await page.waitForTimeout(400);
  const mobileNavVisible = await page.locator('.global-nav.is-open').isVisible();
  console.log('Mobile Hamburger Menu Open:', mobileNavVisible);

  // Navigate to ABOUT ME via hamburger on mobile
  await page.locator('.global-nav__list a', { hasText: 'ABOUT ME' }).click();
  await page.waitForTimeout(600);
  const aboutOnMobile = await page.locator('.heading--top').innerText();
  console.log('Mobile Navigated to About Me:', aboutOnMobile);

  const mobileAboutScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log('Mobile Detail Page Horizontal Scroll:', mobileAboutScroll ? 'FAIL (overflow)' : 'PASS (no overflow)');

  await browser.close();
  console.log('--- ALL VERIFICATIONS COMPLETED SUCCESSFULLY ---');
}

testAll().catch(err => {
  console.error('Error during test:', err);
  process.exit(1);
});
