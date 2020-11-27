package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.PasswordResetResponse;
import lombok.val;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

import static org.junit.Assert.fail;
import static org.mockito.Mockito.when;
import static org.hamcrest.Matchers.*;
import static com.coyoapp.tinytask.helper.ErrorMessageHelper.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserControllerTest extends BaseControllerTest {
  // Given
  private static final String PATH = "/user";
  private static final String givenUsername = "Traudl";

  @Test
  @WithMockUser
  @DisplayName("The GET request to \"/user/password-reset/" + givenUsername + "\" should return the newly generated password")
  void resetPasswordTest() {
    // Given
    val givenGeneratedPassword = "asdf";
    val expectedPasswordResetGenerated = PasswordResetResponse.builder().generatedPassword(givenGeneratedPassword).build();

    try {
      // When
      when(userService.resetPassword(givenUsername)).thenReturn(expectedPasswordResetGenerated);

      val requestResult = mockMvc.perform(get(PATH + "/password-reset/" + givenUsername));

      // Then
      requestResult.andDo(print())
                   .andExpect(status().isOk())
                   .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                   .andExpect(jsonPath("$.generatedPassword", is(givenGeneratedPassword)));
    } catch (Exception exception) {
      fail(NO_EXCEPTION_EXPECTED);
    }
  }

  @Test
  @DisplayName("The GET request to \"/user/password-reset/" + givenUsername + "\" without a user session should return a 302 response")
  void resetPasswordWithoutActiveUserSessionFailureTest() {
    try {
      // When
      val requestResult = mockMvc.perform(get(PATH + "/password-reset/" + givenUsername));

      // Then
      requestResult.andDo(print()).andExpect(status().is(302));
    } catch (Exception exception) {
      fail(NO_EXCEPTION_EXPECTED);
    }
  }
}
