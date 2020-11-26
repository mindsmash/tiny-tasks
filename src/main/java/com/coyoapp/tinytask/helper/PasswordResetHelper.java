package com.coyoapp.tinytask.helper;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PasswordResetHelper {
  public String createPassword() {
    return "reset-" + UUID.randomUUID().toString();
  }
}
