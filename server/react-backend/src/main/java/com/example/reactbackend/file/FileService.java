package com.example.reactbackend.file;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    public void store(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType();
        byte[] data = file.getBytes();

        System.out.println("name: " + file.getOriginalFilename());
        System.out.println("fileType: " + file.getContentType());
        System.out.println("data: " + file.getBytes());

        File uploadedFile = new File(fileName, fileType, data);
        fileRepository.save(uploadedFile);
    }
}
