package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.UserTask;
import com.coyoapp.tinytask.dto.UserTaskRequest;
import com.coyoapp.tinytask.dto.UserTaskResponse;
import com.coyoapp.tinytask.service.UserTaskService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/user-task")
@RequiredArgsConstructor
public class UserTaskController {

  private final UserTaskService userTaskService;

  private final MapperFacade mapperFacade;

  @PostMapping
  @Transactional
  public UserTaskResponse assignNewTask(@RequestBody @Valid UserTaskRequest userTaskRequest) {
    log.debug("assignNewTask(assignNewTask={})", userTaskRequest);
    return transformToResponse(userTaskService.assignNewTask(userTaskRequest));
  }

  @GetMapping
  @Transactional(readOnly = true)
  public List<UserTaskResponse> getAllUserTasks() {
    log.debug("getAllUserTasks()");
    return transformToResponse(userTaskService.getAllUserTasks());
  }

  @ResponseStatus(HttpStatus.OK)
  @DeleteMapping(path = "/{userTaskId}")
  @Transactional
  public void deleteUserTask(@PathVariable String userTaskId) {
    log.debug("deleteUserTask(userTaskId={})", userTaskId);
    userTaskService.deleteUserTask(userTaskId);
  }

  @ResponseStatus(HttpStatus.OK)
  @PostMapping(path = "/finish/{userTaskId}")
  @Transactional
  public UserTaskResponse finishTask(@PathVariable String userTaskId) {
    log.debug("finishTask(userTaskId={})", userTaskId);
    return transformToResponse(userTaskService.finishUserTask(userTaskId));
  }

  private UserTaskResponse transformToResponse(UserTask userTask) {
    return mapperFacade.map(userTask, UserTaskResponse.class);
  }

  private List<UserTaskResponse> transformToResponse(List<UserTask> userTasks) {
    return mapperFacade.mapAsList(userTasks, UserTaskResponse.class);
  }
}
