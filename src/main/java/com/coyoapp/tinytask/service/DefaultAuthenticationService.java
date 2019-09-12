package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;
import com.coyoapp.tinytask.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;

import org.springframework.data.domain.Example;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import static java.util.stream.Collectors.toList;

@Slf4j
@Component
@RequiredArgsConstructor
public class DefaultAuthenticationService implements AuthenticationService {

    private final UserRepository userRepository;
    private final MapperFacade mapperFacade;

    @Override
    @Transactional
    public UserResponse login(UserRequest userRequest) {
        log.debug("login(login={})", userRequest);
        return transformToResponse(
                userRepository.findByUsernameAndPwd(userRequest.getUsername(), userRequest.getPwd()));
    }

    @Override
    @Transactional
    public UserResponse logout() {
        log.debug("logout()");
        return null;
    }

    private UserResponse transformToResponse(User user) {
        return mapperFacade.map(user, UserResponse.class);
    }

}