package com.coyoapp.tinytask.web;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.coyoapp.tinytask.dto.AttachResponse;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.TaskService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

	private final TaskService taskService;

	@PostMapping
	public TaskResponse createTask(@RequestParam @Valid TaskRequest taskRequest, MultipartFile image)
			throws IOException {
		log.debug("createTask(createTask={})", taskRequest);
		return taskService.createTask(taskRequest, image);
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

	@GetMapping(path = "/{taskId}/attach")
	public ResponseEntity<Resource> getAttachTask(@PathVariable String taskId) {
		log.debug("getAttachTask(taskId={})", taskId);
		Optional<AttachResponse> attachByTask = taskService.findAttachByTask(taskId);
		AttachResponse attach = attachByTask.orElseThrow();

		ByteArrayResource resource = new ByteArrayResource(attach.getBinAttach());

		return ResponseEntity.ok().header("Content-Disposition", "attachment; filename=" + attach.getFileName())
				.contentLength(resource.contentLength()).contentType(MediaType.parseMediaType(attach.getType()))
				.body(resource);
	}
}
