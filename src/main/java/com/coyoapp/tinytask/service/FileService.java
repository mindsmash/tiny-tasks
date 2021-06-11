package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.dto.FileRequest;
import com.coyoapp.tinytask.dto.FileResponse;
import com.coyoapp.tinytask.dto.TaskResponse;

import java.util.List;

public interface FileService {

  FileResponse createFile(FileRequest fileRequest);

  List<FileResponse> getFilesForTask(String taskId);

  void deleteFile(String fileId);

  List<FileResponse> getFiles();
}
