package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.dto.UserDTO;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.service.impl.DefaultTaskService;
import ma.glasnost.orika.MapperFacade;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.quality.Strictness;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;


public class DefaultTaskServiceTest {

  @Rule
  public MockitoRule mockitoRule = MockitoJUnit.rule().strictness(Strictness.LENIENT);

  @Mock
  private TaskRepository taskRepository;

  @Mock
  private NotificationService notificationService;

  @Mock
  private UserService userService;

  @Mock
  private MapperFacade mapperFacade;

  @InjectMocks
  private DefaultTaskService objectUnderTest;

  @Test
  public void shouldCreateTask() {
    // given
    TaskRequest taskRequest = mock(TaskRequest.class);
    Task task = mock(Task.class);
    Task savedTask = mock(Task.class);
    TaskResponse taskResponse = mock(TaskResponse.class);
    User user = mock(User.class);
    UserDTO userDTO = mock(UserDTO.class);

    doReturn(user).when(mapperFacade).map(userDTO, User.class);
    doReturn(userDTO).when(userService).get(isA(String.class));
    doReturn(task).when(mapperFacade).map(taskRequest, Task.class);
    when(taskRepository.save(task)).thenReturn(savedTask);
    doNothing().when(notificationService).notifyUserAboutNewTask(taskResponse);
    doReturn(taskResponse).when(mapperFacade).map(savedTask, TaskResponse.class);

    // when
    TaskResponse actualResponse = objectUnderTest.createTask(taskRequest);

    // then
    assertThat(actualResponse).isEqualTo(taskResponse);
  }

  @Test
  public void shouldGetTasks() {
    // given
    Task task = mock(Task.class);
    TaskResponse taskResponse = mock(TaskResponse.class);
    when(taskRepository.findAll()).thenReturn(Arrays.asList(task));
    when(mapperFacade.map(task, TaskResponse.class)).thenReturn(taskResponse);

    // when
    List<TaskResponse> actualTasks = objectUnderTest.getTasks();

    // then
    assertThat(actualTasks).contains(taskResponse);
  }

  @Test
  public void shouldFindAllUndoneTasksOfUser() {
    UserDTO userDTO = mock(UserDTO.class);
    User owner = mock(User.class);

    Task task = mock(Task.class);
    TaskResponse taskResponse = mock(TaskResponse.class);

    doReturn(owner).when(mapperFacade).map(userDTO, User.class);
    doReturn(taskResponse).when(mapperFacade).map(task, TaskResponse.class);
    when(taskRepository.findByOwnerAndIsCompleted(owner, false)).thenReturn(Arrays.asList(task));

    List<TaskResponse> taskResponses = objectUnderTest.findAllUndoneTasksOfUser(userDTO);

    assertThat(taskResponses).contains(taskResponse);
  }

  @Test
  public void shouldDeleteTask() {
    // given
    String id = "task-id";
    Task task = mock(Task.class);
    when(taskRepository.findById(id)).thenReturn(Optional.of(task));

    // when
    objectUnderTest.deleteTask(id);

    // then
    verify(taskRepository).delete(task);
  }

  @Test(expected = TaskNotFoundException.class)
  public void shouldNotDeleteTask() {
    // given
    String id = "task-id";
    when(taskRepository.findById(id)).thenReturn(Optional.empty());

    // when
    objectUnderTest.deleteTask(id);

    // then
    // -- see exception of test annotation
  }
}
