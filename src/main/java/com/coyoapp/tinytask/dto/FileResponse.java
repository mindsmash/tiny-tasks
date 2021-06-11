package com.coyoapp.tinytask.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FileResponse {

  private String id;
  private String name;
  private MultipartFile content;
  private String type;
}
