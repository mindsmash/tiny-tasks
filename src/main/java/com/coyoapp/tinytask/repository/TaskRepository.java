package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, String> {

  @Query(value = "SELECT * FROM task t ORDER BY duedate ASC",
  nativeQuery = true)
  List<Task> getTasks();

}
