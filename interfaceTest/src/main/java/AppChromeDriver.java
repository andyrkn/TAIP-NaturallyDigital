import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.io.File;

public class AppChromeDriver {
    private static ChromeDriver driver;

    static {
        String chromeDriverPath = System.getenv("ChromeDriver");
        System.setProperty("webdriver.chrome.driver", chromeDriverPath);

        ChromeOptions options = new ChromeOptions();
        options.addExtensions(new File("D:\\Facultate\\MASTER\\TAIP\\libs\\MetaMask.crx"));

        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability(ChromeOptions.CAPABILITY, options);
        driver = new ChromeDriver(capabilities);
    }

    public static ChromeDriver getDriver() {
        return driver;
    }
}
