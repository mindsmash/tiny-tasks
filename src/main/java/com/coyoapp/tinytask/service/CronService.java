package com.coyoapp.tinytask.service;

import java.util.List;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Transactional(rollbackFor = Throwable.class)
@RequiredArgsConstructor
public class CronService {

	private final DefaultMailService mailService;
	private final DefaultTaskService taskService;

	@Scheduled(cron = "0 0 7 * * * ") // every day at 7am
	public void sendEmails() {
		Map<User, List<Task>> openTasks = taskService.findOpenTasks();
		openTasks.entrySet().forEach(u -> mailService.sendMessageWithOpenTasks(u.getKey(), u.getValue()));
	}

}