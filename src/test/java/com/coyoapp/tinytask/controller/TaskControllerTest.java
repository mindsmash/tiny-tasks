package com.coyoapp.tinytask.controller;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.coyoapp.tinytask.model.Task;
import com.coyoapp.tinytask.repository.TaskRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@WebMvcTest
public class TaskControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void shouldSaveTask() throws Exception {
    Task task = new Task();
    task.setName("Task One");
    task.setDone(true);

    this.mockMvc.perform(post("/tasks", task)).andDo(print()).andExpect(status().isOk());
  }

  @Test
  public void shouldRetrieveTask() throws Exception {
    this.mockMvc.perform(get("/tasks")).andDo(print()).andExpect(status().isOk())
      .andExpect(content().string(containsString("Task One")));
  }
}
