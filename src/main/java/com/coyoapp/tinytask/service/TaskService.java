package com.coyoapp.tinytask.service;

import java.util.List;

import javax.validation.Valid;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;

public interface TaskService {


	List<TaskResponse> getTasks();


	void deleteTask(String taskId);


	TaskResponse createTask(TaskRequest taskRequest);

}
