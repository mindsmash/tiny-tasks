package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.TaskStatus;
import com.coyoapp.tinytask.dto.TaskCreateRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Collections;

import static org.hamcrest.Matchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class TaskControllerTest extends BaseControllerTest {

  private static final String PATH = "/tasks";

  @Test
  public void shouldCreateTask() throws Exception {
    // given
    String id = "task-id";
    String name = "task-name";
    TaskCreateRequest taskCreateRequest = TaskCreateRequest.builder().name(name).build();
    TaskResponse taskResponse = TaskResponse.builder().id(id).name(name).build();
    when(taskService.createTask(taskCreateRequest)).thenReturn(taskResponse);

    // when
    ResultActions actualResult = this.mockMvc.perform(post(PATH)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(objectMapper.writeValueAsString(taskCreateRequest))
    );

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
      .andExpect(jsonPath("$.id", is(notNullValue())))
      .andExpect(jsonPath("$.name", is(name)));
  }

  @Test
  public void shouldUpdateTask() throws Exception {
    // given
    String id = "task-id";
    String name = "task-name";
    TaskResponse taskResponse = TaskResponse.builder().id(id).name(name).status(TaskStatus.DONE).build();
    when(taskService.updateTask(TaskStatus.DONE, id)).thenReturn(taskResponse);

    // when
    ResultActions actualResult = this.mockMvc.perform(put(PATH + "/" + id).param("taskNewStatus", "DONE")
      .contentType(MediaType.APPLICATION_JSON_UTF8)
    );

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
      .andExpect(jsonPath("$.id", is(notNullValue())))
      .andExpect(jsonPath("$.name", is(name)))
      .andExpect(jsonPath("$.status", is("DONE")));
  }

  @Test
  public void shouldThrow404WhenUpdateTaskWhenNotFound() throws Exception {
    // given
    String id = "bad-id";
    String name = "task-name";
    when(taskService.updateTask(TaskStatus.DONE, id)).thenThrow(TaskNotFoundException.class);

    // when
    ResultActions actualResult = this.mockMvc.perform(put(PATH + "/" + id).param("taskNewStatus", "DONE")
      .contentType(MediaType.APPLICATION_JSON_UTF8)
    );

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isNotFound());
  }

  @Test
  public void shouldGetTasks() throws Exception {
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
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
      .andExpect(jsonPath("$", hasSize(1)))
      .andExpect(jsonPath("$[0].id", is(notNullValue())))
      .andExpect(jsonPath("$[0].name", is(name)));
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
