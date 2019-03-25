package com.coyoapp.tinytask.Service;


import com.coyoapp.tinytask.Entity.Todo;
import com.coyoapp.tinytask.Repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class TodoService {

  private List<Todo> todos;

  @Autowired
  private TodoRepository todoRepository;

  public TodoService() {
    todos = new ArrayList<Todo>();
  }

  public List<Todo> getAllTodos() {
    return this.todoRepository.findAll();
  }

  public Todo createTodo(Todo todo) {
    return this.todoRepository.save(todo);
  }

}
