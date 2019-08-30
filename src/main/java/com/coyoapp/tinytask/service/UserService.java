package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.UserDTO;
import com.coyoapp.tinytask.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository repository;

  @Transactional(readOnly = true)
  public List<User> getAllUsers() {
    return repository.findAll();
  }

  public User createUser(User user){
    return repository.save(user);
  }

  @Transactional
  public User updateUser(User user) {
    return repository.save(user);
  }
  @Transactional
  public void deleteUser(String userId) {
    repository.deleteById(userId);
  }

  @Transactional(readOnly = true)
  public Optional<User> getUserByEmail(String email){
    return repository.findByEmail(email);
  }

  @Transactional(readOnly = true)
  public Optional<User> getUser(String id){
    return repository.findById(id);
  }

}
