package com.coyoapp.tinytask.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 11:45
 */
@Service
public class DefaultEncryptionService implements EncryptService {
  @Override
  public String encrypt(String password) {
    return new BCryptPasswordEncoder(12).encode(password);
  }


  @Override
  public boolean isPasswordEqual(String rawPassword, String encryptedPassword) {
    return new BCryptPasswordEncoder(12).matches(rawPassword, encryptedPassword);
  }
}

