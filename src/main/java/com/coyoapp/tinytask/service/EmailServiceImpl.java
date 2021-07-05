package com.coyoapp.tinytask.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    // Connect to JavaMail library
    // @Autowire
    private JavaMailSender emailSender;

    // Create and send E-Mail in text format
    public void sendSimpleMessage(String to, String subject, String text) {

        try {
            // Compose E-Mail
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("test@test.de");
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            // Send E-Mail
            emailSender.send(message);

        } catch (MailException exception) {
            exception.printStackTrace();
        }
    }
}
