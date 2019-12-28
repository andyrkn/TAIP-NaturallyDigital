
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginPage {
    private final static String pageUrl = "http://localhost:3000/login";
    private final static String userPassword = "user";

    @Test
    public void isLoggingIntoAccount() {
        ChromeDriver browser = AppChromeDriver.getDriver();
        browser.get(pageUrl);
        WebElement passwordInput = browser.findElement(By.id("outlined-basic"));
        passwordInput.sendKeys(userPassword);
        WebElement loginBtn = browser.findElement(By.id("login"));
        loginBtn.click();
    }


}
