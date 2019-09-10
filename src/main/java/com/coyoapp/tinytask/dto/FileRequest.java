package com.coyoapp.tinytask.dto;

import javax.validation.constraints.NotEmpty;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileRequest {

  @NotEmpty
  private MultipartFile file;

  public MultipartFile getFile() {
    return this.file;
  }

}
