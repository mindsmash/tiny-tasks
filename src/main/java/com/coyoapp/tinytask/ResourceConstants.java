package com.coyoapp.tinytask;

public class ResourceConstants {
  public static final String TINY_TASKS_V1 = "/v1/tiny-tasks/";

  //Everyday at 8:00 AM
  public static final String CRON_EVERYDAY_EXPRESSION = "0 0 8 * * *";

  //used only for testing
  public static final String CRON_EVERY_TWO_SECONDS_EXPRESSION = "2 * * * * *";

  public static final String EMAIL_SUBJECT = "Unfinished Tiny Tasks";
}
