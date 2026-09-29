const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to https://kuon-yagi-portfolio.netlify.app/#reile ...');
  await page.goto('https://kuon-yagi-portfolio.netlify.app/#reile', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: 'ref-kuon-settled-1440.png' });
  console.log('Saved ref-kuon-settled-1440.png');

  // Let's inspect the active slide DOM
  const domDetails = await page.evaluate(() => {
    const activeSlide = document.querySelector('.slide.is-active, .slide--project.is-active, .slide');
    const header = document.querySelector('header');
    const pagination = document.querySelector('.pagination, [class*="pagination"]');
    const background = document.querySelector('.background, [class*="bg"], [class*="background"], canvas');

    return {
      bodyClass: document.body.className,
      activeSlideHtml: activeSlide ? activeSlide.outerHTML : 'none',
      headerHtml: header ? header.outerHTML : 'none',
      paginationHtml: pagination ? pagination.outerHTML : 'none',
      backgroundHtml: background ? background.outerHTML : 'none'
    };
  });

  fs.writeFileSync('kuon-dom-reile.json', JSON.stringify(domDetails, null, 2));
  console.log('Saved kuon-dom-reile.json');

  // Now click on the active slide's button / link
  const btn = await page.$('.slide.is-active .btn, .slide.is-active a, .is-active .btn, .btn');
  if (btn) {
    console.log('Found button text:', await btn.innerText());
    await btn.click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'ref-kuon-underlayer-1440.png' });
    console.log('Saved ref-kuon-underlayer-1440.png');

    const underlayerHtml = await page.evaluate(() => {
      const underlayer = document.querySelector('#underlayer, .underlayer, [class*="underlayer"]');
      return underlayer ? underlayer.outerHTML : 'none';
    });
    fs.writeFileSync('kuon-underlayer.json', JSON.stringify({ html: underlayerHtml }, null, 2));
  }

  // Also navigate to #top to see the hero slide
  console.log('Navigating to #top ...');
  await page.goto('https://kuon-yagi-portfolio.netlify.app/#top', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'ref-kuon-top-1440.png' });
  console.log('Saved ref-kuon-top-1440.png');

  // Also navigate to #about
  console.log('Navigating to #about ...');
  await page.goto('https://kuon-yagi-portfolio.netlify.app/#about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'ref-kuon-about-1440.png' });
  console.log('Saved ref-kuon-about-1440.png');

  // Also mobile 375x812
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('https://kuon-yagi-portfolio.netlify.app/#reile', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'ref-kuon-reile-375.png' });
  console.log('Saved ref-kuon-reile-375.png');

  await browser.close();
  console.log('Done!');
})().catch(e => console.error('Error:', e));
