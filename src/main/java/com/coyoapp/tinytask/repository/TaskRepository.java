package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskResponse;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Arrays;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, String> {
  @Query("select t from Task t where t.name like %?1%")
  List<Task> findByName(String name, Sort sort);
}
