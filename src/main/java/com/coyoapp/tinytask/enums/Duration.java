package com.coyoapp.tinytask.enums;

public enum Duration {
  EVERY_24H(1),
  EVERY_48H(2),
  EVERY_72H(3),
  ONCE_A_WEEK(7);

  private final int day;

  Duration(int day) {
    this.day = day;
  }

  public long getDurationInDay() {
    return day;
  }
}
