package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.SecurityConfigTest;
import com.coyoapp.tinytask.dto.user.UserRequest;
import com.coyoapp.tinytask.dto.user.UserResponse;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static com.coyoapp.tinytask.Constants.TEST_BEARER_TOKEN;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@Import(SecurityConfigTest.class)
class UserControllerTest extends BaseControllerTest {

  private static final String PATH = "/users";

  @Test
  void createUser() throws Exception {
    // given
    String email = "test@test.com";
    String password = "testPassword";
    UserRequest userRequest = UserRequest.builder().email(email).password(password).build();
    UserResponse userResponse = UserResponse.builder().id(123L).email(email).jwtToken(TEST_BEARER_TOKEN).build();
    when(jwtUtils.extractId(TEST_BEARER_TOKEN)).thenReturn(123L);
    when(userService.createUser(any())).thenReturn(userResponse);

    // when
    ResultActions actualResult = this.mockMvc.perform(post(PATH + "/register")
      .header("Authorization", TEST_BEARER_TOKEN)
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(userRequest))
    );

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON))
      .andExpect(jsonPath("$.id", is(123)))
      .andExpect(jsonPath("$.email", is(email)))
      .andExpect(jsonPath("$.jwtToken", is(TEST_BEARER_TOKEN)));
  }
}
