package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Category;
import com.coyoapp.tinytask.domain.Task;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, String> {

  List<Task> findAll();

  void deleteAllByCategory(Category category);
}
