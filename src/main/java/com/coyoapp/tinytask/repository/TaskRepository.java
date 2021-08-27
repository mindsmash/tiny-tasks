package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, String> {

  @Query("select t from Task t where t.user.notification.active = true " +
    "and t.user.notification.cronExpression = :ce " +
    "and t.state <> com.coyoapp.tinytask.domain.State.DONE ")
  List<Task> findAllUncompletedByCronExpression(@Param("ce") String cronExpression);

}
