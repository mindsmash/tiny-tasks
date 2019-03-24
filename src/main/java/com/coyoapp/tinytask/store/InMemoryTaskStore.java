package com.coyoapp.tinytask.store;

import com.coyoapp.tinytask.dto.TinyTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
@Slf4j
public final class InMemoryTaskStore implements TaskStore {

  private Map<String, TinyTask> tasks = new HashMap<>();

  /**
   * Adds task to the in memory task store.
   * @param tinyTask Task to be added/created
   * @return the added task
   */
  @Override
  public TinyTask addTask(TinyTask tinyTask) {
    checkNotNull(tinyTask, "Null task cannot be added to store");
    tasks.put(tinyTask.getName(), tinyTask);
    return tinyTask;
  }

  /**
   * Gets the task from the in memory task store.
   * @param taskName Name of the task to fetch
   * @return the task with the given taskName, if it exists
   */
  @Override
  public TinyTask getTask(String taskName) {
    checkNotNull(taskName, "Task name missing for fetching task");
    return tasks.get(taskName);
  }

  /**
   * Removes the task from the in-memory task store, if available.
   * @param tinyTaskName Name of the task to be removed.
   * @return the removed task, if it existed
   */
  @Override
  public TinyTask removeTask(String tinyTaskName) {
    checkNotNull(tinyTaskName, "Task name missing for deletion");
    return tasks.remove(tinyTaskName);
  }

  /**
   * Returns a list of all tasks from the store
   * @return the list of all tasks from the store
   */
  @Override
  public List<TinyTask> getAll() {
    return new ArrayList<>(tasks.values());
  }
}
