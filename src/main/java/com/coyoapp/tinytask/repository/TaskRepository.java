package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String> {

  Page<Task> findAllByUserId(Integer userId, Pageable pg);
}
