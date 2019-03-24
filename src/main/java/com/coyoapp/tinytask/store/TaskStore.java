package com.coyoapp.tinytask.store;

import com.coyoapp.tinytask.dto.TinyTask;

import java.util.List;

public interface TaskStore {

  List<TinyTask> getAll();

  TinyTask removeTask(String tinyTaskName);

  TinyTask addTask(TinyTask tinyTask);

  TinyTask getTask(String taskName);
}
