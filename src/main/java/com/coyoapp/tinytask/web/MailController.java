package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.service.DefaultEmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@Slf4j
@RequestMapping("/sendMail")
@RestController
@RequiredArgsConstructor
class MailController {

  private final DefaultEmailService defaultEmailService;

  @GetMapping
  public void sentMail() throws MessagingException {
    defaultEmailService.sendMailToMyselfButMime();
//    defaultEmailService.sendMailToMe();
//    return "Send email to myself";
  }

}
