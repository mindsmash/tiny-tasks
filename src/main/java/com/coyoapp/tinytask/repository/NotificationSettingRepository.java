package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.NotificationSetting;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface NotificationSettingRepository extends JpaRepository<NotificationSetting, Long> {
  Optional<NotificationSetting> findTopByOrderByIdAsc();

  @Modifying
  @Transactional
  @Query("UPDATE NotificationSetting n SET n.requestedNotificationDate = :requestedDate WHERE n.email = :email")
  void updateRequestedNotificationDate(String email, LocalDate requestedDate);
}
