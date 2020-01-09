package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.ChangePassRequest;
import com.coyoapp.tinytask.dto.ChangePassResponse;
import com.coyoapp.tinytask.dto.RegisterRequest;
import com.coyoapp.tinytask.dto.RegisterResponse;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class UserControllerTest extends BaseControllerTest {
  private static final String PATH = "/users";


  @Test
  public void shouldCreateUser() throws Exception {
    Integer id = 1;
    String username = "test-username";
    String password = "test1234";
    String phoneNumber = "0712345678";

    RegisterRequest regRequest = RegisterRequest.builder().username(username).password(password).phoneNumber(phoneNumber).build();
    RegisterResponse regResponse = RegisterResponse.builder().username(username).phoneNumber(phoneNumber).build();
    when(userService.saveUser(regRequest)).thenReturn(regResponse);

    //when
    ResultActions actualResult = this.mockMvc.perform(post(PATH)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .accept("application/json;charset=UTF-8")
      .content(objectMapper.writeValueAsString(regRequest))
    );

    //then
    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
      .andExpect(jsonPath("$.id", is(notNullValue())))
      .andExpect(jsonPath("$.username", is(username)))
      .andExpect(jsonPath("$.phoneNumber", is(phoneNumber)));
  }

  @Test
  public void shouldChangePassword() throws Exception {
    String currentPassword = "test1234";
    String newPassword = "test1234";
    String confirmPassword = "test1234";
    Integer id = 1;
    String username = "test-username";

    ChangePassRequest passRequest = ChangePassRequest.builder().currentPassword(currentPassword).newPassword(newPassword).confirmPassword(confirmPassword).build();
    ChangePassResponse passResponse = ChangePassResponse.builder().id(id).username(username).build();
    when(userService.changePass(passRequest, "coyo")).thenReturn(passResponse);


    String token = obtainAccessToken("coyo", "Data2020.");

    //when
    ResultActions actualResult = this.mockMvc.perform(post(PATH + "/change-password")
      .header("Authorization", "Bearer " + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .accept("application/json;charset=UTF-8")
      .content(objectMapper.writeValueAsString(passRequest))
    );

    //then
    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
      .andExpect(jsonPath("$.id", is(notNullValue())))
      .andExpect(jsonPath("$.username", is(username)));
  }
}
