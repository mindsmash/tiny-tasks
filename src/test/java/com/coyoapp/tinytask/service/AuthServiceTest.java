package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.val;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Optional;

import static com.coyoapp.tinytask.helper.ErrorMessageHelper.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class AuthServiceTest {
  // Given
  final StoredUserService userService = mock(StoredUserService.class);
  final UserRepository userRepository = mock(UserRepository.class);
  final PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
  final AuthService authService = AuthService.builder().userService(userService).userRepository(userRepository).passwordEncoder(passwordEncoder).build();

  @Test
  @DisplayName("The \"register\" method should return the added User model")
  public void registerTest() {
    // Given
    val givenUsername = "Traudl";
    val givenPassword = "superbSecret";
    val expectedUser = User.builder().username(givenUsername).password(givenPassword).build();

    // When
    when(userRepository.findById(givenUsername)).thenReturn(Optional.empty());
    when(passwordEncoder.encode(givenPassword)).thenReturn(givenPassword);
    when(userRepository.save(expectedUser)).thenReturn(expectedUser);

    val fetchedUser = authService.register(givenUsername, givenPassword, givenPassword);

    // Then
    assertThat(fetchedUser, equalTo(expectedUser));
  }

  @Test
  @DisplayName("The \"register\" method should throw a bad request exception when trying to register a taken username")
  public void registerTakenUsernameFailureTest() {
    // Given
    val givenUsername = "Heinrich";

    try {
      // When
      when(userRepository.findById(givenUsername)).thenReturn(Optional.of(User.builder().build()));

      authService.register(givenUsername, "", "");
      fail(EXCEPTION_EXPECTED);
    } catch (ResponseStatusException exception) {
      // Then
      assertThat(exception.getStatus(), is(HttpStatus.BAD_REQUEST));
    }
  }

  @Test
  @DisplayName("The \"register\" method should throw a bad request exception when the passwords do not match")
  public void registerPasswordMismatchFailureTest() {
    // Given
    val givenUsername = "Gustav";
    val givenPassword = "pw123";
    val givenRepeatedPassword = "pw321";

    try {
      // When
      when(userRepository.findById(givenUsername)).thenReturn(Optional.empty());

      authService.register(givenUsername, givenPassword, givenRepeatedPassword);
      fail(EXCEPTION_EXPECTED);
    } catch (ResponseStatusException exception) {
      // Then
      assertThat(exception.getStatus(), is(HttpStatus.BAD_REQUEST));
    }
  }

  @Test
  @DisplayName("The \"login\" method should not throw an unauthorized exception when providing it valid credentials")
  public void loginTest() {
    // Given
    val givenUsername = "Thaddäus";
    val givenPassword = "mayonnaise";
    val givenUser = org.springframework.security.core.userdetails.User.builder().username(givenUsername).password(givenPassword).authorities(new ArrayList<>()).build();

    try {
      // When
      when(userService.loadUserByUsername(givenUsername)).thenReturn(givenUser);
      when(passwordEncoder.matches(givenPassword, givenPassword)).thenReturn(true);

      authService.login(givenUsername, givenPassword);
    } catch (ResponseStatusException exception) {
      fail(NO_EXCEPTION_EXPECTED);
    }
  }

  @Test
  @DisplayName("The \"login\" method should throw an unauthorized exception when the password do not match")
  public void loginPasswordMismatchFailureTest() {
    // Given
    val givenUsername = "Reinhardt";
    val givenPassword = "extremelySecret";
    val givenUser = org.springframework.security.core.userdetails.User.builder().username(givenUsername).password(givenPassword).authorities(new ArrayList<>()).build();

    try {
      // When
      when(userService.loadUserByUsername(givenUsername)).thenReturn(givenUser);
      when(passwordEncoder.matches(givenPassword, givenPassword)).thenReturn(false);

      authService.login(givenUsername, givenPassword);
      fail(EXCEPTION_EXPECTED);
    } catch (ResponseStatusException exception) {
      // Then
      assertThat(exception.getStatus(), is(HttpStatus.UNAUTHORIZED));
    }
  }
}
