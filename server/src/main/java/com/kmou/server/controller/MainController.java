package com.kmou.server.controller;

import com.kmou.server.dto.PostBodyShowDTO;
import com.kmou.server.dto.PostHeadShowDTO;
import com.kmou.server.service.PostService;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class MainController {

    private final PostService postService;

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
                    responseDTO.setPaid(post.isPaid());
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
