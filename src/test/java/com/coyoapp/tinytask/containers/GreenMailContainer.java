package com.coyoapp.tinytask.containers;

import org.testcontainers.containers.GenericContainer;
import org.testcontainers.utility.DockerImageName;

public class GreenMailContainer extends GenericContainer<GreenMailContainer> {

  public static final DockerImageName IMAGE_VERSION = DockerImageName.parse("greenmail/standalone:1.6.4");
  public static GenericContainer container;

  public GreenMailContainer() {
    super(IMAGE_VERSION);
  }

  public static GenericContainer getInstance() {
    if (container == null) {
      container = new GreenMailContainer()
        .withExposedPorts(3025);
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
