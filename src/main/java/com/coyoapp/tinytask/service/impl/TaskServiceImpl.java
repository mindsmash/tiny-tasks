package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.exception.UserNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.TypeDescriptor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service(value = "taskService")
public class TaskServiceImpl implements TaskService {

  @Autowired
  TaskRepository taskRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  ConversionService conversionService;

  @Override
  public List<TaskResponse> getAllTasks() {
    List<Task> tasks = (List<Task>) taskRepository.findAll();

    return (List<TaskResponse>) conversionService.convert(tasks,
      TypeDescriptor.collection(List.class, TypeDescriptor.valueOf(Task.class)),
      TypeDescriptor.collection(List.class, TypeDescriptor.valueOf(TaskResponse.class)));
  }


  @Override
  public TaskResponse getTask(String id) throws TaskNotFoundException{
    if(!taskRepository.findById(id).isPresent()) throw new TaskNotFoundException("Task with task_id " + id + "Not Found");

    return conversionService.convert(taskRepository.findById(id).get(), TaskResponse.class);
  }

  @Override
  public TaskResponse createTask(TaskRequest taskRequest) throws UserNotFoundException {

    if(!userRepository.findById(taskRequest.getUserId()).isPresent()) throw new UserNotFoundException("User with user_id " + taskRequest.getUserId() + " Not Found.");
    return getTaskResponse(taskRequest);
  }

  @Override
  public TaskResponse updateTask(TaskRequest taskRequest, String taskId) throws UserNotFoundException, TaskNotFoundException {

    if(!userRepository.findById(taskRequest.getUserId()).isPresent()) throw new UserNotFoundException("User with user_id " + taskRequest.getUserId() + " Not Found.");
    if(!taskRepository.findById(taskId).isPresent()){ throw new TaskNotFoundException("Task with task_id " + taskId + "Not Found"); }

    taskRequest.setId(taskId);
    return getTaskResponse(taskRequest);
  }

  private TaskResponse getTaskResponse(TaskRequest taskRequest) throws UserNotFoundException {

    Task task = conversionService.convert(taskRequest, Task.class);
    assert task != null;
    task.setUser(userRepository.findById(taskRequest.getUserId()).get());

    taskRepository.save(task);
    return conversionService.convert(task, TaskResponse.class);
  }

  @Override
  public void deleteTask(String taskId) throws TaskNotFoundException{
    if(!taskRepository.findById(taskId).isPresent()){ throw new TaskNotFoundException("Task with task_id " + taskId + "Not Found"); }
    taskRepository.delete(taskRepository.findById(taskId).get());
  }
}
