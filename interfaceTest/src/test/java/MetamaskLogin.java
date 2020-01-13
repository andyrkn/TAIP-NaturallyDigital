import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class MetamaskLogin {
    public static void authentificateWithMetamask(ChromeDriver browser) {
        WebElement startBtn = new WebDriverWait(browser, 5)
                .until(driver -> driver.findElement(By.className("button")));
        startBtn.click();
        browser.findElements(By.tagName("button")).get(0).click();
        browser.findElements(By.tagName("button")).get(1).click();
        WebElement phraseInput = new WebDriverWait(browser, 3)
                .until(driver -> driver.findElement(By.className("first-time-flow__textarea")));
        phraseInput.sendKeys(System.getenv("MetamaskPhrase"));
        browser.findElement(By.id("password")).sendKeys(System.getenv("MetamaskPass"));
        browser.findElement(By.id("confirm-password")).sendKeys(System.getenv("MetamaskPass"));
        browser.findElement(By.className("first-time-flow__checkbox")).click();
        browser.findElement(By.tagName("button")).click();
        browser.get("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#initialize/end-of-flow");
        WebElement allDoneBtn = new WebDriverWait(browser, 3)
                .until(driver -> driver.findElement(By.tagName("button")));
        allDoneBtn.click();
        WebElement networkField = new WebDriverWait(browser, 3)
                .until(driver -> driver.findElement(By.className("network-name")));
        networkField.click();
        WebElement ropstenSelect  = new WebDriverWait(browser, 3)
                .until(driver -> driver.findElements(By.className("network-name-item")).get(1));
        ropstenSelect.click();
    }

    public static void connectToMetamask(ChromeDriver browser) {
        String metamaskWindow = "";
        for (String window : browser.getWindowHandles())
            metamaskWindow = window;
        browser.switchTo().window(metamaskWindow);
        WebElement confirmBtn = new WebDriverWait(browser, 3)
                .until(driver -> driver.findElement(By.xpath("//*[text()='Connect']")));
        confirmBtn.click();
    }

    public static void confirmTransaction(ChromeDriver browser) {
        String metamaskWindow = "";
        for (String window : browser.getWindowHandles())
            metamaskWindow = window;
        browser.switchTo().window(metamaskWindow);
        WebElement confirmBtn = new WebDriverWait(browser, 3)
                .until(driver -> driver.findElement(By.xpath("//*[text()='Confirm']")));
        confirmBtn.click();
    }
}
