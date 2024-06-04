package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, String> {

  @Modifying
  @Transactional
  @Query("UPDATE Task t SET t.dueDate = :dueDate WHERE t.id = :taskId")
  void updateDueDateById(String taskId, LocalDate dueDate);

  List<Task> findByDueDateBetween(LocalDate startDate, LocalDate endDate);
}
