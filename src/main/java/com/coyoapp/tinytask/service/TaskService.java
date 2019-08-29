package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import java.util.List;

public interface TaskService {


	List<TaskResponse> getTasks();

	TaskResponse createTask(TaskRequest taskRequest);

	void deleteTask(String taskId);

}
