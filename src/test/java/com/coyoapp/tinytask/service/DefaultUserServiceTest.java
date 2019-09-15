package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.User;
import com.coyoapp.tinytask.dto.UserDTO;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.impl.DefaultUserService;
import ma.glasnost.orika.MapperFacade;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.quality.Strictness;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class DefaultUserServiceTest {

  @Rule
  public MockitoRule mockitoRule = MockitoJUnit.rule().strictness(Strictness.STRICT_STUBS);

  @Mock
  private UserRepository userRepository;

  @Mock
  private MapperFacade mapperFacade;

  @InjectMocks
  private DefaultUserService objectUnderTest;

  @Test
  public void shouldCreateUser() {

    User user = mock(User.class);
    User savedUser = mock(User.class);
    UserDTO userDTO = mock(UserDTO.class);
    UserDTO createdUser = mock(UserDTO.class);

    when(userRepository.save(user)).thenReturn(savedUser);
    doReturn(user).when(mapperFacade).map(userDTO, User.class);
    doReturn(createdUser).when(mapperFacade).map(savedUser, UserDTO.class);

    UserDTO returnedUser = objectUnderTest.create(userDTO);

    assertThat(returnedUser).isEqualTo(createdUser);

  }

  @Test
  public void shouldGetUsers() {

    User user = mock(User.class);
    UserDTO userDTO = mock(UserDTO.class);

    when(userRepository.findAll()).thenReturn(Arrays.asList(user));
    when(mapperFacade.map(user, UserDTO.class)).thenReturn(userDTO);

    List<UserDTO> allUsers = objectUnderTest.getUsers();

    assertThat(allUsers).contains(userDTO);

  }


}
