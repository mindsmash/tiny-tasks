package com.coyoapp.tinytask.email;

import java.net.MalformedURLException;

import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;

public class EmailSender implements Runnable {

	private User user;

	public EmailSender(User user) {
		this.user = user;
	}

	public void enviarEmail() throws MalformedURLException, EmailException {
		// Create the email message
		HtmlEmail email = new HtmlEmail();
		email.setHostName("smtp.googlemail.com");
		email.setSmtpPort(465);
		email.setSSLOnConnect(true);
		email.addTo(user.getEmail(), "Dear " + user.getEmail());
		email.setFrom("empregosaqui.com.br@gmail.com", "Empregos Aqui");
		email.setSubject("Achamos uma vaga para você...");
		email.setAuthentication("empregosaqui.com.br@gmail.com", "mestrefox456");

		email.setHtmlMsg("<b> Dear User, <br /> See your taks on tiny task</b> < br/> <table> " + getTaskForEmail()
				+ "</table> ");
		email.send();
		System.out.println("email enviado -> " + this.user.getEmail());

	}

	private String getTaskForEmail() {
		StringBuilder builder = new StringBuilder();
		for (Task task : user.getTaks()) {
			builder.append("<tr><td> " + task.getName() + "</td></tr>");
		}

		return builder.toString();
	}

	@Override
	public void run() {
		try {
			enviarEmail();
		} catch (MalformedURLException | EmailException e) {
			throw new RuntimeException(e);
		}
	}
}
