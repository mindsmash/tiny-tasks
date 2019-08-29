package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.TaskService;
import com.coyoapp.tinytask.service.UserService;

import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

	@Autowired
	private TaskService taskService;

	Logger log = LoggerFactory.getLogger(UserService.class);

	@PostMapping
	public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest) {
		log.debug("createTask(createTask={})", taskRequest);
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
}
