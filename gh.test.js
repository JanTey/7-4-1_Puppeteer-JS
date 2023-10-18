let page;

beforeEach(async () => {
  page = await browser.newPage();
}, 60000);

afterEach(() => {
  page.close();
});

describe("Github team page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 5000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  }, 70000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 4000);
});

describe("Github start page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/");
  }, 7000);

  test("A message about an incorrect email address", async () => {
    const button = "a.HeaderMenu-link.HeaderMenu-link--sign-up";
    await page.click(button);
    const input = 'input[id="email"]';
    await page.waitForSelector(input, {
      visible: true,
    });
    await page.type(input, 'ebertrehgsg', { delay: 300 });
    const errorMessage = '.mb-0';
    await page.waitForSelector(errorMessage, {
      visible: true,
    });
    const actual = await page.$eval(errorMessage, text => text.textContent);
    expect(actual).toContain(`Email is invalid or already taken`);
  }, 10000);

});

describe("Titles of other pages", () => {

  test("Should find the title on /features", async () => {
    await page.goto("https://github.com/features");
    const title = "div.application-main main div.p-responsive.container-xl.text-center.mt-12.mb-6 h1";
    const actual = await page.$eval(title, (link) => link.textContent);
    expect(actual).toContain("The tools you need to build what you want.");
  }, 6000);

  test("Should find the Contact sales button on /features/security", async () => {
    await page.goto("https://github.com/features/security");
    const button = "div.position-relative.z-1.container-xl.mx-auto.px-3.pt-6.py-md-12.height-full.d-flex.flex-column.flex-justify-center";
    const actualButton = await page.$eval(button, (link) => link.textContent);
    expect(actualButton).toContain("Contact sales");
  }, 6000);

});
