package com.coyoapp.tinytask.spec;

import com.coyoapp.tinytask.domain.Task;
import org.springframework.data.jpa.domain.Specification;

import static org.springframework.data.jpa.domain.Specification.where;

public class TaskSpecification {

  private static final String WILDCARD = "%";

  public static Specification<Task> getFilter(String name) {
    return (root, query, cb) -> where(nameContains(name)).toPredicate(root, query, cb);
  }

  private static Specification<Task> nameContains(String name) {
    return attributeContains("name", name);
  }

  private static Specification<Task> attributeContains(String attribute, String value) {
    return (root, query, cb) -> {
      if(value == null) {
        return null;
      }

      return cb.like(
        cb.lower(root.get(attribute)),
        containsLowerCase(value)
      );
    };
  }

  private static String containsLowerCase(String searchField) {
    return WILDCARD + searchField.toLowerCase() + WILDCARD;
  }

}
