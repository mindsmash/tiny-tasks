package com.coyoapp.tinytask.service;

import static java.util.stream.Collectors.toList;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.TaskStatus;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultTaskService implements TaskService {

	private final TaskRepository taskRepository;
	private final MapperFacade mapperFacade;

	@Override
	@Transactional
	public TaskResponse createTask(TaskRequest taskRequest) {
		log.debug("createTask(createTask={})", taskRequest);
		Task task = mapperFacade.map(taskRequest, Task.class);
		return transformToResponse(taskRepository.save(task));
	}

	@Override
	@Transactional(readOnly = true)
	public List<TaskResponse> getTasks() {
		log.debug("getTasks()");
		return taskRepository.findAll().stream().map(this::transformToResponse).collect(toList());
	}

	private TaskResponse transformToResponse(Task task) {
		return mapperFacade.map(task, TaskResponse.class);
	}

	@Override
	@Transactional
	public void deleteTask(String taskId) {
		log.debug("deleteTask(taskId={})", taskId);
		taskRepository.delete(getTaskOrThrowException(taskId));
	}

	private Task getTaskOrThrowException(String taskId) {
		return taskRepository.findById(taskId).orElseThrow(TaskNotFoundException::new);
	}

	@Override
	public Map<User, List<Task>> findOpenTasks() {
		log.debug("findOpenTasks()");
		List<Task> tasks = taskRepository.findAllByStatusAndDueDateIsNull(TaskStatus.OPEN);
		tasks.addAll(findDueTodayOpenTasks());
		return tasks.stream().collect(Collectors.groupingBy(task -> task.getAssignee()));
	}

	private List<Task> findDueTodayOpenTasks() {
		log.debug("findDueTodayOpenTasks()");
		LocalDateTime start = LocalDate.now().atStartOfDay();
		Instant startTime = start.atZone(ZoneId.systemDefault()).toInstant();
		Instant endTime = startTime.plus(1, ChronoUnit.DAYS);
		return taskRepository.findAllByStatusAndDueDateBetween(TaskStatus.OPEN, startTime, endTime);
	}
}
