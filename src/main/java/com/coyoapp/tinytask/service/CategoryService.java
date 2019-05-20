package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Category;
import com.coyoapp.tinytask.dto.CategoryRequest;
import com.coyoapp.tinytask.dto.CategoryResponse;
import com.coyoapp.tinytask.dto.TaskRequest;
import com.coyoapp.tinytask.dto.TaskResponse;

import java.util.List;

public interface CategoryService {

  List<CategoryResponse> getCategories();

  CategoryResponse createCategory(CategoryRequest categoryRequest);
}
