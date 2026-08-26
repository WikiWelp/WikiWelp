package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.model.RevisionDTO;

import java.util.List;

public interface IRevisionDao {
    RevisionDTO createRevision(Long pageId, String content);

    List<RevisionDTO> findByPageId(Long pageId);
}
