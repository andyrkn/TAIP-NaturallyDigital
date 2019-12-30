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
public class WalletPage {
    private final static String pageUrl = StringUtils.appUrl + "/wallet";

    @Test
    public void displaysTheNewIdentity() {
        ChromeDriver browser = AppChromeDriver.getDriver();
        browser.get(pageUrl);
        WebElement card = new WebDriverWait(browser, 25)
                .until(driver -> driver.findElement(By.xpath("(//div[@class='request-card'])[last()]")));
        String institutionName = card.findElement(By.className("institution")).getText();
        String requestType = card.findElement(By.className("type")).getText();

        assertTrue(card.isDisplayed());
        assertEquals(StringUtils.institutionValue, institutionName);
        assertEquals(StringUtils.requestTypeValue, requestType);
    }

    @Test
    public void navigateToIdentityPage() {
        ChromeDriver browser = AppChromeDriver.getDriver();
        WebElement card = new WebDriverWait(browser, 5)
                .until(driver -> driver.findElement(By.xpath("(//div[@class='request-card'])[last()]")));
        card.findElement(By.tagName("a")).click();
        WebElement institution = new WebDriverWait(browser, 5)
                .until(driver -> driver.findElement(By.className("institution")));
        String institutionName = institution.getText();
        WebElement requestT = new WebDriverWait(browser, 5)
                .until(driver -> driver.findElement(By.className("type")));
        String requestType = requestT.getText();
        WebElement response = new WebDriverWait(browser, 5)
                .until(driver -> driver.findElement(By.id("response")));
        String amount = response.findElement(By.id("amount")).getText();
        String reason = response.findElement(By.id("reason")).getText();
        String officer = response.findElement(By.id("officer")).getText();

        assertTrue(browser.getCurrentUrl().contains(StringUtils.appUrl + "/saved-transcript/"));
        assertEquals(StringUtils.institutionValue, institutionName);
        assertEquals(StringUtils.requestTypeValue, requestType);
        assertEquals(": " + StringUtils.Response.amount, amount);
        assertEquals(": " + StringUtils.Response.reason, reason);
        assertEquals(": " + StringUtils.Response.officer, officer);
    }
}
