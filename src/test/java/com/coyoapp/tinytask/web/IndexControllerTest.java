package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.SecurityConfigTest;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Import(SecurityConfigTest.class)
class IndexControllerTest extends BaseControllerTest {

  private static final String PATH = "/";

  @Test
  void shouldReturnIndexContent() throws Exception {
    // when
    ResultActions actualResult = this.mockMvc.perform(get(PATH));

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().string(containsString("Tiny Task Server is up and running.")));
  }
}
