package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.dto.NotificationSettingModel;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

class NotificationControllerTest extends BaseControllerTest {

  private static final String PATH = "/notification";

  @Test
  void shouldUpdateNotificationSetting() throws Exception {
    //given
    NotificationSettingModel notificationSettingModel = new NotificationSettingModel(
      "notification-duration", "notification-email", true, true, 10, null);
    ObjectMapper objectMapper = new ObjectMapper();
    String requestBody = objectMapper.writeValueAsString(notificationSettingModel);

    //when
    ResultActions actualResult = this.mockMvc.perform(put(PATH)
      .contentType(MediaType.APPLICATION_JSON)
      .content(requestBody));

    //then
    actualResult
      .andDo(print())
      .andExpect(status().isOk());

    verify(notificationSettingService).updateNotificationSetting(notificationSettingModel);
  }

  @Test
  void shouldGetNotificationSetting() throws Exception {
    // given
    String duration = "notification-duration";
    String email = "notification-email";
    boolean isActive = true;
    boolean isOnlyDueDate = true;
    Integer dayBeforeDueDate = 10;
    LocalDate requestedNotificationDate = LocalDate.of(2024, 1, 1);
    NotificationSettingModel notificationSettingModel = NotificationSettingModel.builder()
      .duration(duration).email(email).isActive(isActive).isOnlyDueDate(isOnlyDueDate)
      .dayBeforeDueDate(dayBeforeDueDate).requestedNotificationDate(requestedNotificationDate)
      .build();
    when(notificationSettingService.getNotificationSetting()).thenReturn(notificationSettingModel);

    //when
    ResultActions actualResult = this.mockMvc.perform(get(PATH));

    //then
    Integer[] dateArray = { requestedNotificationDate.getYear(), requestedNotificationDate.getMonthValue(), requestedNotificationDate.getDayOfMonth() };
    List<Integer> dateList = Arrays.asList(dateArray);
    actualResult
      .andDo(print())
      .andExpect(status().isOk())
      .andExpect(content().contentType(MediaType.APPLICATION_JSON))
      .andExpect(jsonPath("$.duration", is(duration)))
      .andExpect(jsonPath("$.email", is(email)))
      .andExpect(jsonPath("$.active", is(isActive)))
      .andExpect(jsonPath("$.onlyDueDate", is(isOnlyDueDate)))
      .andExpect(jsonPath("$.dayBeforeDueDate", is(dayBeforeDueDate)))
      .andExpect(jsonPath("$.requestedNotificationDate", is(dateList)));
  }
}
