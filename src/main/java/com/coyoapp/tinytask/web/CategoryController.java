package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.Category;
import com.coyoapp.tinytask.dto.CategoryRequest;
import com.coyoapp.tinytask.dto.CategoryResponse;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

  private final CategoryService categoryService;

  @GetMapping
  public List<CategoryResponse> listAllCategories(Pageable pageable) {
      return categoryService.getCategories();
  }

  @PostMapping
  public CategoryResponse createCategory(@RequestBody @Valid CategoryRequest categoryRequest) {
    log.debug("createTask(createCategory={})", categoryRequest);
    return categoryService.createCategory(categoryRequest);
  }

  @DeleteMapping("/{categoryId}")
  public void deleteCategory(@PathVariable String categoryId) {
    log.debug("deleteCategory(deleteCategory={})", categoryId);
    categoryService.deleteCategory(categoryId);
  }
}
