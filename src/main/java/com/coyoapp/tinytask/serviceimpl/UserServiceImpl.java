package com.coyoapp.tinytask.serviceimpl;

import static java.util.stream.Collectors.toList;

import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.TaskResponse;
import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;
import com.coyoapp.tinytask.repository.TaskRepository;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.UserService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  private final MapperFacade mapperFacade;

  @Override
  @Transactional
  public User createUser(UserRequest userRequest) {
    log.debug("createUser(createUser={})", userRequest);
    User user = mapperFacade.map(userRequest, User.class);
    return userRepository.save(user);
  }

  @Override
  @Transactional(readOnly = true)
  public List<User> getUsers() {
    log.debug("getUsers()");
    return userRepository.findAll();
  }

  @Override
  @Transactional(readOnly = true)
  public List<User> getUsers(Integer page, Integer pageSize) {
    log.debug("getUsers({}, {})", page, pageSize);
    PageRequest pageRequest = PageRequest.of(page, pageSize);
    return userRepository.findAll(pageRequest).getContent();
  }
}
