package com.coyoapp.tinytask.repository;

import com.coyoapp.tinytask.domain.User;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

public class UserRepositoryTest {

  @Autowired
  TestEntityManager testEntityManager;

  @Test
  public void should_return_user_entity_for_given_user() {
    givenUser("123", "testUser", "hunter2");
  }

  private User givenUser(String id, String username, String password) {
    return testEntityManager.persistAndFlush(new User(id, username, password));
  }
}
