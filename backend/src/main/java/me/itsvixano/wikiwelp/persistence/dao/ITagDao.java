package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.model.TagDTO;

import java.util.List;

public interface ITagDao {
    TagDTO saveTag(TagDTO tag);

    TagDTO findByName(String name);

    List<TagDTO> findAll();
}
