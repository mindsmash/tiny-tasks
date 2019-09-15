package com.coyoapp.tinytask.repository;

import java.util.List;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String> {

  List<Task> findByOwnerAndIsCompleted(User owner, boolean isCompleted);

}
