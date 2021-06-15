package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.File;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.FileResponse;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;

import java.nio.charset.StandardCharsets;
import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.mockito.Mockito.*;
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
    String taskId = "task-id";
    Task task = mock(Task.class);
    String fileId = "file-id";
    String fileName = "file-name";
    String fileType = MediaType.TEXT_PLAIN_VALUE;
    MockMultipartFile multipartFile = new MockMultipartFile("file", fileName, fileType, "test".getBytes(StandardCharsets.UTF_8));
    FileResponse fileResponse = FileResponse.builder().id(fileId).name(fileName).build();
    when(taskService.getTask(taskId)).thenReturn(task);
    when(fileService.createFile(multipartFile, task)).thenReturn(fileResponse);

    // when
    ResultActions actualResult = this.mockMvc.perform(MockMvcRequestBuilders.multipart(PATH + "/" + taskId + "/files")
      .file(multipartFile)
    );

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON))
      .andExpect(jsonPath("$.id", is(notNullValue())))
      .andExpect(jsonPath("$.name", is(fileName)));
  }

  @Test
  void shouldGetFile() throws Exception {
    // given
    String taskId = "task-id";
    String fileId = "file-id";
    String fileName = "file-name";
    String type = MediaType.IMAGE_GIF_VALUE;
    byte[] content = "content".getBytes();
    File file = new File();
    file.setContent(content);
    file.setType(type);
    file.setName(fileName);
    when(fileService.getFile(fileId)).thenReturn(file);

    // when
    ResultActions actualResults = this.mockMvc.perform(get(PATH + "/" + taskId + "/files/" + fileId));

    // then
    actualResults
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().bytes(file.getContent()))
      .andExpect(content().contentType(type));


  }

  @Test
  void shouldGetFilePreview() throws Exception {
    // given
    String taskId = "task-id";
    String fileId = "file-id";
    String fileName = "file-name";
    String type = MediaType.IMAGE_GIF_VALUE;
    byte[] content = "content".getBytes();
    File file = new File();
    file.setContentPreview(content);
    file.setType(type);
    file.setName(fileName);
    when(fileService.getFile(fileId)).thenReturn(file);

    // when
    ResultActions actualResults = this.mockMvc.perform(get(PATH + "/" + taskId + "/files/" + fileId+"/preview"));

    // then
    actualResults
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().bytes(file.getContentPreview()))
      .andExpect(content().contentType(type));
  }

  @Test
  void shouldDeleteFile() throws Exception {
    // given
    String fileId = "file-id";
    String taskId = "task-id";

    // when
    ResultActions actualResult = this.mockMvc.perform(delete(PATH + "/" + taskId + "/files/" + fileId));

    // then
    actualResult
      .andDo(print())
      .andExpect(status().isOk());

    verify(fileService).deleteFile(fileId);
  }

  @Test
  void shouldNotDeleteFile() {

  }


}
