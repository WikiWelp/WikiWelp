package me.itsvixano.wikiwelp.model;

import me.itsvixano.wikiwelp.persistence.dao.ITagDao;

import java.util.List;

public class PageProxyDTO extends PageDTO {
    private final ITagDao tagDao;
    private boolean tagsLoaded = false;

    public PageProxyDTO(ITagDao tagDao) {
        this.tagDao = tagDao;
    }

    @Override
    public List<TagDTO> getTags() {
        if (!tagsLoaded && tagDao != null && getId() != null) {
            super.setTags(tagDao.findByPageId(getId()));
            tagsLoaded = true;
        }
        return super.getTags();
    }

    @Override
    public void setTags(List<TagDTO> tags) {
        super.setTags(tags);
        this.tagsLoaded = true;
    }
}
