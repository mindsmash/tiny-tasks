package com.coyoapp.tinytask;

import com.coyoapp.tinytask.controller.AppExceptionHandler;
import com.coyoapp.tinytask.controller.TaskController;
import com.coyoapp.tinytask.entity.Task;
import com.coyoapp.tinytask.exception.AppException;
import com.coyoapp.tinytask.exception.UnexpectedError;
import com.coyoapp.tinytask.service.TaskService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.ArrayList;
import java.util.Arrays;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@RunWith(SpringRunner.class)
@WebAppConfiguration
public class TaskControllerTest {
  @Autowired
  private WebApplicationContext wac;

  @Spy
  @InjectMocks
  TaskController taskController;

  @Mock
  TaskService taskService;

  private MockMvc mockMvc;

  @Before
  public void init() {
    mockMvc = MockMvcBuilders.standaloneSetup(taskController)
      .setControllerAdvice(new AppExceptionHandler())
      .build();
  }
  @Test
  public void whenList_thenThrowUnexpected() throws Exception, AppException {
    doThrow(new RuntimeException()).when(taskService).list();

    this.mockMvc.perform(get("/task/").contentType(MediaType.APPLICATION_JSON)
      .characterEncoding("utf-8"))
      .andDo(print())
      .andExpect(status()
        .isOk()).andExpect(jsonPath("$.error").isNotEmpty())
    ;
  }

  @Test
  public void whenList_thenReturnData() throws Exception, AppException {
    doReturn(listTasks()).when(taskService).list();

    this.mockMvc.perform(get("/task/").contentType(MediaType.APPLICATION_JSON)
      .characterEncoding("utf-8"))
      .andDo(print())
      .andExpect(status()
        .isOk()).andExpect(jsonPath("$.data").isNotEmpty())
      .andExpect(jsonPath("$.data").isArray())
      .andExpect(jsonPath("$.data", hasSize(3)))
      .andExpect(jsonPath("$.data[1].number", is("2")));
  }

  private ArrayList<Task> listTasks(){
    return new ArrayList<Task>(
      Arrays.asList( new Task("1","1"),
        new Task("2","2"), new Task("3","3")));
  }
}
