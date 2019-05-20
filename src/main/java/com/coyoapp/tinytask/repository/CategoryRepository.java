package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.Category;
import com.coyoapp.tinytask.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, String> {

  List<Category> findAll();

}
