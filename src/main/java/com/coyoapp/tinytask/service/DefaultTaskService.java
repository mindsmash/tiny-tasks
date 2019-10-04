package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.ImageTaskNotFoundException;
import com.coyoapp.tinytask.exception.StorageException;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import static java.util.stream.Collectors.toList;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultTaskService implements TaskService {

	@Value("${storage.root-folder}")
	private String storageRootFolder;

	@Value("${storage.image-folder}")
	private String imageFolder;

	@Autowired
	private final TaskRepository taskRepository;

	@Autowired
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
	@Transactional
	public Task getTaskByid(String taskId) {
		log.debug("getTaskByid(taskId={})", taskId);
		return getTaskOrThrowException(taskId);
	}

	@Override
	public String storeTaskFile(MultipartFile file) {

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		try {
			if (fileName.contains("..")) {
				throw new StorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}
			Path directoryPath = Paths.get(storageRootFolder, imageFolder);
			Path filePath = directoryPath.resolve(fileName).normalize();

			Files.createDirectories(directoryPath);
			file.transferTo(filePath.toFile());

			return fileName;

		} catch (IOException ex) {
			throw new StorageException(String.format("Error, could not store file %s. Pleasy try again!", fileName),
					ex);
		}
	}

	@Override
	public Resource loadTaskFile(String fileName) {
		try {
			Path directoryPath = Paths.get(storageRootFolder, imageFolder);
			Path filePath = directoryPath.resolve(fileName).normalize();

			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new ImageTaskNotFoundException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			throw new ImageTaskNotFoundException("File not found " + fileName, ex);
		}
	}

}
