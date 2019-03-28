package com.coyoapp.tinytask.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.coyoapp.tinytask.logic.tasks.TaskModel;
import com.coyoapp.tinytask.logic.tasks.TaskService;

@RestController
@RequestMapping("/tasks")
public class TaskController {

	@Autowired
	TaskService taskService;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<TaskModel>> tasks() {
		return new ResponseEntity<List<TaskModel>>(this.taskService.fetchTasks(), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<List<TaskModel>> deleteAllTasks() {
		this.taskService.deleteAllTasks();
		return new ResponseEntity<List<TaskModel>>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<TaskModel> createTask(@RequestBody final TaskModel taskModel) {
		return new ResponseEntity<TaskModel>(this.taskService.createTask(taskModel), HttpStatus.OK);
	}
	
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<List<TaskModel>> deleteTask(@PathVariable final Integer id) {
		this.taskService.deleteTask(id);
		return new ResponseEntity<List<TaskModel>>(this.taskService.fetchTasks(), HttpStatus.OK);
	}
	
}
