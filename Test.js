//lp8 script - City chosen is from dropdown

const { Builder, By, Key, until } = require('selenium-webdriver');

const driverPath = '"D:\chromedriver.exe"';

const driver = new Builder().forBrowser('chrome').build();


driver.get(''); //add staging or prod url


async function submitForm() {
    try {
        

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
        // Check if the button with class 'request-btn' is present
        if (isElementPresent(By.className('request-btn'))) {
            const button = driver.findElement(By.className('request-btn'));
            button.click();
        } else if (isElementPresent(By.id('myBtn'))) {
            // Check if the button with id 'myBtn' is present
            const button = driver.findElement(By.id('myBtn'));
            button.click();
        }else if(isElementPresent(By.id('myHomepageBtn'))){
            const button = driver.findElement(By.id('myHomepageBtn'));
            button.click();
        }else {
            console.log("Neither button is present on the page.");
        }

        // if(isElementPresent(By.id('email'))){
        //     const inputEmail = await driver.findElement(By.id('email'));
        //     await inputEmail.sendKeys('johnDoe@gmail.com')
        // }else{
        //     //continue the flow 
            
        // }

        // Function to check if an element is present on the page
        function isElementPresent(locator) {
            return driver.findElements(locator).then(elements => elements.length > 0);
        }

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
