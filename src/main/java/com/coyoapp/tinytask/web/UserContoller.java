package com.coyoapp.tinytask.web;


import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserContoller {

  @Autowired
  private UserService userService;

  @PostMapping("login")
  public String login(@RequestBody Map<String, String> json) throws ServletException {
    if (json.get("username") == null || json.get("password") == null) {
      throw new ServletException("please fill in username and password");
    }
    String userName = json.get("username");
    String password = json.get("password");

    User user = userService.findByUserName(userName);

    if (user == null)
      throw new ServletException("User name is not found");

    String pwd = user.getPassword();
    if (!password.equals(pwd))
      throw new ServletException("Invalid login, please check your name or password");

    return Jwts.builder().setSubject(userName).claim("roles", "user")
               .setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256, "secretKey").compact();


  }

  @PostMapping("/register")
  public User registerUser(@RequestBody User user) {
      return userService.save(user);
  }
}
