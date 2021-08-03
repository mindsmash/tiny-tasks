package com.coyoapp.tinytask.containers;

import org.testcontainers.containers.PostgreSQLContainer;


public class PostgresTestContainer extends PostgreSQLContainer<PostgresTestContainer> {

  public static final String IMAGE_VERSION = "postgres:13.1-alpine";
  public static final String DATABASE_NAME = "test";
  public static PostgreSQLContainer container;

  public PostgresTestContainer() {
    super(IMAGE_VERSION);
  }

  public static PostgreSQLContainer getInstance() {
    if (container == null) {
      container = new PostgresTestContainer().withDatabaseName(DATABASE_NAME)
        .withUsername("awesome-test-user")
        .withPassword("awesomePassword");
    }
    return container;
  }

  @Override
  public void start() {
    super.start();
  }

  @Override
  public void stop() {
  }

}
