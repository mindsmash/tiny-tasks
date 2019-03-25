package com.coyoapp.tinytask;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.service.TaskService;
import com.coyoapp.tinytask.utility.TaskProvisioner;
import com.coyoapp.tinytask.utility.test.TaskRequestProvisioner;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest
public class TaskControllerTest {

  @MockBean
  TaskService taskService;

  @Autowired
  private MockMvc mockMvc;

  @Test
  public void it_should_create_task() throws Exception {
    //given
    Task task = TaskProvisioner.aSingleTask();

    //when
    when(taskService.add(any(Task.class))).thenReturn(task);

    //then
    this.mockMvc.perform(
      post("/task/add")
        .contentType(MediaType.APPLICATION_JSON_UTF8)
        .content(TaskRequestProvisioner
                          .addRequest(task)))
      .andExpect(status().isCreated());
  }
}
