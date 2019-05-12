package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
import ma.glasnost.orika.MapperFacade;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.quality.Strictness;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class DefaultTaskServiceTest {

  @Rule
  public MockitoRule mockitoRule = MockitoJUnit.rule().strictness(Strictness.STRICT_STUBS);

  @Mock
  private TaskRepository taskRepository;

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
    doReturn(task).when(mapperFacade).map(taskRequest, Task.class);
    when(taskRepository.save(task)).thenReturn(savedTask);
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

  @Test
  public void shouldUpdateTask() {
    // given
    String id = "task-id";
    Task originalTask = mock(Task.class);
    Task updatedTask = mock(Task.class);
    TaskRequest taskRequest = mock(TaskRequest.class);

    when(originalTask.getId()).thenReturn(id);
    when(originalTask.getCreated()).thenReturn(Instant.now());
    when(mapperFacade.map(taskRequest, Task.class)).thenReturn(updatedTask);
    when(taskRepository.findById(id)).thenReturn(Optional.of(originalTask));

    // when
    objectUnderTest.updateTask(id, taskRequest);

    // then
    verify(taskRepository).save(any(Task.class));
  }

  @Test(expected = TaskNotFoundException.class)
  public void shouldNotUpdateTask() {
    // given
    String id = "task-id";
    TaskRequest taskRequest = mock(TaskRequest.class);
    when(taskRepository.findById(id)).thenReturn(Optional.empty());

    // when
    objectUnderTest.updateTask(id, taskRequest);

    // then
    // -- see exception of test annotation
  }
}
