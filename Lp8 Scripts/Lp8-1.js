//lp8 script - City chosen is from dropdown

const { Builder, By, Key, until } = require('selenium-webdriver');

// Set the path to your WebDriver (e.g., chromedriver or geckodriver)
const driverPath = '"D:\chromedriver.exe"';

// Create a new instance of the webdriver
const driver = new Builder().forBrowser('chrome').build();

// Navigate to the URL where your form is hosted
driver.get('https://dp.reapit.in/lp8');

// Function to handle form submission
async function submitForm() {
    try {
        // Find form elements by their names or other suitable locators

        // Input name
        const inputName = await driver.findElement(By.name('name'));
        await inputName.sendKeys('John Doe');

        // Input phone
        const inputPhone = await driver.findElement(By.name('phone'));
        await inputPhone.sendKeys('1234567890');

        // Choose city from dropdown
        const chooseCityDropdown = await driver.findElement(By.name('city'));
        await chooseCityDropdown.sendKeys('Bangalore', Key.RETURN);

        // Find and click the submit button by id
        const submitButton = await driver.findElement(By.id('myBtn'));
        await submitButton.click();

        // Wait for a few seconds to see the result (you may need to adjust this)
        await driver.sleep(10000);

        // Check if the form submission was successful (you may need to adjust this check)
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

// Call the submitForm function
submitForm();
