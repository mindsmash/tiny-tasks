package com.coyoapp.tinytask.scheduler;

import com.coyoapp.tinytask.dto.NotificationSettingModel;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.enums.Duration;
import com.coyoapp.tinytask.service.NotificationService;
import com.coyoapp.tinytask.service.NotificationSettingService;
import com.coyoapp.tinytask.service.TaskService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EMailSchedulerTest {
  @Mock
  private NotificationSettingService notificationSettingService;

  @Mock
  private TaskService taskService;

  @Mock
  private NotificationService notificationService;

  @InjectMocks
  private EMailScheduler objectUnderTest;

  @Test
  void shouldSendEmailSchedule() throws Exception {
    //given
    NotificationSettingModel notificationSetting = mock(NotificationSettingModel.class);
    List<TaskResponse> tasks = Collections.singletonList(mock(TaskResponse.class));

    LocalDate today = LocalDate.now();
    when(notificationSettingService.getNotificationSetting()).thenReturn(notificationSetting);
    when(notificationSetting.isActive()).thenReturn(true);
    when(notificationSetting.getRequestedNotificationDate()).thenReturn(today.minusDays(1));
    when(notificationSetting.isOnlyDueDate()).thenReturn(false);
    when(taskService.getTasks()).thenReturn(tasks);
    when(notificationSetting.getEmail()).thenReturn("notification-email");
    when(notificationSetting.getDuration()).thenReturn("EVERY_24H");

    //when
    objectUnderTest.sendEmailSchedule();

    //then
    verify(notificationSettingService).getNotificationSetting();
    verify(notificationSettingService).updateNotificationRequestedDate(notificationSetting.getEmail(), today.plusDays(Duration.valueOf(notificationSetting.getDuration()).getDurationInDay()));
    verify(taskService).getTasks();
    verify(notificationService).sendNotificationAboutTasks(notificationSetting.getEmail(), tasks, "TaskMail.ftl");

    @SuppressWarnings("unchecked")
    ArgumentCaptor<List<TaskResponse>> taskCaptor = ArgumentCaptor.forClass(List.class);
    verify(notificationService).sendNotificationAboutTasks(eq("notification-email"), taskCaptor.capture(), eq("TaskMail.ftl"));
    assertThat(taskCaptor.getValue()).isEqualTo(tasks);
  }
}
