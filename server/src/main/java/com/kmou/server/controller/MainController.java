package com.kmou.server.controller;

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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class MainController {

    private final UserService userService;
    private final PostService postService;
    private final AIService aiService;
    private static final Logger logger = LoggerFactory.getLogger(MainController.class);


    @PostMapping("/posts")
    public ResponseEntity<PostDTO> createPost(@RequestParam("title") String title,
                                           @RequestParam("content") String content,
                                           @RequestParam("image") MultipartFile image,
                                           Principal principal) throws IOException {
        String username = principal.getName();

        Optional<UserEntity> userOpt = Optional.ofNullable(userService.findByUsername(username));
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        UserEntity user = userOpt.get();

        String analysisResult = aiService.analyzeImage(image);
        logger.info("Analysis result: " + analysisResult);


        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setImage(image.getBytes());
        post.setUser(user);
        post.setPrice(1000L);
        Post savedPost = postService.createPost(post);

        PostDTO responseDTO = new PostDTO();
        responseDTO.setId(savedPost.getId());
        responseDTO.setTitle(savedPost.getTitle());
        responseDTO.setContent(savedPost.getContent());
        responseDTO.setImage(savedPost.getImage());
        responseDTO.setPrice(savedPost.getPrice());
        responseDTO.setUsername(user.getName());

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/posts/{id}")
    public ResponseEntity<PostBodyShowDTO> getPost(@PathVariable Long id) {
        return postService.findById(id)
                .map(post -> {
                    PostBodyShowDTO responseDTO = new PostBodyShowDTO();
                    responseDTO.setId(post.getId());
                    responseDTO.setTitle(post.getTitle());
                    responseDTO.setContent(post.getContent());
                    responseDTO.setImage(post.getImage());
                    responseDTO.setUsername(post.getUser().getName());
                    responseDTO.setPrice(post.getPrice());
                    responseDTO.setAccepted(post.isAccepted());
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
