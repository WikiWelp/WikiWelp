package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.model.TagDTO;

import java.util.List;

public interface IPageTagDao {
    List<TagDTO> findByPageId(Long pageId);

    void setTagsForPage(Long pageId, List<Long> tagIds);
}
