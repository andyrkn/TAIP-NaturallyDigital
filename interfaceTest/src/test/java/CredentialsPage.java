import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class CredentialsPage {
    private final static String pageUrl = StringUtils.appUrl + "/credentials";

    @Test
    public void canCreateCredentialsRequest() {
        ChromeDriver browser = AppChromeDriver.getDriver();
        browser.get(pageUrl);
        String window = browser.getWindowHandle();
        browser.findElements(By.className("MuiFormControl-root")).get(0).click();
        browser.findElement(By.xpath("//*[text()='" + StringUtils.institutionLabelName + "']")).click();
        browser.findElements(By.className("MuiFormControl-root")).get(1).click();
        browser.findElement(By.xpath("//*[text()='" + StringUtils.requestTypeLabelName + "']")).click();
        browser.findElement(By.className("MuiButton-label")).click();
        new WebDriverWait(browser, 5).until(driver -> driver.getWindowHandles().size() > 2);
        MetamaskLogin.connectToMetamask(browser);
        browser.switchTo().window(window);
        String statusText = browser.findElementById("status").getText();

        assert statusText.equals("Loading");
//        new WebDriverWait(browser, 15)
//                .until(driver -> driver.findElement(By.className("loader")) == null);
//        assert statusText.equals("Succeded");
    }
}
