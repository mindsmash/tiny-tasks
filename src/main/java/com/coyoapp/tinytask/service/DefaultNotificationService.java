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
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
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

  @EventListener(ApplicationReadyEvent.class)
  void init() {
    List<Notification> notifications = notificationRepository.findAllActive();
    if (!notifications.isEmpty())
      notifications.stream().map(n -> n.getCronExpression()).distinct().forEach(reminderManager::createReminder);
  }

  @Override
  @Transactional
  public NotificationResponse createNotification(String userId, NotificationRequest notificationRequest) {
    if (notificationRequest.getActive()) {
      Notification notification = mapperFacade.map(notificationRequest, Notification.class);
      User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
      notification.setUser(user);
      reminderManager.createReminder(notification.getCronExpression());
      return transformToResponse(notificationRepository.save(notification));
    }
    return null;
  }

  @Override
  @Transactional
  public NotificationResponse updateNotification(String id, NotificationRequest notificationRequest) {
    Notification notification = getNotificationOrThrowException(id);
    long notificationCount = notificationRepository.countAllActiveWithCronExpression(notification.getCronExpression());
    if (notificationCount == 1)// If nobody else has the same cronExpression as current user then delete it
      reminderManager.deleteReminder(notification.getCronExpression());
    if (notificationRequest.getActive())
      reminderManager.createReminder(notificationRequest.getCronExpression());

    notification.setActive(notificationRequest.getActive());
    notification.setCronExpression(notificationRequest.getCronExpression());
    return transformToResponse(notificationRepository.save(notification));
  }

  private NotificationResponse transformToResponse(Notification notification) {
    return mapperFacade.map(notification, NotificationResponse.class);
  }

  private Notification getNotificationOrThrowException(String notificationId) {
    return notificationRepository.findById(notificationId).orElseThrow(NotificationNotFoundException::new);
  }

}
