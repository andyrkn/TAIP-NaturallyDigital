import org.junit.runner.RunWith;
import org.junit.runners.Suite;

@RunWith(Suite.class)
@Suite.SuiteClasses({
        HomePage.class,
        LoginPage.class,
        CredentialsPage.class,
        WalletPage.class
})
public class TestSuite {
}
