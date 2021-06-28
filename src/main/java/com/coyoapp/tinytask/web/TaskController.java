package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.Customer;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.repository.CustomerRepository;
import com.coyoapp.tinytask.service.TaskService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:8080")
@RequiredArgsConstructor
class TaskController {

  private final TaskService taskService;


  
  @PostMapping
  public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest,@RequestParam String login) {
    log.debug("createTask(createTask={})", taskRequest);
    return taskService.createTask(taskRequest,login);
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
  
	@RequestMapping(value="/tasksbyuser/{id}" ,method = RequestMethod.GET)
  public List<TaskResponse> getTasksBy(@PathVariable long  id) {
    return taskService.getTasksByUser(id);
  }
  
	
	
}
