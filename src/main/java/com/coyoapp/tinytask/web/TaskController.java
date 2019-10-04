package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.FileStorageService;
import com.coyoapp.tinytask.service.TaskService;

import java.io.IOException;
import java.util.List;

import javax.servlet.MultipartConfigElement;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/tasks")
@RequiredArgsConstructor
public class TaskController {

	@Autowired
	private final TaskService taskService;

	@Autowired
	private final FileStorageService fileStorageService;

	@PostMapping
	public TaskResponse createTask(@RequestBody @Valid TaskRequest taskRequest) {
		log.debug("createTask(createTask={})", taskRequest);
		return taskService.createTask(taskRequest);
	}

	@PostMapping("/imageAttached")
	public TaskResponse createTask(@RequestPart("task") @Valid TaskRequest taskRequest,
			@RequestParam("file") MultipartFile file) {

		if (file != null) {
			String fileName = fileStorageService.storeFile(file);
			taskRequest.setImageFile(fileName);
		}

		log.debug("createTaskWithImageAttached(createTask={})", taskRequest);
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

	@GetMapping("/image/{taskId}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String taskId, HttpServletRequest request) {

		Task task = taskService.getTaskByid(taskId);

		Resource resource = fileStorageService.loadFileAsResource(task.getImageFile());

		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());

			if (contentType == null) {
				contentType = "application/octet-stream";
			}

		} catch (IOException ex) {
			log.error("Error on download image from task={}", task);
		}

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}
}
