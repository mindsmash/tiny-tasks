package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.dto.UsersRequest;
import com.coyoapp.tinytask.dto.UsersResponse;
import com.coyoapp.tinytask.repository.UsersRepository;
import ma.glasnost.orika.MapperFacade;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DefaultUsersServiceTest {


  @Mock
  private UsersRepository usersRepository;

  @Mock
  private MapperFacade mapperFacade;

  @InjectMocks
  private DefaultUsersService objectUnderTest;

  @Test
  void shouldCreateUser() {
    // given
    UsersRequest userRequest = mock(UsersRequest.class);
    Users user = mock(Users.class);
    Users savedUser = mock(Users.class);
    UsersResponse userResponse = mock(UsersResponse.class);
    doReturn(user).when(mapperFacade).map(userRequest, Users.class);
    when(usersRepository.save(user)).thenReturn(savedUser);
    doReturn(userResponse).when(mapperFacade).map(savedUser, UsersResponse.class);

    // when
    UsersResponse actualResponse = objectUnderTest.createUser(userRequest);

    // then
    assertThat(actualResponse).isEqualTo(userResponse);
  }
}
