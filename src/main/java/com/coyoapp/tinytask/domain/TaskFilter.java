package com.coyoapp.tinytask.domain;

import org.springframework.data.jpa.domain.Specification;

import static org.springframework.data.jpa.domain.Specification.where;

public class TaskFilter {

  public static Specification<Task> getNameFilter(String name) {
    return (root, query, cb) -> where(contains(name)).toPredicate(root, query, cb);
  }

  private static Specification<Task> contains(String value) {
    return (root, query, cb) ->  cb.like(cb.lower(root.get("name")), "%" + value.toLowerCase() + "%");
  }
}
