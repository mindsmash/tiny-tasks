package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequest;
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
    String token = obtainAccessToken("coyo", "Data2020.");
    // given
    String id = "task-id";
    String name = "Testing Task";
    TaskRequest taskRequest = TaskRequest.builder().name(name).build();
    TaskResponse taskResponse = TaskResponse.builder().id(id).name(name).build();
    when(taskService.createTask(taskRequest, "coyo")).thenReturn(taskResponse);

    // when
    ResultActions actualResult = this.mockMvc.perform(post(PATH)
      .header("Authorization", "Bearer " + token)
      .contentType(MediaType.APPLICATION_JSON_UTF8)
      .accept("application/json;charset=UTF-8")
      .content(objectMapper.writeValueAsString(taskRequest))
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
    String token = obtainAccessToken("coyo", "Data2020.");
    TaskResponse taskResponse = TaskResponse.builder().id(id).name(name).build();
    when(taskService.getTasks("coyo")).thenReturn(Collections.singletonList(taskResponse));

    // when
    ResultActions actualResult = this.mockMvc.perform(get(PATH).header("Authorization", "Bearer " + token));

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

    String token = obtainAccessToken("coyo", "Data2020.");
    // when
    ResultActions actualResult = this.mockMvc.perform(delete(PATH + "/" + id).header("Authorization", "Bearer " + token));

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk());

    verify(taskService).deleteTask(id);
  }

  @Test
  public void shouldNotDeleteTask() throws Exception {
    String token = obtainAccessToken("coyo", "Data2020.");
    // given
    String id = "xfxfxfxfxfxfxfxffxfxxfxf";
    doThrow(new TaskNotFoundException()).when(taskService).deleteTask(id);

    // when
    ResultActions actualResult = this.mockMvc.perform(delete(PATH + "/" + id).header("Authorization", "Bearer " + token));

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isNotFound());
  }
}
