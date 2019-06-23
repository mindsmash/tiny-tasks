package com.coyoapp.tinytask.util;

import java.util.Base64;

public class Utils {

  public static String encrypt(String input) {
    String b64encoded = Base64.getEncoder().encodeToString(input.getBytes());

    // Reverse the string
    String reverse = new StringBuffer(b64encoded).reverse().toString();

    StringBuilder tmp = new StringBuilder();
    final int OFFSET = 4;
    for (int i = 0; i < reverse.length(); i++) {
      tmp.append((char) (reverse.charAt(i) + OFFSET));
    }
    return tmp.toString();
  }

  public static String decrypt(String input) {
    StringBuilder tmp = new StringBuilder();
    final int OFFSET = 4;
    for (int i = 0; i < input.length(); i++) {
      tmp.append((char) (input.charAt(i) - OFFSET));
    }

    String reversed = new StringBuffer(tmp.toString()).reverse().toString();
    return new String(Base64.getDecoder().decode(reversed));
  }
}
