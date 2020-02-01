package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.uiTests.Base;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DateAndTimeCheckTest extends Base {
  @DisplayName("TC-1002 Date and time should correct in the home page")
  @Test
  public void homePageDateShouldCorrect() {

    assertEquals(pageObjects.getCurrentDate(), pageObjects.getDate());
  }

}
