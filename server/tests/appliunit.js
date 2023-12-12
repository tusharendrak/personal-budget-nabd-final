const { Builder } = require('selenium-webdriver');
const { Eyes, ClassicRunner, Target, RectangleSize } = require('@applitools/eyes-selenium');

describe('Visual test with Applitools', () => {
    let driver;
    let eyes;

    beforeAll(async () => {
        // Initialize the Selenium WebDriver
        driver = await new Builder().forBrowser('chrome').build();

        // Initialize Applitools Eyes
        eyes = new Eyes(new ClassicRunner());
        eyes.setApiKey('cKE99e7akReALvUVPNjz102PauSfGiwBhOZNn7Vpjd26I110');
    });

    it('should visually test my application page', async () => {
        try {
            // Start the test and set the browser's viewport size
            await eyes.open(driver, 'Personal Budget', 'NBAD Project', new RectangleSize(800, 600));

            // Navigate to the page you want to test
            await driver.get('http://localhost:4200');

            // Visual checkpoint #1
            await eyes.check('Home Page', Target.window());

            // End the test
            const results = await eyes.close(false);
            console.log(results); // This will print the test results
        } finally {
            // Close the browser
            await driver.quit();

            // If the test was aborted before eyes.close was called, ends the test as aborted
            await eyes.abortIfNotClosed();
        }
    });

    afterAll(async () => {
        // Close the browser
        await driver && driver.quit();
    });
});