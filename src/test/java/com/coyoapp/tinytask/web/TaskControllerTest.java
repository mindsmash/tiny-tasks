package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
    LocalDate dueDate = LocalDate.of(2024, 1, 1);
    TaskRequest taskRequest = TaskRequest.builder().name(name).build();
    TaskResponse taskResponse = TaskResponse.builder().id(id).name(name).dueDate(dueDate).build();
    when(taskService.createTask(taskRequest)).thenReturn(taskResponse);

    // when
    ResultActions actualResult = this.mockMvc.perform(post(PATH)
      .contentType(MediaType.APPLICATION_JSON)
      .content(objectMapper.writeValueAsString(taskRequest))
    );

    // then
    Integer[] dateArray = { dueDate.getYear(), dueDate.getMonthValue(), dueDate.getDayOfMonth() };
    List<Integer> date = Arrays.asList(dateArray);
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON))
      .andExpect(jsonPath("$.id", is(notNullValue())))
      .andExpect(jsonPath("$.name", is(name)))
      .andExpect(jsonPath("$.dueDate", is(date)));
  }

  @Test
  void shouldGetTasks() throws Exception {
    // given
    String id = "task-id";
    String name = "task-name";
    LocalDate dueDate = LocalDate.of(2024, 1, 1);
    TaskResponse taskResponse = TaskResponse.builder().id(id).name(name).dueDate(dueDate).build();
    when(taskService.getTasks()).thenReturn(Collections.singletonList(taskResponse));

    // when
    ResultActions actualResult = this.mockMvc.perform(get(PATH));

    // then
    Integer[] dateArray = { dueDate.getYear(), dueDate.getMonthValue(), dueDate.getDayOfMonth() };
    List<Integer> date = Arrays.asList(dateArray);
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON))
      .andExpect(jsonPath("$", hasSize(1)))
      .andExpect(jsonPath("$[0].id", is(notNullValue())))
      .andExpect(jsonPath("$[0].name", is(name)))
      .andExpect(jsonPath("$[0].dueDate", is(date)));
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
  void shouldUpdateTask() throws Exception {
    // given
    String id = "task-id";
    String requestBody = "2025-01-01";

    // when
    ResultActions actualResult = this.mockMvc.perform(put(PATH + "/" + id)
      .contentType(MediaType.APPLICATION_JSON)
      .content(requestBody));

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk());

    verify(taskService).updateTask(id,LocalDate.parse(requestBody));
  }
}
