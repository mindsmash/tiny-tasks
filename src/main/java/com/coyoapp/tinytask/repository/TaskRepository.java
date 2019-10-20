package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.TaskStatus;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String> {
	
	@EntityGraph(attributePaths = {"assignee"})
	List<Task> findAllByStatusAndDueDateIsNull(TaskStatus status);
	
	@EntityGraph(attributePaths = {"assignee"})
	List<Task> findAllByStatusAndDueDateBetween(TaskStatus status, Instant start, Instant end);
}
