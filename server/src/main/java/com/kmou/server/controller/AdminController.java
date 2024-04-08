package com.kmou.server.controller;

import com.kmou.server.dto.AdminPostDTO;
import com.kmou.server.dto.PostHeadShowDTO;
import com.kmou.server.entity.Post;
import com.kmou.server.service.PostService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AdminController {
    private final PostService postService;

    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

    public AdminController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/admin")
    public ResponseEntity<List<AdminPostDTO>> adminGetAllPosts() {
        logger.info("Admin get all posts");
        List<AdminPostDTO> postDTOs = postService.getAllPosts().stream().map(post -> {
            AdminPostDTO dto = new AdminPostDTO();
            dto.setId(post.getId());
            dto.setTitle(post.getTitle());
            dto.setUsername(post.getUser().getName());
            dto.setPaid(post.isPaid());
            dto.setAccepted(post.isAccepted());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(postDTOs);
    }

    @PostMapping("/admin/{id}")
    public ResponseEntity<Post> acceptedSubmit(@PathVariable Long id) {
        postService.acceptedPost(id);
        logger.info("Admin accepted post id: " + id);
        return ResponseEntity.ok().build();
    }

}
