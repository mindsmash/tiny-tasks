package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.File;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.FileRequest;
import com.coyoapp.tinytask.dto.FileResponse;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.FileService;
import com.coyoapp.tinytask.service.TaskService;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@Slf4j
@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
class TaskController {

  private final TaskService taskService;
  private final FileService fileService;

  @PostMapping
  public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest) {
    log.debug("createTask(taskRequest={})", taskRequest);
    return taskService.createTask(taskRequest);
  }

  @GetMapping
  public List<TaskResponse> getTasks() {
    log.debug("getTasks()");
    return taskService.getTasks();
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{taskId}")
  public void deleteTask(@PathVariable String taskId) {
    log.debug("deleteTask(taskId={})", taskId);
    taskService.deleteTask(taskId);
  }

  @PostMapping("/{taskId}/files")
  public FileResponse attachFile(@RequestParam("file") MultipartFile file, @PathVariable String taskId) throws IOException {
    log.debug("attachFile(fileRequest={},taskId={})", file, taskId);
    Task task = taskService.getTask(taskId);
    return fileService.createFile(file, task);
  }

  @GetMapping("/{taskId}/files/{fileId}")
  public ResponseEntity<Resource> getFile(@PathVariable String fileId) {
    log.debug("getFile(taskId={})", fileId);
    File file = fileService.getFile(fileId);
    ByteArrayResource resource = new ByteArrayResource(file.getContent());
    return ResponseEntity.ok()
      .contentType(MediaType.parseMediaType(file.getType()))
      .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getName()+"\"")
      .body(resource);
  }
}
