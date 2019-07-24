package com.coyoapp.tinytask.service;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 11:45
 */
public interface EncryptService {
  /**
   * Encrypt password
   *
   * @param unencryptedPassword
   * @return Encrypted password {@link String}
   */
  String encrypt(String unencryptedPassword);

  /**
   * Check if 2 passwords are same.
   *
   * @param rawPassword
   * @param encryptedPassword
   * @return
   */
  boolean isPasswordEqual(String rawPassword, String encryptedPassword);
}
