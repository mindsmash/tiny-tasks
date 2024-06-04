package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.NotificationSetting;
import com.coyoapp.tinytask.dto.NotificationSettingModel;
import com.coyoapp.tinytask.repository.NotificationSettingRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DefaultNotificationServiceTest {

  @Mock
  private NotificationSettingRepository notificationSettingRepository;

  @Mock
  private ModelMapper mapper;

  @InjectMocks
  private DefaultNotificationService objectUnderTest;

  @Test
  void shouldUpdateNotificationSetting() {
    // given
    NotificationSettingModel notificationModel = new NotificationSettingModel();
    notificationModel.setDuration("EVERY_24H");
    notificationModel.setEmail("notification-email");
    notificationModel.setActive(true);
    notificationModel.setOnlyDueDate(true);
    notificationModel.setDayBeforeDueDate(3);

    NotificationSetting notificationSetting = new NotificationSetting();

    when(notificationSettingRepository.findTopByOrderByIdAsc()).thenReturn(Optional.of(notificationSetting));

    // when
    objectUnderTest.updateNotificationSetting(notificationModel);

    // then
    ArgumentCaptor<NotificationSetting> settingCaptor = ArgumentCaptor.forClass(NotificationSetting.class);
    verify(notificationSettingRepository).save(settingCaptor.capture());

    NotificationSetting capturedSetting = settingCaptor.getValue();
    assertThat(capturedSetting.getEmail()).isEqualTo(notificationModel.getEmail());
    assertThat(capturedSetting.getDuration()).isEqualTo(notificationModel.getDuration());
    assertThat(capturedSetting.isActive()).isEqualTo(notificationModel.isActive());
    assertThat(capturedSetting.isOnlyDueDate()).isEqualTo(notificationModel.isOnlyDueDate());
    assertThat(capturedSetting.getDayBeforeDueDate()).isEqualTo(notificationModel.getDayBeforeDueDate());

    verify(notificationSettingRepository, times(1)).findTopByOrderByIdAsc();
    verify(notificationSettingRepository, times(1)).save(notificationSetting);
  }

  @Test
  void shouldGetNotificationSetting() {
    //given
    NotificationSetting notificationSetting = mock(NotificationSetting.class);
    NotificationSettingModel notificationSettingModel = mock(NotificationSettingModel.class);
    when(notificationSettingRepository.findTopByOrderByIdAsc()).thenReturn(Optional.ofNullable(notificationSetting));
    when(mapper.map(notificationSetting, NotificationSettingModel.class)).thenReturn(notificationSettingModel);

    //when
    NotificationSettingModel actualTask = objectUnderTest.getNotificationSetting();

    //then
    assertThat(actualTask).isEqualTo(notificationSettingModel);
  }

  @Test
  void shouldUpdateNotificationRequestedDate() {
    //given
    String email = "notification-email";
    LocalDate requestedNotificationDate = LocalDate.now();

    //when
    objectUnderTest.updateNotificationRequestedDate(email, requestedNotificationDate);

    //then
    verify(notificationSettingRepository, times(1)).updateRequestedNotificationDate(email, requestedNotificationDate);
  }
}
