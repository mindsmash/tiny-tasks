package com.coyoapp.tinytask.helper;

import lombok.val;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

class PasswordResetHelperTest {
  @Test
  @DisplayName("The \"createPassword\" method should create a v4 UUID prefixed by \"reset-\"")
  public void createPasswordTest() {
    // Given
    val passwordResetHelper = new PasswordResetHelper();
    val givenUuid = "3c9169df-5aab-43d1-92f4-91eeea5bedb3";
    val expectedPrefix = "reset-";

    // When
    val fetchedPassword = passwordResetHelper.createPassword();
    val prefix = fetchedPassword.substring(0, expectedPrefix.length());
    val uuid = fetchedPassword.substring(expectedPrefix.length());

    // Then
    assertThat(prefix, is(expectedPrefix));
    assertThat(uuid.length(), is(givenUuid.length()));
  }
}
