package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Category;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.CategoryRequest;
import com.coyoapp.tinytask.dto.CategoryResponse;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.repository.CategoryRepository;
import com.coyoapp.tinytask.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultCategoryService implements CategoryService {

  private final CategoryRepository categoryRepository;
  private final MapperFacade mapperFacade;


  @Override
  public List<CategoryResponse> getCategories() {
    return categoryRepository.findAll().stream().map(this::transformToResponse).collect(toList());
  }

  @Override
  @Transactional
  public CategoryResponse createCategory(CategoryRequest categoryRequest) {
    log.debug("createCategory(createCategory={})", categoryRequest);
    Category category = mapperFacade.map(categoryRequest, Category.class);
    return transformToResponse(categoryRepository.save(category));
  }

  private CategoryResponse transformToResponse(Category category) {
    return mapperFacade.map(category, CategoryResponse.class);
  }

}
