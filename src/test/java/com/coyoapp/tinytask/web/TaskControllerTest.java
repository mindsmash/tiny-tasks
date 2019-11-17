package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequestCreate;
import com.coyoapp.tinytask.dto.TaskRequestPatch;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import java.util.Collections;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
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
    String name = "task-name";
    Boolean done = false;
    TaskRequestCreate taskRequestCreate = TaskRequestCreate.builder().name(name).build();
    TaskResponse taskResponse = TaskResponse.builder().id(id).name(name).done(done).build();
    when(taskService.createTask(taskRequestCreate)).thenReturn(taskResponse);

    // when
    ResultActions actualResult = this.mockMvc.perform(post(PATH)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(objectMapper.writeValueAsString(taskRequestCreate))
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
  public void shouldGetTasks() throws Exception {
    // given
    String id = "task-id";
    String name = "task-name";
    Boolean done = false;
    TaskResponse taskResponse = TaskResponse.builder().id(id).name(name).done(done).build();
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

  @Test
  public void shouldPatchTask() throws Exception {
    // given
    String id = "task-id";
    String name = "task-name";
    Boolean done = false;
    TaskRequestPatch taskRequestPatch = TaskRequestPatch.builder().done(done).build();
    TaskResponse taskResponse = TaskResponse.builder().id(id).name(name).done(done).build();
    when(taskService.patchTask(taskRequestPatch)).thenReturn(taskResponse);

    // when
    ResultActions actualResult = this.mockMvc.perform(patch(PATH + "/" + id)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(objectMapper.writeValueAsString(taskRequestPatch))
    );

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
      .andExpect(jsonPath("$.id", is(notNullValue())))
      .andExpect(jsonPath("$.done", is(done)));
  }

  @Test
  public void shouldNotPatchTask() throws Exception {
    // given
    String id = "task-id-unknown";
    Boolean done = true;
    TaskRequestPatch taskRequestPatch = TaskRequestPatch.builder().done(done).build();
    doThrow(new TaskNotFoundException()).when(taskService).patchTask(id, taskRequestPatch);

    // when
    ResultActions actualResult = this.mockMvc.perform(patch(PATH + "/" + id)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .content(objectMapper.writeValueAsString(taskRequestPatch))
    );

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isNotFound());
  }
}
