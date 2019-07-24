package com.coyoapp.tinytask.domain;

import com.coyoapp.tinytask.util.RoleNameUtil;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 06:51
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum RoleName {
  ROLE_SUPER_ADMIN,
  ROLE_USER;

  private static Map<String, RoleName> roleHashMap = new HashMap<String, RoleName>(0);

  static {
    roleHashMap.put(RoleNameUtil.ROLE_SUPER_ADMIN, ROLE_SUPER_ADMIN);
    roleHashMap.put(RoleNameUtil.ROLE_USER, ROLE_USER);


  }

  public static String getFriendlyRoleName(RoleName roleName) throws Exception {
    String friendlyRoleName;
    switch (roleName) {
      case ROLE_SUPER_ADMIN:
        friendlyRoleName = "Super Administrator";
        break;
      case ROLE_USER:
        friendlyRoleName = "User";
        break;
      default:
        throw new Exception("role name not known");
    }

    return friendlyRoleName;
  }


  @JsonCreator
  public static RoleName forValue(String value) {
    return roleHashMap.get(StringUtils.capitalize(value));
  }


  @JsonValue
  public String toValue() {
    for (Map.Entry<String, RoleName> entry : roleHashMap.entrySet()) {
      if (entry.getValue() == this)
        return entry.getKey();
    }

    return null;
  }
}
