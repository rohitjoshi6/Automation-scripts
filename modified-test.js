const { Builder, By, Key, until } = require('selenium-webdriver');

const driverPath = '"D:\\chromedriver.exe"';

const driver = new Builder().forBrowser('chrome').build();

driver.get('');  //add staging or prod url
 
async function submitForm() {
    try {
        // Input name
        const inputName = await driver.findElement(By.name('name'));
        await inputName.sendKeys('John Doe');

        // Input phone
        const inputPhone = await driver.findElement(By.name('phone'));
        await inputPhone.sendKeys('1234567890');

        // Check if the email field is present
        const isEmailFieldPresent = await isElementPresent(By.name('email'));

        if (isEmailFieldPresent) {
            // If email field is present, generate a random email and fill it
            const randomEmail = generateRandomEmail();
            const inputEmail = await driver.findElement(By.name('email'));
            await inputEmail.sendKeys(randomEmail);
        }

        // Choose city from dropdown
        const chooseCityDropdown = await driver.findElement(By.name('city'));
        await chooseCityDropdown.sendKeys('Bangalore', Key.RETURN);

        // Find and click the submit button by id
        if (isElementPresent(By.className('request-btn'))) {
            const button = driver.findElement(By.className('request-btn'));
            button.click();
        } else if (isElementPresent(By.id('myBtn'))) {
            const button = driver.findElement(By.id('myBtn'));
            button.click();
        } else if (isElementPresent(By.id('myHomepageBtn'))) {
            const button = driver.findElement(By.id('myHomepageBtn'));
            button.click();
        } else {
            console.log("Neither button is present on the page.");
        }

        await driver.sleep(10000);

        // Check if the form submission was successful
        const pageSource = await driver.getPageSource();
        if (pageSource.includes('Thank you for submitting the form!')) {
            console.log('Form submitted successfully!');
        } else {
            console.log('Form submission failed.');
        }
    } finally {
        // Close the browser window
        // await driver.quit();
    }
}

// Function to check if an element is present on the page
async function isElementPresent(locator) {
    const elements = await driver.findElements(locator);
    return elements.length > 0;
}

// Function to generate a random email
function generateRandomEmail() {
    return `random${Math.floor(Math.random() * 1000)}@example.com`;
}

// Call the submitForm function
submitForm();
