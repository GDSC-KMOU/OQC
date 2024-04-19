package com.kmou.server.service;

import com.kmou.server.entity.Post;
import com.kmou.server.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    public Optional<Post> findById(Long postId) {
        return postRepository.findById(postId);
    }

    @Transactional
    public void acceptedPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        post.setAccepted(true);
    }


}
