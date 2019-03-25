package com.coyoapp.tinytask.Controller;

import com.coyoapp.tinytask.Entity.Todo;
import com.coyoapp.tinytask.Service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/api")
@RestController
public class RestApiController {

  @Autowired
  private TodoService todoService;

  @GetMapping
  public List<Todo> getIndexContent() {
    return todoService.getAllTodos();
  }

  @PostMapping
  public Todo createTodo(@RequestBody Todo todo) {
    return todoService.createTodo(todo);
  }

}
