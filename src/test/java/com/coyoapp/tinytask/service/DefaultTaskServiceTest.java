package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;

import java.util.List;
import java.util.Optional;

import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.user.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.ThrowableAssert.catchThrowable;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class DefaultTaskServiceTest {


  @Mock
  private TaskRepository taskRepository;

  @Mock
  private ModelMapper mapper;

  @Mock
  private UserService userService;

  @InjectMocks
  private DefaultTaskService objectUnderTest;

  @Test
  void shouldCreateTask() {
    // given
    TaskRequest taskRequest = mock(TaskRequest.class);
    Task task = mock(Task.class);
    Task savedTask = mock(Task.class);
    TaskResponse taskResponse = mock(TaskResponse.class);
    doReturn(task).when(mapper).map(taskRequest, Task.class);
    when(taskRepository.save(task)).thenReturn(savedTask);
    doReturn(taskResponse).when(mapper).map(savedTask, TaskResponse.class);

    User user = mock(User.class);
    String TEST_EMAIL = "test@email.com";
    when(userService.findByEmail(TEST_EMAIL)).thenReturn(Optional.of(user));

    // when
    TaskResponse actualResponse = objectUnderTest.createTask(taskRequest, TEST_EMAIL);

    // then
    assertThat(actualResponse).isEqualTo(taskResponse);
  }

  @Test
  void shouldGetTasks() {
    // given
    Task task = mock(Task.class);
    TaskResponse taskResponse = mock(TaskResponse.class);
    when(taskRepository.findAll()).thenReturn(List.of(task));
    when(mapper.map(task, TaskResponse.class)).thenReturn(taskResponse);

    // when
    List<TaskResponse> actualTasks = objectUnderTest.getTasks();

    // then
    assertThat(actualTasks).contains(taskResponse);
  }

  @Test
  void shouldDeleteTask() {
    // given
    String id = "task-id";
    Task task = mock(Task.class);
    when(taskRepository.findById(id)).thenReturn(Optional.of(task));

    // when
    objectUnderTest.deleteTask(id);

    // then
    verify(taskRepository).delete(task);
  }

  @Test
  void shouldNotDeleteTask() {
    // given
    String id = "task-id";
    when(taskRepository.findById(id)).thenReturn(Optional.empty());

    // when
    Throwable thrown = catchThrowable(() -> objectUnderTest.deleteTask(id));

    // then
    assertThat(thrown).isInstanceOf(TaskNotFoundException.class);
  }
}
