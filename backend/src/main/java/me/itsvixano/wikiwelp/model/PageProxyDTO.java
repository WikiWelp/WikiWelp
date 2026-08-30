package me.itsvixano.wikiwelp.model;

import me.itsvixano.wikiwelp.persistence.dao.IRevisionDao;
import me.itsvixano.wikiwelp.persistence.dao.ITagDao;

import java.util.List;

public class PageProxyDTO extends PageDTO {
    private final ITagDao tagDao;
    private final IRevisionDao revisionDao;

    public PageProxyDTO(ITagDao tagDao, IRevisionDao revisionDao) {
        this.tagDao = tagDao;
        this.revisionDao = revisionDao;
    }

    @Override
    public List<TagDTO> getTags() {
        if (super.getTags() == null && tagDao != null && getId() != null) {
            super.setTags(tagDao.findByPageId(getId()));
        }
        return super.getTags();
    }

    @Override
    public List<RevisionDTO> getRevisions() {
        if (super.getRevisions() == null && revisionDao != null && getId() != null) {
            super.setRevisions(revisionDao.findByPageId(getId()));
        }
        return super.getRevisions();
    }
}
