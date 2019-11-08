package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.util.Email;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

public interface EmailService {

  void sendEmail(Email email) throws MessagingException, UnsupportedEncodingException;
}
