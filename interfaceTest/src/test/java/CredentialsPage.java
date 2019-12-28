
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class CredentialsPage {
    private final static String pageUrl = "http://localhost:3000/credentials";

    @Test
    public void canCreateCredentialsRequest() {
        ChromeDriver browser = AppChromeDriver.getDriver();
        browser.get(pageUrl);
        browser.findElements(By.className("MuiFormControl-root")).get(0).click();
        browser.findElement(By.xpath("//*[text()='SPCLEP Iasi']")).click();
        browser.findElements(By.className("MuiFormControl-root")).get(1).click();
        browser.findElement(By.xpath("//*[text()='Plata']")).click();
        browser.findElement(By.className("MuiButton-label")).click();

        browser.get("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/notification.html");
        WebElement confirmBtn = new WebDriverWait(browser, 3)
                .until(driver -> driver.findElement(By.xpath("//*[text()='Connect']")));
        confirmBtn.click();
    }
}
