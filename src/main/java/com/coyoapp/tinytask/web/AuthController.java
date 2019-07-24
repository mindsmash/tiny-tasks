package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.Role;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.ErrorResponse;
import com.coyoapp.tinytask.exception.EntityNotFoundException;
import com.coyoapp.tinytask.exception.InvalidRequestException;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.security.JWTProvider;
import com.coyoapp.tinytask.service.EncryptService;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 11:42
 */
@RestController
@RequestMapping(path = "/api/v1/auth")
public class AuthController {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private JWTProvider jwtProvider;
  @Autowired
  private AuthenticationManager authenticationManager;
  @Autowired
  private EncryptService encryptService;

  private static final Logger logger = LoggerFactory.getLogger(AuthController.class);


  @PostMapping(path = "/signin")
  public ResponseEntity<?> authenticate(
    @Valid @RequestBody LoginRequest loginRequest,
    BindingResult bindingResult) throws EntityNotFoundException {
    if (bindingResult.hasErrors()) {
      throw new InvalidRequestException(bindingResult);
    }
    String userNameFromRequest = loginRequest.getUsername();
    String passwordFromRequest = loginRequest.getPassword();
    User optionalUser =
      userRepository.
        findByEmail(
          userNameFromRequest)
        .orElseThrow(() -> new EntityNotFoundException("user not found"));
    String encodedPasswordFromDb = new String(optionalUser.getPassword());

    if (encryptService.isPasswordEqual(passwordFromRequest, encodedPasswordFromDb)) {
      Authentication authentMan = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
        userNameFromRequest,
        passwordFromRequest
      ));

      String token = jwtProvider.generateToken(authentMan);

      LoginResponse loginResponse = new LoginResponse(token);
      loginResponse.setId(String.valueOf(optionalUser.getId()));
      loginResponse.setFirstName(optionalUser.getFirstName());
      loginResponse.setSurName(optionalUser.getSurName());
      List<Role> roleList = new ArrayList<>(optionalUser.getRoleList());
      loginResponse.setRoleName(roleList.get(0).getRoleName().toValue());

      return ResponseEntity.ok(loginResponse);
    }

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Your password is incorrect"));
  }
}


@Data
@NoArgsConstructor
class LoginRequest {
  @NotBlank(message = "Email can't be empty")
  @Email(message = "should be an email")
  private String username;
  //@Max(message = "Maximum password length cannot be more than 20 characters.", value = 20)
  @NotBlank(message = "Password can't be empty")
  private String password;


  public LoginRequest(
    @NotBlank(message = "Email can't be empty") @Email(message = "should be an email") String username,
    @NotBlank(message = "Password can't be empty") String password) {
    this.username = username;
    this.password = password;
  }
}


@Data
class LoginResponse {
  private String id;
  private String token;
  private String firstName;
  private String roleName;
  private String surName;


  public LoginResponse(String token) {
    this.token = token;
  }
}
