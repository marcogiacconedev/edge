package com.backend.backend_java.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.backend_java.dto.ProjectThumbnailResponse;
import com.backend.backend_java.model.Project;
import com.backend.backend_java.model.ProjectThumbnail;
import com.backend.backend_java.repository.ProjectRepository;
import com.backend.backend_java.repository.ProjectThumbnailRepository;

@Service
public class ProjectThumbnailService {
    private final ProjectThumbnailRepository projectThumbnailRepository;
    private final ProjectRepository projectRepository;

    public ProjectThumbnailService(
        ProjectThumbnailRepository projectThumbnailRepository,
        ProjectRepository projectRepository
    ) {
        this.projectThumbnailRepository = projectThumbnailRepository;
        this.projectRepository = projectRepository;
    }

    public ProjectThumbnail getProjectThumbnailEntity(UUID projectId) {
        return projectThumbnailRepository.findByProjectId(projectId);
    }

    public ProjectThumbnailResponse createThumbnail(
        UUID projectId,
        MultipartFile file,
        UUID userId
    ) throws IOException {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        if (!project.getUserId().equals(userId)) throw new RuntimeException("Not Authorized");        
        if (file.getContentType() == null || !file.getContentType().startsWith("image/")) throw new RuntimeException("File must be an image");
        ProjectThumbnail projectThumbnail = new ProjectThumbnail();
        projectThumbnail.setProjectId(projectId);        
        projectThumbnail.setPhotoType(file.getContentType());
        projectThumbnail.setPhoto(file.getBytes());

        projectThumbnailRepository.save(projectThumbnail);

        return new ProjectThumbnailResponse(projectThumbnail);        
    }
}
