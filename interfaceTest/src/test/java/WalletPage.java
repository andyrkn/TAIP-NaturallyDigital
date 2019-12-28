import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

import static org.junit.Assert.assertTrue;

public class WalletPage {
    private final static String pageUrl = "http://localhost:3000/wallet";

    @Test
    public void displaysTheNewIndentity() {
        ChromeDriver browser = AppChromeDriver.getDriver();
        browser.get(pageUrl);

        String currentWindow = browser.getWindowHandle();
        MetamaskLogin.connectToMetamask(browser);

        browser.switchTo().window(currentWindow);
        List<WebElement> cards = new WebDriverWait(browser, 20)
                .until(driver -> driver.findElements(By.className("request-card")));
//        WebElement card = cards.get(cards.size() - 1);
//        assertTrue(card.isDisplayed());
        System.out.println(browser.getPageSource());
        System.out.println(browser.getCurrentUrl());
    }
}
