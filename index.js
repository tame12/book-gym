const { Builder, By, Key, util, until } = require("selenium-webdriver")
// const { userInfo } = require("./sampleUserInfo.js")
const { userInfo } = require("./userInfo.js")
var assert = require('assert');

fillForm = async () => {
    
    let driver = await new Builder().forBrowser("chrome").build()
    await driver.manage().setTimeouts({ implicit: 3000 })

    await driver.get("https://www.trumba.com/calendars/SMU_OSL_Gym")
    const originalWindow = await driver.getWindowHandle();
    // assert((await driver.getAllWindowHandles()).length === 1);

    frame = await driver.findElement(By.id("trumba.spud.3.iframe"))
    await driver.switchTo().frame(frame)

    // to do this manually
    // rsvpBtn = await driver.findElement(By.xpath('/html/body/form/div[3]/div[2]/div[9]/div/table/tbody/tr/td[2]/div[2]/a')).click()

    // wait 2 min for user to press a btn
    await driver.wait(
        async () => (await driver.getAllWindowHandles()).length === 2,
        120000
    );


    //Loop through until we find a new window handle
    const windows = await driver.getAllWindowHandles();
    let popup
    windows.forEach(async handle => {
        if (handle !== originalWindow) {
            popup = handle
            await driver.switchTo().window(handle);
        }
    });

    //Wait for the new tab to finish loading content
    await driver.wait(until.titleIs('Event Actions powered by Trumba'), 3000)


    registrationName = await driver.findElement(By.id("eaa_TextboxName"))
    registrationName.sendKeys(userInfo.registrationName)

    registrationEmail = await driver.findElement(By.id("eaa_TextboxEmail"))
    registrationEmail.sendKeys(userInfo.registrationEmail)

    cardNumLast4 = await driver.findElement(By.xpath("/html/body/form/div[6]/div[1]/div[4]/div/div[2]/table/tbody/tr[6]/td/input"))
    cardNumLast4.sendKeys(userInfo.cardNumLast4)

    contactNum = await driver.findElement(By.xpath("/html/body/form/div[6]/div[1]/div[4]/div/div[2]/table/tbody/tr[8]/td/input"))
    contactNum.sendKeys(userInfo.contactNum)

    userInfo.isEmailReminder ? await driver.findElement(By.id("eaa_EmailReminderCheckBox")).click() : ""

    userInfo.isOverwrite ? await driver.findElement(By.id("eaa_OverwritePreviousResponseCheckBox")).click() : ""

    // submit to do manually
    // await driver.findElement(By.id("eaa_ButtonOK")).click()
}

fillForm()