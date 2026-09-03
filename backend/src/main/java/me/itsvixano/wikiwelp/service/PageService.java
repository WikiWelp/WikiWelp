package me.itsvixano.wikiwelp.service;

import me.itsvixano.wikiwelp.model.PageDTO;
import me.itsvixano.wikiwelp.persistence.DBManager;
import me.itsvixano.wikiwelp.persistence.dao.IPageDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PageService implements IPageService {
    private final IPageDao pageDao;

    public PageService(DBManager dbManager) {
        this.pageDao = dbManager.getPageDao();
    }

    @Override
    public PageDTO savePage(PageDTO page) {
        if (page.getTitle() == null || page.getTitle().isBlank()) {
            throw new IllegalArgumentException("Title is required");
        }
        if (page.getContent() == null) {
            page.setContent("");
        }
        page.setTitle(page.getTitle().trim());
        return pageDao.savePage(page);
    }

    @Override
    public PageDTO findByTitle(String title) {
        if (title == null || title.isBlank()) {
            return null;
        }
        return pageDao.findByTitle(title.trim());
    }

    @Override
    public List<PageDTO> findByTag(String tagName) {
        if (tagName == null || tagName.isBlank()) {
            return List.of();
        }
        return pageDao.findByTag(tagName.trim());
    }

    @Override
    public List<PageDTO> findAll() {
        return pageDao.findAll();
    }

    @Override
    public boolean deleteById(Long id) {
        if (id == null || id <= 0) {
            return false;
        }
        return pageDao.deleteById(id);
    }
}
