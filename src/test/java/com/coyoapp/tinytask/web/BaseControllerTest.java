package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.auth.LoginStatusFilter;
import com.coyoapp.tinytask.configuration.WebSecurityConfig;
import com.coyoapp.tinytask.service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@WebMvcTest
abstract public class BaseControllerTest {

  @Autowired
  protected ObjectMapper objectMapper;

  @Autowired
  protected MockMvc mockMvc;

  @MockBean
  protected DefaultTaskService taskService;

  @MockBean
  protected StoredUserService storedUserService;

  @MockBean
  protected AuthService authService;

  @MockBean
  protected UserService userService;
}
