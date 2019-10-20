package com.coyoapp.tinytask.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.Rule;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.quality.Strictness;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.TaskStatus;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.TaskRepository;

import ma.glasnost.orika.MapperFacade;

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
	public void shouldFindOpenTasks() {
		// given
		User user1 = mock(User.class);
		User user2 = mock(User.class);

		Task user1Task1 = mock(Task.class);
		when(user1Task1.getAssignee()).thenReturn(user1);
		Task user1Task2 = mock(Task.class);
		when(user1Task2.getAssignee()).thenReturn(user1);

		Task user2Task1 = mock(Task.class);
		when(user2Task1.getAssignee()).thenReturn(user2);
		List<Task> openTasks = new ArrayList<Task>(Arrays.asList(user1Task1, user1Task2, user2Task1));
		when(taskRepository.findAllByStatusAndDueDateIsNull(TaskStatus.OPEN)).thenReturn(openTasks);

		Task user2DueTodayTask = mock(Task.class);
		when(user2DueTodayTask.getAssignee()).thenReturn(user2);
		List<Task> dueTasks = new ArrayList<Task>(Arrays.asList(user2DueTodayTask));

		when(taskRepository.findAllByStatusAndDueDateBetween(Mockito.eq(TaskStatus.OPEN), Mockito.any(Instant.class),
				Mockito.any(Instant.class))).thenReturn(dueTasks);

		// when
		Map<User, List<Task>> openTasksPerUser = objectUnderTest.findOpenTasks();

		// then
		assertThat(openTasksPerUser).containsKey(user1);
		assertThat(openTasksPerUser).containsKeys(user2);
		assertThat(openTasksPerUser).hasSize(2);
		assertThat(openTasksPerUser.get(user1)).contains(user1Task1, user1Task2);
		assertThat(openTasksPerUser.get(user2)).contains(user2Task1, user2DueTodayTask);
	}
}
