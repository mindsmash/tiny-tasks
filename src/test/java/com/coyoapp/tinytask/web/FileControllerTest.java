package com.coyoapp.tinytask.web;

import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class FileControllerTest extends BaseControllerTest {
  private static final String PATH = "/files";

  @Test
  public void shouldGetFile() throws Exception {
    // given
    String fileName = "1.txt";
    byte[] fileBytes = fileName.getBytes();
    when(fileService.getFile(fileName)).thenReturn(fileBytes);

    // when
    ResultActions actualResult = this.mockMvc.perform(get(PATH + "/" + fileName));

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_OCTET_STREAM))
      .andExpect(content().bytes(fileBytes));
  }
}
