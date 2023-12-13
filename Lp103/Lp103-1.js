//lp103 when city is selected from dropdown

const { Builder, By, Key, until } = require('selenium-webdriver');

// Set the path to your WebDriver (e.g., chromedriver or geckodriver)
const driverPath = '"D:\chromedriver.exe"';

// Create a new instance of the webdriver
const driver = new Builder().forBrowser('chrome').build();

// Navigate to the URL where your form is hosted
driver.get('https://drinkprime.webflow.io/lp103');

// Function to handle form submission
async function submitForm() {
    try {
        // Find form elements by their names or other suitable locators

        // Input name
        const inputName = await driver.findElement(By.name('name'));
        await inputName.sendKeys('John Doe');

        // Input phone
        const inputPhone = await driver.findElement(By.name('phone-number-2'));
        await inputPhone.sendKeys('7038669412');

        //Referral Code 
        const inputReferralCode = await driver.findElement(By.name('referral-Code-2'));
        await inputReferralCode.sendKeys('test');

        // Choose city from dropdown
        const chooseCityDropdown = await driver.findElement(By.name('Choose-City'));
        await chooseCityDropdown.sendKeys('Bangalore', Key.RETURN);

        // Find and click the submit button by id
        const submitButton = await driver.findElement(By.id('submit-ttae-last'));
        await submitButton.click();

        // Wait for a few seconds to see the result (you may need to adjust this)
        await driver.sleep(5000);

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
