package com.coyoapp.tinytask.repository;

import java.util.List;

import com.coyoapp.tinytask.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String> {
    public List<Task> findAllByOrderByDueDate();
}
