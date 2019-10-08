package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
import ma.glasnost.orika.MapperFacade;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
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

  public static final String TASK_ID = "task-id";
  @Rule
  public MockitoRule mockitoRule = MockitoJUnit.rule().strictness(Strictness.STRICT_STUBS);

  @Mock
  private TaskRepository taskRepository;

  @Mock
  private MapperFacade mapperFacade;

  @InjectMocks
  private DefaultTaskService objectUnderTest;

  @Captor
  ArgumentCaptor argCaptor;

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
    Task task = mock(Task.class);
    when(taskRepository.findById(TASK_ID)).thenReturn(Optional.of(task));

    // when
    objectUnderTest.deleteTask(TASK_ID);

    // then
    verify(taskRepository).delete(task);
  }

  @Test(expected = TaskNotFoundException.class)
  public void shouldNotDeleteTask() {
    // given
    when(taskRepository.findById(TASK_ID)).thenReturn(Optional.empty());

    // when
    objectUnderTest.deleteTask(TASK_ID);

    // then
    // -- see exception of test annotation
  }

  @Test
  public void shouldMarkTaskDone() {
    Task taskMock = mock(Task.class);
    Task taskMockSaved = mock(Task.class);
    taskMockSaved.setDone(true);
    TaskResponse expectedTaskResponse = mock(TaskResponse.class);

    when(taskRepository.findById(TASK_ID)).thenReturn(Optional.of(taskMock));
    when(taskRepository.save(taskMock)).thenReturn(taskMockSaved);
    doReturn(expectedTaskResponse).when(mapperFacade).map(taskMockSaved, TaskResponse.class);

    TaskResponse actualTaskResponse = objectUnderTest.markTaskDone(TASK_ID);

    verify(taskRepository).save(taskMock);
    assertThat(actualTaskResponse).isEqualTo(expectedTaskResponse);
  }
}
