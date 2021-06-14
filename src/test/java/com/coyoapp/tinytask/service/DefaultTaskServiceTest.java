package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.helper.TaskHelper;
import com.coyoapp.tinytask.repository.TaskRepository;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import ma.glasnost.orika.MapperFacade;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
  private MapperFacade mapperFacade;

  @Mock
  private TaskHelper taskHelper;

  @InjectMocks
  private DefaultTaskService objectUnderTest;

  @Test
  void shouldCreateTask() {
    // given
    TaskRequest taskRequest = mock(TaskRequest.class);
    Task task = mock(Task.class);
    Task savedTask = mock(Task.class);
    TaskResponse taskResponse = mock(TaskResponse.class);
    doReturn(task).when(taskHelper).requestToTask(taskRequest);
    when(taskRepository.save(task)).thenReturn(savedTask);
    doReturn(taskResponse).when(taskHelper).taskToResponse(savedTask);

    // when
    TaskResponse actualResponse = objectUnderTest.createTask(taskRequest);

    // then
    assertThat(actualResponse).isEqualTo(taskResponse);
  }

  @Test
  void shouldGetTasks() {
    // given
    Task task = mock(Task.class);
    TaskResponse taskResponse = mock(TaskResponse.class);
    List<Task> tasks = List.of(task);
    List<TaskResponse> responses = List.of(taskResponse);
    when(taskRepository.findAll()).thenReturn(tasks);
    when(taskHelper.tasksToResponses(tasks)).thenReturn(responses);

    // when
    List<TaskResponse> actualTasks = objectUnderTest.getTasks();

    // then
    assertThat(actualTasks).isEqualTo(responses);
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
