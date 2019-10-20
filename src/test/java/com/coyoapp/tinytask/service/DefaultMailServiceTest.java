package com.coyoapp.tinytask.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.isA;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.mail.internet.MimeMessage;

import org.junit.Rule;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.quality.Strictness;
import org.springframework.mail.javamail.JavaMailSender;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;

public class DefaultMailServiceTest {

  @Rule
  public MockitoRule mockitoRule = MockitoJUnit.rule().strictness(Strictness.STRICT_STUBS);

  @Mock
  private JavaMailSender sender;

  @InjectMocks
  private DefaultMailService objectUnderTest;
  
  @Test
  public void shouldSendMailsWithOpemTasksToUsers() {
	  // given
	  User user = mock(User.class);
	  when(user.getEmail()).thenReturn("mymail@test.com");
	  Task task1 = mock(Task.class);
	  Task task2 = mock(Task.class);
	  List<Task> tasks = new ArrayList<Task>(Arrays.asList(task1, task2));
	  MimeMessage message = mock(MimeMessage.class);
	  when(sender.createMimeMessage()).thenReturn(message);
	  
	  //when
	  objectUnderTest.sendMessageWithOpenTasks(user, tasks);
	  
	  //then
	  verify(sender).send(message);
  }
}
