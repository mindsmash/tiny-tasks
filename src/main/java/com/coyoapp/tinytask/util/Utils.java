package com.coyoapp.tinytask.util;

public class Utils {
  private final static String KEY = "Bar12345Bar12345";
  private static final String ALPHABET = "abcdefghijklmnopqrstuvwxyz";
  private static final int SHIFT = 3;

  public static String encrypt(String input) {
    // encrypt the text
    input = input.toLowerCase();
    String cipherText = "";
    for (int i = 0; i < input.length(); i++) {
      int charPosition = ALPHABET.indexOf(input.charAt(i));
      int keyVal = (SHIFT + charPosition) % 26;
      char replaceVal = ALPHABET.charAt(keyVal);
      cipherText += replaceVal;
    }
    return cipherText;
  }

  public static String decrypt(String input) {
    input = input.toLowerCase();
    String plainText = "";
    for (int i = 0; i < input.length(); i++) {
      int charPosition = ALPHABET.indexOf(input.charAt(i));
      int keyVal = (charPosition - SHIFT) % 26;
      if (keyVal < 0) {
        keyVal = ALPHABET.length() + keyVal;
      }
      char replaceVal = ALPHABET.charAt(keyVal);
      plainText += replaceVal;
    }
    return plainText;

  }
}
