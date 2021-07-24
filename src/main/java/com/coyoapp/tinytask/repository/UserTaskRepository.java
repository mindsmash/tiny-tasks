package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.domain.UserTask;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserTaskRepository extends JpaRepository<UserTask, String> {

  @Query(value = "SELECT ut from UserTask ut where ut.user = :user and ut.isDone = false and (ut.dueDate is null or ut.dueDate > current_date) "
    + "and (ut.lastNotified is null or ut.lastNotified < :userLastPeriod)")
  List<UserTask> findAllTasksHasToBeNotifiedByUser(User user, LocalDateTime userLastPeriod);

  List<UserTask> findByUserId(String id);
}
