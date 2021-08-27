package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification,String> {

  @Query("select n from Notification n where n.active = true")
  List<Notification> findAllActive();

  @Query("select n from Notification n where n.active = true and cronExpression = :ce")
  List<Notification> findAllActivateByCronExpression(@Param("ce") String cronExpression);

  @Query("select count(n) from Notification n where n.active = true and cronExpression = :ce")
  long countAllActiveWithCronExpression(@Param("ce") String cronExpression);

}
