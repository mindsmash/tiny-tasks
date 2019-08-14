package com.coyoapp.tinytask.configuration;

import ma.glasnost.orika.MapperFacade;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.converter.BidirectionalConverter;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import ma.glasnost.orika.metadata.Type;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Configuration
public class OrikaMapperConfig {

  private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");

  @Bean
  public MapperFacade mapperFacade() {
    DefaultMapperFactory mapperFactory = new DefaultMapperFactory.Builder().build();
    mapperFactory.getConverterFactory().registerConverter(new BidirectionalConverter<String, LocalDate>() {
      @Override
      public LocalDate convertTo(String date, Type<LocalDate> destinationType, MappingContext mappingContext) {
        return LocalDate.parse(date, formatter);
      }

      @Override
      public String convertFrom(LocalDate date, Type<String> destinationType, MappingContext mappingContext) {
        return date.format(formatter);
      }
    });
    return mapperFactory.getMapperFacade();
  }
}
