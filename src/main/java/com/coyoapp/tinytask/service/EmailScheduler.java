package com.coyoapp.tinytask.service;

import java.util.TimerTask;

public class EmailScheduler extends TimerTask {

  /**
   * The action to be performed by this timer task.
   */
  @Override
  public void run() {
    AlertSender.alertSenderInstance.sendAlerts();
  }


}
