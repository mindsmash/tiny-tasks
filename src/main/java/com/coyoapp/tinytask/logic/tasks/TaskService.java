package com.coyoapp.tinytask.logic.tasks;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.coyoapp.tinytask.persistence.entities.TaskEntity;
import com.coyoapp.tinytask.persistence.repositories.TaskRepository;

@Service
public class TaskService {

	@Autowired
	TaskRepository repository;
	
	public List<TaskModel> fetchTasks() {
		final List<TaskModel> tasks = new ArrayList<>();
		for (TaskEntity taskEntity : this.repository.findAll()) {
			tasks.add(this.toModel(taskEntity));
		}
		return tasks;
	}
	
	public TaskModel createTask(final TaskModel taskModel) {
		return this.toModel(this.repository.save(this.toEntity(taskModel)));
	}

	public void deleteTask(final Integer id) {
		this.repository.deleteById(id);
	}
	
	public void deleteAllTasks() {
		this.repository.deleteAll();
	}
	
	private TaskModel toModel(final TaskEntity taskEntity) {
		final TaskModel taskModel = new TaskModel();
		taskModel.setId(taskEntity.getId());
		taskModel.setName(taskEntity.getName());
		return taskModel;
	}
	
	private TaskEntity toEntity(final TaskModel taskModel) {
		final TaskEntity taskEntity = new TaskEntity();
		taskEntity.setId(taskModel.getId());
		taskEntity.setName(taskModel.getName());
		return taskEntity;
	}
}
