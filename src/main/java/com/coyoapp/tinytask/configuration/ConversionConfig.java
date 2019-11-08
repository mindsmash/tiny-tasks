package com.coyoapp.tinytask.configuration;

import com.coyoapp.tinytask.converter.TaskRequestToTaskConverter;
import com.coyoapp.tinytask.converter.TaskToTaskResponseConverter;
import com.coyoapp.tinytask.converter.UserRequestToUserConverter;
import com.coyoapp.tinytask.converter.UserToUserResponseConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ConversionServiceFactoryBean;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;

import java.util.HashSet;
import java.util.Set;

@Configuration
public class ConversionConfig {
  private Set<Converter> getConverters(){
    Set<Converter> converters = new HashSet<Converter>();
    converters.add(new TaskRequestToTaskConverter());
    converters.add(new TaskToTaskResponseConverter());
    converters.add(new UserToUserResponseConverter());
    converters.add(new UserRequestToUserConverter());
    return converters;
  }

  @Bean
  public ConversionService conversionService(){
    ConversionServiceFactoryBean bean = new ConversionServiceFactoryBean();
    bean.setConverters(this.getConverters());
    bean.afterPropertiesSet();

    return bean.getObject();
  }
}
