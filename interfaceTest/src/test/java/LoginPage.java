
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.Assert.assertTrue;

public class LoginPage {
    private final static String pageUrl = StringUtils.appUrl + "/login";
    private final static String userPassword = "123";

    @Test
    public void isLoggingIntoAccount() {
        ChromeDriver browser = AppChromeDriver.getDriver();
        browser.get(pageUrl);
        WebElement passwordInput = browser.findElement(By.id("outlined-basic"));
        passwordInput.sendKeys(userPassword);
        WebElement loginBtn = browser.findElement(By.id("login"));
        loginBtn.click();
        WebElement welcomeParagraph = new WebDriverWait(browser, 5).until(driver -> driver.findElement(By.id("welcome")));

        assertTrue(welcomeParagraph.isDisplayed());
    }


}
