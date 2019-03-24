package com.coyoapp.tinytask.store;

import com.coyoapp.tinytask.dto.TinyTask;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertThat;

public class InMemoryTaskStoreTest {

  private TaskStore taskStore;

  @Before
  public void setup() {
    taskStore = new InMemoryTaskStore();
    taskStore.addTask(new TinyTask("task1"));
    taskStore.addTask(new TinyTask("task2"));
  }

  @Test
  public void testAddTask() {
    TinyTask addedTask = taskStore.addTask(new TinyTask("new_task1"));
    assertThat(addedTask.getName(), is("new_task1"));
  }

  @Test
  public void testRemoveTask() {
    TinyTask removedTask = taskStore.removeTask("task2");
    assertThat(removedTask.getName(), is("task2"));
  }

  @Test
  public void testGetTask() {
    TinyTask fetchedTask = taskStore.getTask("task1");
    assertThat(fetchedTask.getName(), is("task1"));
  }

  @Test
  public void testGetAll() {
    List<TinyTask> tasks = taskStore.getAll();
    assertThat(tasks.size(), is(2));
  }
}
