package com.coyoapp.tinytask.web;

import lombok.val;
import org.junit.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


public class IndexControllerTest extends BaseControllerTest {

  private static final String PATH = "/";

  @Test
  public void shouldReturnIndexContent() throws Exception {
    // given
    val givenUser = User.builder().username("Traudl").password("123").authorities(new ArrayList<>()).build();

    // when
    SecurityContextHolder.getContext().setAuthentication(
      new UsernamePasswordAuthenticationToken(givenUser, null, givenUser.getAuthorities())
    );

    ResultActions actualResult = this.mockMvc.perform(get(PATH));

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().string(containsString("Tiny Task Server is up and running.")));
  }

}
