package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Users;
import com.coyoapp.tinytask.dto.ChangePassRequest;
import com.coyoapp.tinytask.dto.ChangePassResponse;
import com.coyoapp.tinytask.dto.RegisterRequest;
import com.coyoapp.tinytask.dto.RegisterResponse;
import com.coyoapp.tinytask.repository.UserRepository;
import com.coyoapp.tinytask.service.impl.UserServiceImpl;
import ma.glasnost.orika.MapperFacade;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.quality.Strictness;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;


public class UserServiceImplTest {

  @Rule
  public MockitoRule mockitoRule = MockitoJUnit.rule().strictness(Strictness.STRICT_STUBS);

  @Mock
  private UserRepository userRepository;

  @Mock
  private MapperFacade mapperFacade;

  @Mock
  private MapperFacade mapperFacaded;

  @Mock
  private RoleService roleService;
  @Mock
  private UserRepository repository;
  @Mock
  private PasswordEncoder passwordEncoder;

  private UserServiceImpl userService;

  @Before
  public void setUp() {
    userService = new UserServiceImpl(repository, roleService, passwordEncoder, mapperFacaded);
  }

  @Test
  public void shouldFindByUserName() {
    Users user = mock(Users.class);
    when(userRepository.findByUsername("coyo")).thenReturn(user);


    Users actual = userService.findByUserName("coyo");
    assertThat(actual).isEqualTo(user);
  }

  @Test
  public void shouldSaveUser() throws Exception {
    // given
    RegisterRequest regRequest = mock(RegisterRequest.class);
    Users user = mock(Users.class);
    Users savedUser = mock(Users.class);
    RegisterResponse regResponse = mock(RegisterResponse.class);
    doReturn(user).when(mapperFacade).map(regRequest, Users.class);
    when(userRepository.save(user)).thenReturn(savedUser);
    doReturn(regResponse).when(mapperFacade).map(savedUser, RegisterResponse.class);

    // when
    RegisterResponse actualResponse = userService.saveUser(regRequest);

    System.out.println("Actual : " + actualResponse);
    System.out.println("Reg: " + regResponse);
    // then
    assertThat(actualResponse).isEqualTo(regResponse);
  }

  @Test
  public void shouldChangePass() throws Exception {
    String currentPassword = "test1234";
    String newPassword = "test1234";
    String confirmPassword = "test1234";
    Integer id = 1;
    String username = "test-username";

    ChangePassRequest passRequest = ChangePassRequest.builder().currentPassword(currentPassword).newPassword(newPassword).confirmPassword(confirmPassword).build();
    ChangePassResponse passResponse = ChangePassResponse.builder().id(id).username(username).build();
    Users user = mock(Users.class);
    Users savedUser = mock(Users.class);
    doReturn(user).when(mapperFacade).map(passRequest, Users.class);
    when(userRepository.save(user)).thenReturn(savedUser);
    doReturn(passResponse).when(mapperFacade).map(savedUser, RegisterResponse.class);

    // when
    ChangePassResponse actualResponse = userService.changePass(passRequest, "coyo");

    System.out.println("Actual : " + actualResponse);
    System.out.println("Reg: " + passResponse);
    // then
    assertThat(actualResponse).isEqualTo(passResponse);
  }
}
