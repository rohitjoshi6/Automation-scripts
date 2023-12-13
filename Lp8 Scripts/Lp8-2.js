//lp8 - when city is selected as Others and custom city is entered

const { Builder, By, Key, until } = require('selenium-webdriver');


const driverPath = 'D:\\chromedriver.exe';  


const driver = new Builder().forBrowser('chrome').build();


driver.get('https://dp.reapit.in/lp8');


function getRandomElement(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

// Function to handle form submission
async function submitForm() {
    try {
        

        // Input name
        const inputName = await driver.findElement(By.name('name'));
        await inputName.sendKeys('John Doe');

        // Input phone
        const inputPhone = await driver.findElement(By.name('phone'));
        await inputPhone.sendKeys('1234567890');

        // Array of cities
        const cities = ['Bangalore', 'Others'];

        // Randomly choose a city from the array
        const chosenCity = getRandomElement(cities);

        // Choose the selected city from the dropdown
        const chooseCityDropdown = await driver.findElement(By.name('city'));
        await chooseCityDropdown.sendKeys(chosenCity, Key.RETURN);

        // If "Others" is selected, fill in the custom city field with "Pune"
        if (chosenCity === 'Others') {
            const customCityField = await driver.findElement(By.name('customCity'));
            await customCityField.sendKeys('Pune');
            await driver.sleep(2000);
        }

        // Find and click the submit button by id
        const submitButton = await driver.findElement(By.id('myBtn'));
        await submitButton.click();

        // Wait for a few seconds to see the result (you may need to adjust this)
        await driver.sleep(50000);

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
