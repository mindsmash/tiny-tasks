package com.coyoapp.tinytask.web;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

public class UserControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @WithMockUser(value = "test")
  @Test
  public void should_return_200_ok_when_logged_in() {
//    mockMvc.perform(get("/login"))
    //https://www.baeldung.com/spring-security-integration-tests
  }


  @Test
  public void should_return_false_when_user_name_and_password_do_not_match() {

  }
}
