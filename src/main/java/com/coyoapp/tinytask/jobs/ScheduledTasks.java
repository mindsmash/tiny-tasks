package com.coyoapp.tinytask.jobs;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import com.coyoapp.tinytask.service.CreateMessageService;
import com.coyoapp.tinytask.service.EmailServiceImpl;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ScheduledTasks {

	// Log for debugging purposes
	private static final Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);
	private static final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

	// Create a new message
	@Autowired
	private CreateMessageService createMessage;

	// Create instance of E-Mail Send Service
	@Autowired
	private EmailServiceImpl mail;

	// Run cron job to send E-Mail every day at 6am.
	@Scheduled(cron = "0 0 6 * * ?")
	public void scheduleOpenTaskEmail() {

		// Logger for debugging
		logger.info("Email Cron Task :: Execution Time - {}", dateTimeFormatter.format(LocalDateTime.now()));
		logger.info(createMessage.getContent());

		// Send E-Mail with content
		mail.sendSimpleMessage("example@test.de", "Your open tasks", createMessage.getContent());

	}

}