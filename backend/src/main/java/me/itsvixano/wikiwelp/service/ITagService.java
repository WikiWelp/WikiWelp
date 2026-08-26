package me.itsvixano.wikiwelp.service;

import me.itsvixano.wikiwelp.model.TagDTO;

import java.util.List;

public interface ITagService {
    TagDTO saveTag(TagDTO tag);

    TagDTO findByName(String name);

    List<TagDTO> findAll();

    List<TagDTO> findByPageId(Long pageId);
}
