package com.coyoapp.tinytask.service;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface IFileStorageService {
	
	public String storeFile(MultipartFile file);
	
	public Resource loadFileAsResource(String fileName);

}
