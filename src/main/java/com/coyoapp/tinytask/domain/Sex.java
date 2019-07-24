package com.coyoapp.tinytask.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 06:48
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Sex {
  MALE, FEMALE;

  private static Map<String, Sex> sexHashMap = new HashMap<String, Sex>(2);

  static {
    sexHashMap.put("MALE", MALE);
    sexHashMap.put("FEMALE", FEMALE);

  }

  @JsonCreator
  public static Sex forValue(String value) {
    return sexHashMap.get(StringUtils.capitalize(value));
  }


  @JsonValue
  public String toValue() {
    for (Map.Entry<String, Sex> entry : sexHashMap.entrySet()) {
      if (entry.getValue() == this)
        return entry.getKey();
    }

    return null;
  }

}
