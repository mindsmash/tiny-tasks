package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;
import ma.glasnost.orika.MapperFacade;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.ThrowableAssert.catchThrowable;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DefaultTaskServiceTest {


  @Mock
  private TaskRepository taskRepository;

  @Mock
  private MapperFacade mapperFacade;

  @InjectMocks
  private DefaultTaskService objectUnderTest;

  @Test
  void shouldCreateTask() {
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
  void shouldGetTasks() {
    // given
    Task task = mock(Task.class);
    TaskResponse taskResponse = mock(TaskResponse.class);
    when(taskRepository.findAll()).thenReturn(List.of(task));
    when(mapperFacade.map(task, TaskResponse.class)).thenReturn(taskResponse);

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
    when(taskRepository.findById(id)).thenReturn(null);

    // when
    objectUnderTest.deleteTask(id);

    // then
    verify(taskRepository).delete(task);
  }

  @Test
  void shouldNotDeleteTask() {
    // given
    String id = "task-id";
    when(taskRepository.findById(id)).thenReturn(null);

    // when
    Throwable thrown = catchThrowable(() -> objectUnderTest.deleteTask(id));

    // then
    assertThat(thrown).isInstanceOf(TaskNotFoundException.class);
  }
}
