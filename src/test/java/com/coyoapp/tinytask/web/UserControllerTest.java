package com.coyoapp.tinytask.web;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.coyoapp.tinytask.domain.User;
import java.util.Optional;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.web.servlet.ResultActions;

@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class UserControllerTest extends BaseControllerTest {

  private static final String PATH = "/login";

  @Test
  public void shouldReturnStatuscode200WhenLoginWasSuccessful() throws Exception {
    // given
    String username = "test";
    String password = "hunter2";
    User user = new User(null, username, password, null);
    given(userRepository.findByUsername(anyString())).willReturn(Optional.of(user));

    // when
    ResultActions actualResult = this.mockMvc.perform(post(PATH)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content("{\"username\":\"test\",\"password\":\"hunter2\"}"));

    // then
    actualResult.andExpect(status().isOk());
  }

  public void shouldReturnStatuscode401AndExceptionWhenLoginWasNotSuccessful() throws Exception {
    // given
    given(userRepository.findByUsername(anyString())).willReturn(Optional.empty());

    // when
    ResultActions actualResult = this.mockMvc.perform(post(PATH)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content("{\"username\":\"testUser\",\"password\":\"hunter2\"}"));

    // then
    actualResult.andExpect(status().is(401));
  }

}
