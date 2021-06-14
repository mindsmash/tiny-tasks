package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import java.util.Collections;
import org.junit.jupiter.api.Test;
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

class TaskControllerTest extends BaseControllerTest {

  private static final String PATH = "/tasks";

  @Test
  void shouldCreateTask() throws Exception {
    // given
    String id = "task-id";
    String name = "task-name";
    TaskRequest taskRequest = TaskRequest.builder().name(name).build();
    TaskResponse taskResponse = TaskResponse.builder().id(id).name(name).build();
    when(taskService.createTask(taskRequest)).thenReturn(taskResponse);

    // when
    ResultActions actualResult = this.mockMvc.perform(post(PATH)
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(taskRequest))
    );

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON))
      .andExpect(jsonPath("$.id", is(notNullValue())))
      .andExpect(jsonPath("$.name", is(name)));
  }

  @Test
  void shouldGetTasks() throws Exception {
    // given
    String id = "task-id";
    String name = "task-name";
    TaskResponse taskResponse = TaskResponse.builder().id(id).name(name).build();
    when(taskService.getTasks()).thenReturn(Collections.singletonList(taskResponse));

    // when
    ResultActions actualResult = this.mockMvc.perform(get(PATH));

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON))
      .andExpect(jsonPath("$", hasSize(1)))
      .andExpect(jsonPath("$[0].id", is(notNullValue())))
      .andExpect(jsonPath("$[0].name", is(name)));
  }

  @Test
  void shouldDeleteTask() throws Exception {
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
  void shouldNotDeleteTask() throws Exception {
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

  @Test
  void shouldAttachFile() throws Exception {
    // given
    String id = "task-id";
    String name = "task-name";
    TaskResponse taskResponse = TaskResponse.builder().id(id).name(name).build();
    when(taskService.getTasks()).thenReturn(Collections.singletonList(taskResponse));

    // when
    ResultActions actualResult = this.mockMvc.perform(post(PATH + "/" + id)
      .contentType(MediaType.TEXT_PLAIN_VALUE)
      .content("test")
    );

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON))
      .andExpect(jsonPath("$", hasSize(1)))
      .andExpect(jsonPath("$[0].id", is(notNullValue())))
      .andExpect(jsonPath("$[0].name", is("wrong")))
      .andExpect(jsonPath("$[0].type", is(MediaType.TEXT_PLAIN_VALUE)));
  }

  @Test
  void shouldGetFile() {

  }

  @Test
  void shouldDeleteFile() {

  }


}
