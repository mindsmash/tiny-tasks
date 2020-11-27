package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.User;
import lombok.val;
import org.junit.jupiter.api.DisplayName;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

import static com.coyoapp.tinytask.helper.ErrorMessageHelper.*;
import static org.hamcrest.Matchers.containsString;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AuthControllerTest extends BaseControllerTest {
  // Given
  private static final String PATH = "/auth/login";

  @Test
  @DisplayName("The GET request to \"/auth/login\" without being logged in should return a login hint")
  public void loginNoActiveUserSessionOutputTest() {
    try {
      // When
      val requestResult = mockMvc.perform(get(PATH));

      // Then
      requestResult.andDo(print())
                   .andExpect(status().isOk())
                   .andExpect(content().string(containsString("Tiny Task Server requires you to be logged in.")));
    } catch (Exception exception) {
      fail(NO_EXCEPTION_EXPECTED);
    }
  }

  @Test
  @WithMockUser
  @DisplayName("The GET request to \"/auth/login\" while being logged in should return a user greeting")
  public void loginActiveUserSessionOutputTest() {
    try {
      // Given
      val givenUsername = "user";

      // When
      val requestResult = mockMvc.perform(get(PATH));

      // Then
      requestResult.andDo(print())
                   .andExpect(status().isOk())
                   .andExpect(content().string(containsString("Greetings, " + givenUsername + "!")));
    } catch (Exception exception) {
      fail(NO_EXCEPTION_EXPECTED);
    }
  }

  @Test
  @WithMockUser
  @DisplayName("The POST request to \"/auth/login\" with valid user data should call the corresponding service method")
  public void loginProvideLoginDataTest() {
    try {
      // Given
      val givenUsername = "user";
      val givenPassword = "superbSecret";
      val givenUser = User.builder().username(givenUsername).password(givenPassword).build();

      // When
      val requestResult = mockMvc.perform(post(PATH)
                                               .contentType(MediaType.APPLICATION_JSON_UTF8)
                                               .content(objectMapper.writeValueAsString(givenUser)));

      // Then
      requestResult.andDo(print()).andExpect(status().isOk());
      verify(authService).login(givenUsername, givenPassword);
    } catch (Exception exception) {
      fail(NO_EXCEPTION_EXPECTED);
    }
  }
}
