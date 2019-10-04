package com.coyoapp.tinytask.service;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.coyoapp.tinytask.exception.ImageTaskNotFoundException;
import com.coyoapp.tinytask.exception.StorageException;

@Service
public class FileStorageService implements IFileStorageService {

	@Value("${storage.root-folder}")
	private String storageRootFolder;

	@Value("${storage.image-folder}")
	private String imageFolder;

	
	public String storeFile(MultipartFile file) {

		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {

			if (fileName.contains("..")) {
				throw new StorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			Path directoryPath = Paths.get(storageRootFolder, imageFolder);
			Path filePath = directoryPath.resolve(fileName).normalize();

			Files.createDirectories(directoryPath);
			file.transferTo(filePath.toFile());

			return fileName;

		} catch (IOException ex) {
			throw new StorageException(String.format("Error, could not store file %s. Pleasy try again!", fileName),
					ex);
		}
	}

	public Resource loadFileAsResource(String fileName) {
		try {			
			Path directoryPath = Paths.get(storageRootFolder, imageFolder);			
			Path filePath = directoryPath.resolve(fileName).normalize();
			
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new ImageTaskNotFoundException("File not found " + fileName);
			}
		} catch (MalformedURLException ex) {
			throw new ImageTaskNotFoundException("File not found " + fileName, ex);
		}
	}

}
