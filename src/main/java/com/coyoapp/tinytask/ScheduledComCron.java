
package com.coyoapp.tinytask;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.email.EmailSender;
import com.coyoapp.tinytask.service.UserService;

@Component
public class ScheduledComCron {

	@Autowired
	UserService userService;

	@Scheduled(cron = "0 0/1 * * * *")
	public void execute() {
		List<User> users = userService.getAllUsers();
		for (User user : users) {
			sendTaskByEmail(user);
		}

	}

	private void sendTaskByEmail(User user) {
		new Thread( new EmailSender(user)).start();
	}

}