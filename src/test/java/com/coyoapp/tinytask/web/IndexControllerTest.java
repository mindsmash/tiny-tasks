package com.coyoapp.tinytask.web;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
public class IndexControllerTest extends BaseControllerTest {

	private static final String PATH = "/";

	@Test
	public void shouldReturnIndexContent() throws Exception {
		// when
		ResultActions actualResult = this.mockMvc.perform(get(PATH));

		// then
		actualResult.andDo(print()).andExpect(status().isOk())
				.andExpect(content().string(containsString("Tiny Task Server is up and running.")));
	}

}
