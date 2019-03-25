package com.coyoapp.tinytask.Repository;

import com.coyoapp.tinytask.Entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Integer> {

}
