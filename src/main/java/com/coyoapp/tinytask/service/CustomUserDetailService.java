package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 09:12
 */
@Service
public class CustomUserDetailService implements UserDetailsService {

  private final UserRepository userRepository;


  public CustomUserDetailService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return createUserDetailsFromUserEntity(userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("userid not found")));
  }


  private UserDetails createUserDetailsFromUserEntity(User user) {
    return UserPrincipal.createUserPrincipalFromUserEntity(user);

  }
}
