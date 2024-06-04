package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.NotificationSetting;
import com.coyoapp.tinytask.dto.NotificationSettingModel;
import com.coyoapp.tinytask.enums.Duration;
import com.coyoapp.tinytask.repository.NotificationSettingRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;


@Slf4j
@Service
@RequiredArgsConstructor
public class DefaultNotificationService implements NotificationSettingService {

  private final NotificationSettingRepository notificationSettingRepository;
  private final ModelMapper mapper;

  @Override
  @Transactional
  public void updateNotificationSetting(NotificationSettingModel notification) {
    log.debug("updateNotificationSetting()");
    NotificationSetting notificationSetting = notificationSettingRepository.findTopByOrderByIdAsc()
      .orElseThrow(() -> new RuntimeException("Notification setting is not found!"));
    if (!notification.getDuration().equals(notificationSetting.getDuration())) {
      notificationSetting.setRequestedNotificationDate(LocalDate.now().plusDays(Duration.valueOf(notification.getDuration()).getDurationInDay()));
    }
    notificationSetting.setEmail(notification.getEmail());
    notificationSetting.setDuration(notification.getDuration());
    notificationSetting.setActive(notification.isActive());
    notificationSetting.setOnlyDueDate(notification.isOnlyDueDate());
    notificationSetting.setDayBeforeDueDate(notification.getDayBeforeDueDate());
    notificationSettingRepository.save(notificationSetting);
  }

  @Override
  @Transactional(readOnly = true)
  public NotificationSettingModel getNotificationSetting() {
    log.debug("getNotificationSetting()");
    return notificationSettingRepository.findTopByOrderByIdAsc()
      .map(this::transformToDto)
      .orElseThrow(() -> new RuntimeException("Notification setting is not found!"));
  }

  @Override
  public void updateNotificationRequestedDate(String email, LocalDate requestedNotificationDate) {
    log.debug("updateNotificationRequestedDate(email={}, requestedNotificationDate={} )", email, requestedNotificationDate);
    notificationSettingRepository.updateRequestedNotificationDate(email, requestedNotificationDate);
  }

  private NotificationSettingModel transformToDto(NotificationSetting notificationSetting) {
    return mapper.map(notificationSetting, NotificationSettingModel.class);
  }
}
