package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, String> {

  Optional<List<Task>> findAllByUserEntity(String username);

  Optional<List<Task>> findAllByUserEntity(User user);

}
