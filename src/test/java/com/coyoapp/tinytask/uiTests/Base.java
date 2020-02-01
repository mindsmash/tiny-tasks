package com.coyoapp.tinytask.uiTests;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.support.PageFactory;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

public class Base {
  public WebDriver driver;
  public PageObjects pageObjects;

  public Properties properties() throws IOException {
    Properties prop = new Properties();
    FileInputStream fis = new FileInputStream("src/main/resources/data.properties");
    prop.load(fis);
    return prop;
  }

  @BeforeEach
  public void systemSetup() throws IOException {
    if (properties().getProperty("browser").equals("chrome")) {
      System.setProperty("webdriver.chrome.driver", "src/main/resources/chromedriver.exe");
      this.driver = new ChromeDriver();
    } else if (properties().getProperty("browser").equals("firefox")) {
      System.setProperty("webdriver.gecko.driver", "src/main/resources/geckodriver.exe");
      this.driver = new FirefoxDriver();
    } else {
      System.setProperty("webdriver.ie.driver", "src/main/resources/IEDriverServer.exe");
      this.driver = new InternetExplorerDriver();
    }
    driver.get(properties().getProperty("url"));
    driver.manage().timeouts().implicitlyWait(3, TimeUnit.SECONDS);
    driver.manage().window().maximize();
    driver.manage().deleteAllCookies();
    pageObjects = PageFactory.initElements(driver, PageObjects.class);
  }

  @AfterEach
  public void driverQuit() {
    driver.close();
    driver.quit();
  }
}
