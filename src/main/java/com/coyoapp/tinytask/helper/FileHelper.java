package com.coyoapp.tinytask.helper;

import com.coyoapp.tinytask.domain.File;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.FileResponse;
import lombok.RequiredArgsConstructor;
import ma.glasnost.orika.MapperFacade;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@RequiredArgsConstructor
public class FileHelper {

  private final MapperFacade mapperFacade;

  public File fileRequestToFile(MultipartFile multipartFile, Task attachedTask) {
    String fileName = StringUtils.cleanPath(Objects.requireNonNull(multipartFile.getOriginalFilename()));
    File file = new File();
    file.setName(fileName);
    file.setTask(attachedTask);
    try {
      file.setContent(multipartFile.getBytes());
    } catch (Exception ignored){

    }
    file.setType(multipartFile.getContentType());
    return file;
  }

  public FileResponse fileToResponse(File file) {
    return this.mapperFacade.map(file, FileResponse.class);
  }
}
