package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.ThrowableAssert.catchThrowable;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DefaultTaskServiceTest {

  @Mock
  private TaskRepository taskRepository;

  @Mock
  private ModelMapper mapper;

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

  @Test
  void testGetTasksWithinDays() {
    // Given
    int days = 5;
    LocalDate today = LocalDate.now();
    LocalDate futureDate = today.plusDays(days);

    Task task1 = new Task();
    task1.setId("task-id");
    task1.setName("Task 1");
    task1.setDueDate(today.plusDays(1));
    List<Task> tasks = List.of(task1);

    when(taskRepository.findByDueDateBetween(today, futureDate)).thenReturn(tasks);
    when(objectUnderTest.transformToResponse(task1)).thenReturn(new TaskResponse("task-id", "Task 1", today.plusDays(1)));

    // When
    List<TaskResponse> result = objectUnderTest.getTasksWithinDays(days);

    // Then
    assertEquals(1, result.size());
    assertEquals("Task 1", result.get(0).getName());

    verify(taskRepository, times(1)).findByDueDateBetween(today, futureDate);
  }

  @Test
  void shouldUpdateTask() {
    // Given
    String taskId = "task-id";
    LocalDate dueDate = LocalDate.now().plusDays(5);

    // When
    objectUnderTest.updateTask(taskId, dueDate);

    // Then
    verify(taskRepository, times(1)).updateDueDateById(taskId, dueDate);
  }
}
