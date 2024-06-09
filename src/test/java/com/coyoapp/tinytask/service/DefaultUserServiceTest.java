package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.user.UserResponse;
import com.coyoapp.tinytask.dto.user.UserRequest;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.user.DefaultUserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DefaultUserServiceTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private ModelMapper mapper;

  @InjectMocks
  private DefaultUserService objectUnderTest;

  @Test
  void shouldCreateUser() {
    UserRequest userRequest = mock(UserRequest.class);
    User user = mock(User.class);
    when(user.getPassword()).thenReturn("somePassword");

    User savedUser = mock(User.class);
    doReturn(user).when(mapper).map(userRequest, User.class);
    when(userRepository.save(user)).thenReturn(savedUser);

    UserResponse userResponse = mock(UserResponse.class);
    doReturn(userResponse).when(mapper).map(savedUser, UserResponse.class);

    UserResponse actualResponse = objectUnderTest.createUser(userRequest);
    assertThat(actualResponse).isEqualTo(userResponse);
  }

}
