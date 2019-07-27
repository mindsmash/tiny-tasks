package com.coyoapp.tinytask.service;

import java.util.TimerTask;

public class  EmailScheduler extends TimerTask  {

	@Override
	  public void run() {
		AlertJobService.jobInstance.sendAlertToUser();
	  }



}
