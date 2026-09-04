package me.itsvixano.wikiwelp.model;

import me.itsvixano.wikiwelp.persistence.dao.IPageTagDao;
import me.itsvixano.wikiwelp.persistence.dao.IRevisionDao;

import java.util.List;

public class PageProxyDTO extends PageDTO {
    private final IPageTagDao pageTagDao;
    private final IRevisionDao revisionDao;

    public PageProxyDTO(IPageTagDao pageTagDao, IRevisionDao revisionDao) {
        this.pageTagDao = pageTagDao;
        this.revisionDao = revisionDao;
    }

    @Override
    public List<TagDTO> getTags() {
        if (super.getTags() == null && pageTagDao != null && getId() != null) {
            super.setTags(pageTagDao.findByPageId(getId()));
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
