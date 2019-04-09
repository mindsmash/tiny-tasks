package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import java.util.Arrays;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TaskControllerTest extends BaseControllerTest {

  private static final String PATH = "/tasks";

  @Test
  public void shouldCreateTask() throws Exception {
    // given
    String id = "task-id";
    String title = "task-title";
    TaskRequest taskRequest = TaskRequest.builder().title(title).build();
    TaskResponse taskResponse = TaskResponse.builder().id(id).title(title).build();
    when(taskService.createTask(taskRequest)).thenReturn(taskResponse);

    // when
    ResultActions actualResult = this.mockMvc.perform(post(PATH)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(objectMapper.writeValueAsString(taskRequest))
    );

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
      .andExpect(jsonPath("$.id", is(notNullValue())))
      .andExpect(jsonPath("$.title", is(title)));
  }

  @Test
  public void shouldGetTasks() throws Exception {
    // given
    String id = "task-id";
    String title = "task-title";
    TaskResponse taskResponse = TaskResponse.builder().id(id).title(title).build();
    when(taskService.getTasks()).thenReturn(Arrays.asList(taskResponse));

    // when
    ResultActions actualResult = this.mockMvc.perform(get(PATH));

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
      .andExpect(jsonPath("$", hasSize(1)))
      .andExpect(jsonPath("$[0].id", is(notNullValue())))
      .andExpect(jsonPath("$[0].title", is(title)));
  }

  @Test
  public void shouldDeleteTask() throws Exception {
    // given
    String id = "task-id";

    // when
    ResultActions actualResult = this.mockMvc.perform(delete(PATH + "/" + id));

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk());

    verify(taskService).deleteTask(id);
  }

  @Test
  public void shouldNotDeleteTask() throws Exception {
    // given
    String id = "unknown-task-id";
    doThrow(new TaskNotFoundException()).when(taskService).deleteTask(id);

    // when
    ResultActions actualResult = this.mockMvc.perform(delete(PATH + "/" + id));

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isNotFound());
  }
}
