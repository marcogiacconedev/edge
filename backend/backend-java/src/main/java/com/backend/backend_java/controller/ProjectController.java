package com.backend.backend_java.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend_java.dto.CreateProjectRequest;
import com.backend.backend_java.dto.ProjectResponse;
import com.backend.backend_java.dto.UpdateProjectRequest;
import com.backend.backend_java.service.ProjectService;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getProjects(
        // no @AuthenticaationPrincipal: website needs this too
    ) {
        List<ProjectResponse> projects = projectService.getProjects();
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> getProjectById(
        // no @AuthenticaationPrincipal: website needs this too
        @PathVariable UUID projectId
    ) {
        ProjectResponse projectResponse = projectService.getProjectById(projectId);
        return ResponseEntity.ok(projectResponse);
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(
        @RequestBody CreateProjectRequest dto,
        @AuthenticationPrincipal String userId
    ) {
        ProjectResponse projectResponse = projectService.createProject(dto, UUID.fromString(userId));
        return ResponseEntity.ok(projectResponse);
    }

    @PutMapping 
    public ResponseEntity<ProjectResponse> updateProject(
        @RequestBody UpdateProjectRequest dto,
        @AuthenticationPrincipal String userId
    ) {
        ProjectResponse projectResponse = projectService.updateProject(dto, UUID.fromString(userId));
        return ResponseEntity.ok(projectResponse);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(
        @PathVariable UUID projectId,
        @AuthenticationPrincipal String userId
    ) {
        projectService.deleteProject(projectId, UUID.fromString(userId));
        return ResponseEntity.noContent().build();
    }
}
