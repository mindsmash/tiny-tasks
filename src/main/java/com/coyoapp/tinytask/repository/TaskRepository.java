package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TaskRepository extends JpaRepository<Task, String>, JpaSpecificationExecutor<Task> {
}
