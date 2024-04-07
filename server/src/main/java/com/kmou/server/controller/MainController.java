package com.kmou.server.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kmou.server.dto.PostBodyShowDTO;
import com.kmou.server.dto.PostDTO;
import com.kmou.server.dto.PostHeadShowDTO;
import com.kmou.server.entity.Post;
import com.kmou.server.entity.UserEntity;
import com.kmou.server.service.AIService;
import com.kmou.server.service.PostService;
import com.kmou.server.service.UserService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class MainController {

    private final PostService postService;
    private static final Logger logger = LoggerFactory.getLogger(MainController.class);


    @GetMapping("/posts/{id}")
    public ResponseEntity<PostBodyShowDTO> getPost(@PathVariable Long id) {
        return postService.findById(id)
                .map(post -> {
                    PostBodyShowDTO responseDTO = new PostBodyShowDTO();
                    responseDTO.setId(post.getId());
                    responseDTO.setTitle(post.getTitle());
                    responseDTO.setContent(post.getContent());
                    responseDTO.setImage(post.getImage());
                    responseDTO.setUserName(post.getUser().getName());
                    responseDTO.setUserId(post.getUser().getUsername());
                    responseDTO.setPrice(post.getPrice());
                    responseDTO.setAccepted(post.isAccepted());
                    responseDTO.setGarbageName(post.getGarbageName());
                    return ResponseEntity.ok(responseDTO);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @GetMapping("/posts")
    public ResponseEntity<List<PostHeadShowDTO>> getAllPosts() {
        List<PostHeadShowDTO> postDTOs = postService.getAllPosts().stream().map(post -> {
            PostHeadShowDTO dto = new PostHeadShowDTO();
            dto.setId(post.getId());
            dto.setTitle(post.getTitle());
            dto.setUsername(post.getUser().getName());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(postDTOs);
    }

}
