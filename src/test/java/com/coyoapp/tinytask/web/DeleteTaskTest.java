package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.uiTests.Base;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.NoSuchElementException;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class DeleteTaskTest extends Base {
  @DisplayName("TC-1003 Task should deleted in the home page")
  @Test
  public void homePageTaskShouldDeleted() throws IOException {
    pageObjects.addTask();
    assertTrue(pageObjects.getTaskName().contains(properties().getProperty("TaskAdd")));
    pageObjects.deleteTask();
    assertThrows(NoSuchElementException.class, () -> {
      pageObjects.elementIsDisplayed().isDisplayed();
    });
  }
}
