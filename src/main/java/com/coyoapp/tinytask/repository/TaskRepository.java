package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaskRepository extends JpaRepository<Task, String> {

  Optional<List<Task>> findAllTasksByUser(User user);

}
