package me.itsvixano.wikiwelp.service;

import me.itsvixano.wikiwelp.model.TagDTO;
import me.itsvixano.wikiwelp.persistence.DBManager;
import me.itsvixano.wikiwelp.persistence.dao.ITagDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService implements ITagService {
    private final ITagDao tagDao;

    public TagService(DBManager dbManager) {
        this.tagDao = dbManager.getTagDao();
    }

    @Override
    public TagDTO saveTag(TagDTO tag) {
        if (tag.getName() == null || tag.getName().isBlank()) {
            throw new IllegalArgumentException("Tag name is required");
        }
        tag.setName(tag.getName().trim());
        return tagDao.saveTag(tag);
    }

    @Override
    public TagDTO findByName(String name) {
        if (name == null || name.isBlank()) {
            return null;
        }
        return tagDao.findByName(name.trim());
    }

    @Override
    public List<TagDTO> findAll() {
        return tagDao.findAll();
    }

    @Override
    public List<TagDTO> findByPageId(Long pageId) {
        if (pageId == null) {
            return List.of();
        }
        return tagDao.findByPageId(pageId);
    }
}
