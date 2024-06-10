package com.coyoapp.tinytask;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

@SpringBootTest
@ContextConfiguration(classes = SecurityConfigTest.class)
public class TinyTaskApplicationTest {

  @Test
  void contextLoads() {
  }

}
