package com.coyoapp.tinytask.controller;

import com.coyoapp.tinytask.dto.TinyTask;
import com.coyoapp.tinytask.store.TaskStore;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest
public class TinyTaskControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private TaskStore taskStore;

  private ObjectMapper objectMapper = new ObjectMapper();

  private static List<TinyTask> sampleTaskList;

  @BeforeClass
  public static void setup() {
    sampleTaskList = getSampleTaskList();
  }

  @Test
  public void shouldReturnEmptyContent() throws Exception {
    this.mockMvc.perform(get("/tinytasks")).andDo(print()).andExpect(status().isOk())
      .andExpect(content().string(is("[]")));
  }

  @Test
  public void shouldReturnTaskListContent() throws Exception {
    given(taskStore.getAll())
      .willReturn(sampleTaskList);

    this.mockMvc.perform(get("/tinytasks")).andDo(print()).andExpect(status().isOk())
      .andExpect(content().string(is(objectMapper.writeValueAsString(sampleTaskList))));
  }

  @Test
  public void shouldReturnDeletedTaskContent() throws Exception {

    TinyTask task1 = new TinyTask("task1");
    given(taskStore.removeTask("task1"))
      .willReturn(task1);

    this.mockMvc.perform(delete("/tinytasks/task1")).andDo(print()).andExpect(status().isOk())
      .andExpect(content().string(is(objectMapper.writeValueAsString(task1))));
  }

  @Test
  public void shouldReturnSelectedTaskContent() throws Exception {
    TinyTask task1 = new TinyTask("task1");
    given(taskStore.getTask("task1"))
      .willReturn(task1);

    this.mockMvc.perform(get("/tinytasks/task1")).andDo(print()).andExpect(status().isOk())
      .andExpect(content().string(is(objectMapper.writeValueAsString(task1))));
  }

  @Test
  public void shouldReturnAddedTaskContent() throws Exception {

    TinyTask task1 = new TinyTask("task1");
    given(taskStore.addTask(task1))
      .willReturn(task1);

    this.mockMvc.perform(post("/tinytasks/").contentType(MediaType.APPLICATION_JSON_UTF8_VALUE).content(objectMapper.writeValueAsString(task1))
    ).andDo(print()).andExpect(status().isCreated())
      .andExpect(content().string(is(objectMapper.writeValueAsString(task1))));

  }

  private static List<TinyTask> getSampleTaskList() {
    TinyTask task1 = new TinyTask("task1");
    TinyTask task2 = new TinyTask("task2");
    List<TinyTask> tasks = new ArrayList<>();
    tasks.add(task1);
    tasks.add(task2);
    return tasks;
  }
}
