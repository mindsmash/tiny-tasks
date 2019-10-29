package com.coyoapp.tinytask.domain;

import org.springframework.data.jpa.domain.Specification;

import static java.lang.String.format;
import static org.springframework.data.jpa.domain.Specification.where;

public class TaskFilter {

  private static final String BASE_QUERY = "%%s%";

  public static Specification<Task> getNameFilter(String name) {
    return (root, query, cb) -> where(contains(name)).toPredicate(root, query, cb);
  }

  private static Specification<Task> contains(String value) {
    return (root, query, cb) ->  cb.like(cb.lower(root.get("name")), format(BASE_QUERY, value.toLowerCase()));
  }
}
