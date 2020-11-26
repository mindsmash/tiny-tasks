package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.PasswordResetResponse;
import com.coyoapp.tinytask.helper.PasswordResetHelper;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.val;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static com.coyoapp.tinytask.helper.ErrorMessageHelper.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.*;

class UserServiceTest {
  // Given
  private final UserRepository userRepository = mock(UserRepository.class);
  private final PasswordResetHelper passwordResetHelper = mock(PasswordResetHelper.class);
  private final UserService userService = UserService.builder().userRepository(userRepository).passwordResetHelper(passwordResetHelper).build();

  @Test
  @DisplayName("The \"resetPassword\" method should return DTO including a generated password")
  public void resetPasswordTest() {
    // Given
    val givenUsername = "Traudl";
    val givenPassword = "ultraPassword";
    val givenNewPassword = "ultraPassword123";
    val givenUser = User.builder().username(givenUsername).password(givenPassword).build();
    val givenNewUser = User.builder().username(givenUsername).password(givenNewPassword).build();
    val expectedPasswordResetResponse = PasswordResetResponse.builder().generatedPassword(givenNewPassword).build();

    // When
    when(userRepository.findById(givenUsername)).thenReturn(Optional.of(givenUser));
    when(passwordResetHelper.createPassword()).thenReturn(givenNewPassword);

    val fetchedPasswordResetResponse = userService.resetPassword(givenUsername);

    // Then
    verify(userRepository).save(givenNewUser);
    assertThat(fetchedPasswordResetResponse, equalTo(expectedPasswordResetResponse));
  }

  @Test
  @DisplayName("The \"resetPassword\" method should throw a bad request exception when trying to access an unknown user")
  public void resetPasswordUnknownUserFailureTest() {
    // Given
    val givenUsername = "Heinrich";

    try {
      // When
      when(userRepository.findById(givenUsername)).thenReturn(Optional.empty());

      userService.resetPassword(givenUsername);
      fail(EXCEPTION_EXPECTED);
    } catch (ResponseStatusException exception) {
      // Then
      assertThat(exception.getStatus(), is(HttpStatus.BAD_REQUEST));
    }
  }
}
