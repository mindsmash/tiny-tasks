package com.coyoapp.tinytask.uiTests;

import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class PageObjects {
  @FindBy(xpath = "//input[@id='mat-input-0']")
  private WebElement addNewTask;

  @FindBy(xpath = "//h4[contains(text(),'Task_3')]")
  private WebElement checkTask;

  @FindBy(xpath = "/html[1]/body[1]/tiny-root[1]/div[1]/mat-toolbar[1]/div[1]/p[1]")
  private WebElement dateAndTime;

  @FindBy(xpath = "//mat-list-item[3]//div[1]//button[1]")
  private WebElement deleteButton;

  public String getTaskName() {
    return checkTask.getText();
  }

  public String getDate() {
    return dateAndTime.getText();
  }

  public WebElement elementIsDisplayed() {
    return checkTask;
  }

  public void addTask() {
    addNewTask.sendKeys("Task_1", Keys.ENTER);
    addNewTask.sendKeys("Task_2", Keys.ENTER);
    addNewTask.sendKeys("Task_3", Keys.ENTER);
  }

  public void deleteTask() {
    deleteButton.click();
  }

  public String getCurrentDate() {
    DateFormat dateFormat = new SimpleDateFormat("MM dd, yyyy");
    Date date = new Date();
    String date1 = dateFormat.format(date);
    date1 = getMonthAsString(date1);
    return date1 + ", " + getCurrentTime();
  }

  public String getCurrentTime() {
    DateFormat dateFormat = new SimpleDateFormat("hh:mm a");
    Date date = new Date();
    String time = dateFormat.format(date);
    if (time.charAt(0) == '0') {
      time = time.substring(1);
    }
    return time;
  }

  private String getMonthAsString(String date1) {
    int a = Integer.parseInt(date1.substring(0, 2));
    switch (a) {
      case 1:
        date1 = "January" + date1.substring(2);
        break;
      case 2:
        date1 = "February" + date1.substring(2);
        break;
      case 3:
        date1 = "March" + date1.substring(2);
        break;
      case 4:
        date1 = "April" + date1.substring(2);
        break;
      case 5:
        date1 = "May" + date1.substring(2);
        break;
      case 6:
        date1 = "Juli" + date1.substring(2);
        break;
      case 7:
        date1 = "July" + date1.substring(2);
        break;
      case 8:
        date1 = "August" + date1.substring(2);
        break;
      case 9:
        date1 = "September" + date1.substring(2);
        break;
      case 10:
        date1 = "December" + date1.substring(2);
        break;
      case 11:
        date1 = "November" + date1.substring(2);
        break;
      default:
        date1 = "October" + date1.substring(2);
        break;
    }
    return date1;
  }

}
