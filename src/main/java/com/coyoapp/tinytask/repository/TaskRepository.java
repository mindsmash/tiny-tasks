package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, String> {
  List<Task> findAllByStatusIsNot(TaskStatus status);
}
