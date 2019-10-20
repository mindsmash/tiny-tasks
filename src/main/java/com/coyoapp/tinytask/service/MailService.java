package com.coyoapp.tinytask.service;

import java.util.List;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;

public interface MailService {
	void sendMessageWithOpenTasks(User user, List<Task> openTasks);
}
