package com.coyoapp.tinytask.config;

import com.coyoapp.tinytask.containers.GreenMailContainer;
import com.coyoapp.tinytask.containers.PostgresTestContainer;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
public class ContainerEnvironment {

  @Container
  public static PostgreSQLContainer postgreSQLContainer = PostgresTestContainer.getInstance();

  @Container
  public static GenericContainer greenMailContainer = GreenMailContainer.getInstance();

  @DynamicPropertySource
  static void properties(DynamicPropertyRegistry registry) {
    registry.add("spring.datasource.url", postgreSQLContainer::getJdbcUrl);
    registry.add("spring.datasource.password", postgreSQLContainer::getPassword);
    registry.add("spring.datasource.username", postgreSQLContainer::getUsername);
    registry.add("spring.mail.host", greenMailContainer::getHost);
    registry.add("spring.mail.port", greenMailContainer::getFirstMappedPort);
  }

}
