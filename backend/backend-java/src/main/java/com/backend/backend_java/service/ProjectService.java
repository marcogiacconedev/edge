package com.backend.backend_java.service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.backend_java.dto.CreateProjectRequest;
import com.backend.backend_java.dto.ProjectResponse;
import com.backend.backend_java.dto.UpdateProjectRequest;
import com.backend.backend_java.model.Photo;
import com.backend.backend_java.model.Project;
import com.backend.backend_java.model.ProjectThumbnail;
import com.backend.backend_java.repository.PhotoRepository;
import com.backend.backend_java.repository.ProjectRepository;
import com.backend.backend_java.repository.ProjectThumbnailRepository;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final PhotoRepository photoRepository;
    private final ProjectThumbnailRepository projectThumbnailRepository;

    public ProjectService(
        ProjectRepository projectRepository,
        PhotoRepository photoRepository,
        ProjectThumbnailRepository projectThumbnailRepository
    ) {
        this.projectRepository = projectRepository;
        this.photoRepository = photoRepository;
        this.projectThumbnailRepository = projectThumbnailRepository;
    }

    public List<ProjectResponse> getProjects() {
        List<Project> projects = projectRepository.findAll();
        return projects.stream()
            .map(project -> new ProjectResponse(project))
            .collect(Collectors.toList());
    }

    public ProjectResponse getProjectById(UUID projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        return new ProjectResponse(project);
    }

    public ProjectResponse createProject(CreateProjectRequest dto, UUID userId) {
        Project project = new Project();
        project.setUserId(userId);
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setOrder(dto.getOrder());
        project.setCreatedAt(dto.getCreatedAt());
        project.setUpdatedAt(dto.getUpdatedAt());

        projectRepository.save(project);
        
        return new ProjectResponse(project);
    }

    public ProjectResponse updateProject(UpdateProjectRequest dto, UUID projectId, UUID userId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        if (!project.getUserId().equals(userId)) throw new RuntimeException("Not authorized");

        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());
        project.setOrder(dto.getOrder());
        project.setUpdatedAt(LocalDate.now());

        projectRepository.save(project);

        return new ProjectResponse(project);
    }

    public void deleteProject(UUID projectId, UUID userId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        if (!project.getUserId().equals(userId)) throw new RuntimeException("Not authorized");
        List<Photo> photos = photoRepository.findByProjectId(projectId);
        ProjectThumbnail thumbnail = projectThumbnailRepository.findByProjectId(projectId);

        projectThumbnailRepository.delete(thumbnail);
        photoRepository.deleteAllInBatch(photos);
        projectRepository.delete(project);
    }
}
