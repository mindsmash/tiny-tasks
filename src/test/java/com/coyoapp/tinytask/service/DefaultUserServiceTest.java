package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.UserRequest;
import com.coyoapp.tinytask.dto.UserResponse;
import com.coyoapp.tinytask.exception.UserNotFoundException;
import com.coyoapp.tinytask.repository.UserRepository;
import ma.glasnost.orika.MapperFacade;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.ThrowableAssert.catchThrowable;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DefaultUserServiceTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private MapperFacade mapperFacade;

  @InjectMocks
  private DefaultUserService objectUnderTest;

  @Test
  void shouldCreateUser() {
    // given
    UserRequest userRequest = mock(UserRequest.class);
    User user = mock(User.class);
    User savedUser = mock(User.class);
    UserResponse userResponse = mock(UserResponse.class);
    doReturn(user).when(mapperFacade).map(userRequest, User.class);
    when(userRepository.save(user)).thenReturn(savedUser);
    doReturn(userResponse).when(mapperFacade).map(savedUser, UserResponse.class);

    // when
    UserResponse actualResponse = objectUnderTest.createUser(userRequest);

    // then
    assertThat(actualResponse).isEqualTo(userResponse);
  }

  @Test
  void shouldGetUsers() {
    // given
    User user = mock(User.class);
    UserResponse userResponse = mock(UserResponse.class);
    when(userRepository.findAll()).thenReturn(List.of(user));
    when(mapperFacade.map(user, UserResponse.class)).thenReturn(userResponse);

    // when
    List<UserResponse> actualUsers = objectUnderTest.getUsers();

    // then
    assertThat(actualUsers).contains(userResponse);
  }

  @Test
  void shouldDeleteUser() {
    // given
    String id = "user-id";
    User user = mock(User.class);
    when(userRepository.findById(id)).thenReturn(Optional.of(user));

    // when
    objectUnderTest.deleteUser(id);

    // then
    verify(userRepository).delete(user);
  }

  @Test
  void shouldNotDeleteUser() {
    // given
    String id = "user-id";
    when(userRepository.findById(id)).thenReturn(Optional.empty());

    // when
    Throwable thrown = catchThrowable(() -> objectUnderTest.deleteUser(id));

    // then
    assertThat(thrown).isInstanceOf(UserNotFoundException.class);
  }
}
