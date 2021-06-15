package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.File;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.FileResponse;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

  FileResponse createFile(MultipartFile file, Task task);

  void deleteFile(String fileId);

  File getFile(String fileId);
}
