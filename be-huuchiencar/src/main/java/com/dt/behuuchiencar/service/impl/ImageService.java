package com.dt.behuuchiencar.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

    @Value("${imagePath}")
    private String imagePath;

    public String uploadImage(MultipartFile multipartFile) {
        String fileName = generateFileName(multipartFile);
        File file = new File(imagePath + fileName);
        saveImage(multipartFile, file);
        return generateUrlFile(fileName);
    }

    private void saveImage(MultipartFile image, File file) {
        try (OutputStream os = new FileOutputStream(file)) {
            os.write(image.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
    }

    private String generateUrlFile(String fileName) {
        return "images/" + fileName;
    }
    
}
