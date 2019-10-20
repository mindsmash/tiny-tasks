package com.coyoapp.tinytask.service;

import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(rollbackFor = Throwable.class)
@RequiredArgsConstructor
public class DefaultMailService implements MailService {

	private final JavaMailSender sender;

	private static final String SEND_FROM = "notification@coyoapp.com";
	private static final String SEND_SUBJECT = "Open Tasks Notification";
	private static final String TEXT_TOP = "<html><head></head><body>Open tasks: <ul>";
	private static final String TEXT_BOTTOM = "</ul></body></html>";

	@Override
	public void sendMessageWithOpenTasks(User user, List<Task> openTasks) {
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		try {
			helper.setTo(user.getEmail());

			helper.setFrom(SEND_FROM);
			helper.setSubject(SEND_SUBJECT);

			StringBuilder builder = new StringBuilder();
			builder.append(TEXT_TOP);
			openTasks.forEach(task -> builder.append("<li>").append(task.getName()).append("</li>"));
			builder.append(TEXT_BOTTOM);
			helper.setText(builder.toString(), true);

			sender.send(message);
		} catch (MessagingException e) {
			log.error("Message can't be send: ", e.getMessage());
		}
	}

}
