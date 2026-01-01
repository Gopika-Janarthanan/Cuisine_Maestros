package com.cuisinemaestros.selenium;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class CuisineMaestrosSeleniumTest {

    private WebDriver driver;
    private WebDriverWait wait;
    private static final String BASE_URL = "http://localhost:5173";

    @BeforeAll
    void setup() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        options.addArguments("--disable-dev-shm-usage");
        options.addArguments("--window-size=1920,1080");
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(30));
    }

    @AfterAll
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    @DisplayName("Complete User Flow: Signup -> Search -> Book -> Logout")
    void testFullUserFlow() {
        String randomSuffix = UUID.randomUUID().toString().substring(0, 8);
        String testEmail = "testuser_" + randomSuffix + "@example.com";
        String testName = "Test User " + randomSuffix;

        // 1. Signup
        driver.get(BASE_URL + "/register");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("reg-name"))).sendKeys(testName);
        driver.findElement(By.id("reg-email")).sendKeys(testEmail);
        WebElement passField = driver.findElement(By.id("reg-pass"));
        passField.sendKeys("password123");
        passField.sendKeys(Keys.ENTER);

        // 2. Wait for redirect to Home
        wait.until(ExpectedConditions.urlToBe(BASE_URL + "/"));

        // 3. Search for Chef Vikram
        driver.get(BASE_URL + "/chefs");
        WebElement searchInput = wait
                .until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("input[placeholder*='Search']")));
        searchInput.sendKeys("Vikram");

        // Click the card containing "Vikram Rathore"
        WebElement chefCard = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//h3[contains(text(), 'Vikram Rathore')]")));
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", chefCard);

        // 4. Book Chef
        wait.until(ExpectedConditions.urlContains("/chef/"));
        WebElement bookBtn = wait
                .until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(), 'Book Now')]")));
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", bookBtn);

        WebElement dateInput = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("date")));
        ((JavascriptExecutor) driver).executeScript("arguments[0].value = '2025-12-25';", dateInput);

        WebElement timeInput = driver.findElement(By.id("time"));
        ((JavascriptExecutor) driver).executeScript("arguments[0].value = '18:00';", timeInput);

        driver.findElement(By.id("guests")).sendKeys("4");
        driver.findElement(By.id("notes")).sendKeys("Vegetarian meal please.");

        WebElement sendBtn = driver.findElement(By.xpath("//button[contains(text(), 'Send Request')]"));
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", sendBtn);

        // Wait for success toast
        wait.until(
                ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(), 'Booking request sent')]")));

        // 5. Logout
        logout();
    }

    @Test
    @DisplayName("Complete Chef Flow: Login -> Dashboard -> Accept -> Logout")
    void testFullChefFlow() {
        // 1. Login as Chef Vikram (since we booked him above)
        driver.get(BASE_URL + "/login");
        WebElement emailField = wait.until(ExpectedConditions.presenceOfElementLocated(By.id("email")));
        emailField.sendKeys("vikram@example.com");
        WebElement passField = driver.findElement(By.id("password"));
        passField.sendKeys("password");
        passField.sendKeys(Keys.ENTER);

        // 2. Dashboard
        wait.until(ExpectedConditions.urlContains("/dashboard"));
        WebElement h1 = wait.until(ExpectedConditions.presenceOfElementLocated(By.tagName("h1")));
        assertTrue(h1.getText().contains("Chef Dashboard"));

        // 3. Accept request
        // The dashboard uses Tabs. Requests tab is default.
        WebElement acceptBtn = wait
                .until(ExpectedConditions.elementToBeClickable(By.xpath("//button[contains(text(), 'Accept')]")));
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", acceptBtn);

        // Wait for success toast
        wait.until(ExpectedConditions.presenceOfElementLocated(
                By.xpath("//*[contains(text(), 'confirmed') or contains(text(), 'successfully')]")));

        // 4. Logout
        logout();
    }

    private void logout() {
        // Go home to have a clean state for logout
        driver.get(BASE_URL + "/");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("header")));

        WebElement userMenu = wait.until(ExpectedConditions
                .elementToBeClickable(By.cssSelector("header button.rounded-full, header .lucide-user-circle")));
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", userMenu);

        WebElement logoutBtn = wait.until(ExpectedConditions
                .elementToBeClickable(By.xpath("//*[contains(text(), 'Log out') or contains(text(), 'Sign Out')]")));
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", logoutBtn);

        wait.until(ExpectedConditions.urlToBe(BASE_URL + "/"));
    }
}
