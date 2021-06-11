package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.File;
import com.coyoapp.tinytask.domain.Task;
import com.coyoapp.tinytask.dto.FileRequest;
import com.coyoapp.tinytask.dto.FileResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface FileService {

  FileResponse createFile(MultipartFile file, Task task) throws IOException;

  List<FileResponse> getFilesForTask(String taskId);

  void deleteFile(String fileId);

  List<FileResponse> getFiles(String taskId);
}
