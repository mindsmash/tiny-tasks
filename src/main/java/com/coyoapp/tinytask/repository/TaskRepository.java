package com.coyoapp.tinytask.repository;

import java.util.List;
import java.util.concurrent.Future;

import com.coyoapp.tinytask.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String> {
  List<Task> findByCreator(String creator);
}
