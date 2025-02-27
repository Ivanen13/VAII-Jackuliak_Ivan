package com.example.reactbackend.controllers;

import com.example.reactbackend.file.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
public class FileController {
    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            fileService.store(file);
            return ResponseEntity.ok("Súbor bol úspešne nahraný");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Chyba pri nahrávaní súboru: " + e.getMessage());
        }
    }
}
