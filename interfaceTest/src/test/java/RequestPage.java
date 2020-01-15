import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class RequestPage {
    private final static String pageUrl = StringUtils.appUrl + "/requests";

    @Test
    public void accessApprovedRequest() {
        ChromeDriver browser = AppChromeDriver.getDriver();
        browser.get(pageUrl);
        WebElement card = new WebDriverWait(browser, 10)
                .until(driver -> driver.findElement(By.className("request-card")));
        String institutionName = card.findElement(By.className("institution")).getText();
        String requestType = card.findElement(By.className("type")).getText();

        assertTrue(card.isDisplayed());
        assertEquals(StringUtils.institutionValue, institutionName);
        assertEquals(StringUtils.requestTypeValue, requestType);
    }

    @Test
    public void userCanViewRequest() {
        ChromeDriver browser = AppChromeDriver.getDriver();
        WebElement card = new WebDriverWait(browser, 25)
                .until(driver -> driver.findElement(By.xpath("(//div[@class='request-card'])[last()]")));
        card.findElement(By.tagName("a")).click();
        WebElement response = new WebDriverWait(browser, 5)
                .until(driver -> driver.findElement(By.id("response")));

        assertTrue(browser.getCurrentUrl().contains(StringUtils.appUrl + "/approved-transcript/"));
        assertTrue(response.isDisplayed());
    }

    @Test
    public void userSubmitAcceptRequest() {
        ChromeDriver browser = AppChromeDriver.getDriver();
        String window = browser.getWindowHandle();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        WebElement button = new WebDriverWait(browser, 25)
                .until(driver -> driver.findElement(By.className("button2")));
        button.click();
        System.out.println(browser.getWindowHandles());
        new WebDriverWait(browser, 5).until(driver -> driver.getWindowHandles().size() > 2);
        MetamaskLogin.confirmTransaction(browser);
        browser.switchTo().window(window);
        new WebDriverWait(browser, 60)
                .until(driver -> driver.findElements(By.className("loader")).size() == 0);
        String status = browser.findElement(By.className("error")).getText();
        System.out.println(status);
        assert status.equals("Identity successfully saved");
    }
}
