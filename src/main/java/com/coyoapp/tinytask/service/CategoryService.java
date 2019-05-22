package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.CategoryRequest;
import com.coyoapp.tinytask.dto.CategoryResponse;

import java.util.List;

public interface CategoryService {

  List<CategoryResponse> getCategories();

  CategoryResponse createCategory(CategoryRequest categoryRequest);

  void deleteCategory(String categoryId);
}
