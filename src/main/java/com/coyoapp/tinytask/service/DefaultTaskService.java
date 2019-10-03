package com.coyoapp.tinytask.service;

import static java.util.stream.Collectors.toList;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.coyoapp.tinytask.domain.Attach;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.AttachRepository;
import com.coyoapp.tinytask.repository.TaskRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultTaskService implements TaskService {

	private final TaskRepository taskRepository;
	private final AttachRepository attachRepository;
	private final MapperFacade mapperFacade;

	@Override
	@Transactional
	public TaskResponse createTask(TaskRequest taskRequest, MultipartFile image) throws IOException {
		log.debug("createTask(createTask={})", taskRequest);
		Task task = mapperFacade.map(taskRequest, Task.class);
		Optional<MultipartFile> optionalImage = Optional.ofNullable(image);
		if (optionalImage.isPresent()) {
			MultipartFile multipartFileAttach = optionalImage.get();
			Attach attach = Attach.builder().binAttach(multipartFileAttach.getBytes())
					.type(multipartFileAttach.getContentType()).fileName(multipartFileAttach.getOriginalFilename())
					.build();
			task.setAttach(attachRepository.save(attach));
		}

		return transformToResponse(taskRepository.save(task));
	}

	@Override
	@Transactional(readOnly = true)
	public List<TaskResponse> getTasks() {
		log.debug("getTasks()");
		return taskRepository.findAll().stream().map(this::transformToResponse).collect(toList());
	}

	private TaskResponse transformToResponse(Task task) {
		TaskResponse taskResponse = mapperFacade.map(task, TaskResponse.class);
		if (task.getAttach() != null) {
			taskResponse.setHasAttach(true);
			taskResponse.setImageAttach(
					task.getAttach().getType() != null && task.getAttach().getType().startsWith("image"));
		}
		return taskResponse;
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

}
