package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.SecurityConfigTest;
import com.coyoapp.tinytask.service.TaskService;
import com.coyoapp.tinytask.service.user.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;

@Import(SecurityConfigTest.class)
@WebMvcTest
abstract public class BaseControllerTest {

  @Autowired
  protected ObjectMapper objectMapper;

  @Autowired
  protected MockMvc mockMvc;

  @MockBean
  protected TaskService taskService;

  @MockBean
  protected UserService userService;
}
