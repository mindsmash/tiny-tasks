package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.uiTests.Base;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class AddTaskTest extends Base {
  @DisplayName("TC-1001 Task should added in the home page")
  @Test
  public void homePageTaskShouldAdded() throws IOException {
    pageObjects.addTask();
    assertTrue(pageObjects.getTaskName().contains(properties().getProperty("TaskAdd")));
  }

}
