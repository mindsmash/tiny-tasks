package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.dto.TaskStatusRequest;

import java.util.List;

public interface TaskService {

    TaskResponse createTask(TaskRequest taskRequest);

    List<TaskResponse> getTasks();

    List<TaskResponse> getTasksOrdered();

    void deleteTask(String taskId);

    TaskResponse updateTaskStatus(String taskId, TaskStatusRequest request);

    void deleteTaskByDone(String done);
}
