import org.junit.Test;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.Assert.assertEquals;

public class HomePage {
    private final static String pageUrl = "http://localhost:3000/";

    @Test
    public void isOpeningHomePage()
    {
        ChromeDriver browser = AppChromeDriver.getDriver();
        MetamaskLogin.authentificateWithMetamask(browser);

        browser.get(pageUrl);
        assertEquals("Naturally Digital", browser.getTitle());
    }
}