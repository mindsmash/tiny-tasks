package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA Task repository.
 */
public interface TaskRepository extends JpaRepository<Task, String> {
}
