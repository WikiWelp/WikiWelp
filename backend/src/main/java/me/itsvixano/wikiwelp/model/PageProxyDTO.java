package me.itsvixano.wikiwelp.model;

import me.itsvixano.wikiwelp.persistence.dao.IRevisionDao;
import me.itsvixano.wikiwelp.persistence.dao.ITagDao;

import java.util.List;

public class PageProxyDTO extends PageDTO {
    private final ITagDao tagDao;
    private final IRevisionDao revisionDao;
    private boolean tagsLoaded = false;
    private boolean revisionsLoaded = false;

    public PageProxyDTO(ITagDao tagDao, IRevisionDao revisionDao) {
        this.tagDao = tagDao;
        this.revisionDao = revisionDao;
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

    @Override
    public List<RevisionDTO> getRevisions() {
        if (!revisionsLoaded && revisionDao != null && getId() != null) {
            super.setRevisions(revisionDao.findByPageId(getId()));
            revisionsLoaded = true;
        }
        return super.getRevisions();
    }

    @Override
    public void setRevisions(List<RevisionDTO> revisions) {
        super.setRevisions(revisions);
        this.revisionsLoaded = true;
    }
}
