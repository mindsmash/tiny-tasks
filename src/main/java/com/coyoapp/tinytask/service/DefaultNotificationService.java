package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Notification;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.NotificationRequest;
import com.coyoapp.tinytask.dto.NotificationResponse;
import com.coyoapp.tinytask.exception.NotificationNotFoundException;
import com.coyoapp.tinytask.exception.UserNotFoundException;
import com.coyoapp.tinytask.repository.NotificationRepository;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultNotificationService implements NotificationService {

  private final NotificationRepository notificationRepository;
  private final UserRepository userRepository;
  private final MapperFacade mapperFacade;
  private final ReminderManager reminderManager;

  @Override
  @Transactional
  public NotificationResponse createNotification(NotificationRequest notificationRequest) {
    if (notificationRequest.getActive()) {
      Notification notification = mapperFacade.map(notificationRequest, Notification.class);
      User user = userRepository.findById(notificationRequest.getUserId()).orElseThrow(UserNotFoundException::new);
      notification.setUser(user);
      reminderManager.createReminder(notification.getCronExpression());
      return transformToResponse(notificationRepository.save(notification));
    }
    return null;
  }

  @Override
  @Transactional
  public NotificationResponse updateNotification(NotificationRequest notificationRequest) {
    String oldCronExpression = getNotificationOrThrowException(notificationRequest.getUserId()).getCronExpression();
    List<Notification> notifications = notificationRepository.findAllActivateByCronExpression(oldCronExpression);
    if (notifications.size() == 1)// If nobody else has the same cronExpression as current user then delete it
      reminderManager.deleteReminder(oldCronExpression);
    if (notificationRequest.getActive())
      reminderManager.createReminder(notificationRequest.getCronExpression());

    Notification notification = mapperFacade.map(notificationRequest, Notification.class);
    notification.setId(notificationRequest.getUserId());
    return transformToResponse(notificationRepository.save(notification));
  }

  private NotificationResponse transformToResponse(Notification notification) {
    return mapperFacade.map(notification, NotificationResponse.class);
  }

  private Notification getNotificationOrThrowException(String notificationId) {
    return notificationRepository.findById(notificationId).orElseThrow(NotificationNotFoundException::new);
  }

}
