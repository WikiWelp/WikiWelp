package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.exception.DuplicateTitleException;
import me.itsvixano.wikiwelp.model.PageDTO;
import me.itsvixano.wikiwelp.model.PageProxyDTO;
import me.itsvixano.wikiwelp.model.TagDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public record PageDao(Connection connection, ITagDao tagDao, IPageTagDao pageTagDao,
                      IRevisionDao revisionDao) implements IPageDao {

    @Override
    public PageDTO savePage(PageDTO page) {
        boolean isUpdate = page.getId() != null;
        String query = isUpdate
                ? "UPDATE pages SET title = ?, content = ? WHERE id = ? RETURNING id"
                : "INSERT INTO pages (title, content) VALUES (?, ?) RETURNING id";

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, page.getTitle());
            ps.setString(2, page.getContent());
            if (isUpdate) {
                ps.setLong(3, page.getId());
            }

            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    page.setId(rs.getLong("id"));
                } else if (isUpdate) {
                    throw new IllegalArgumentException("Page with id " + page.getId() + " not found");
                }
            }

            if (page.getId() != null && page.getTags() != null && pageTagDao != null) {
                List<Long> tagIds = new ArrayList<>();
                for (TagDTO tag : page.getTags()) {
                    if (tag.getId() != null) {
                        tagIds.add(tag.getId());
                    } else if (tag.getName() != null && !tag.getName().isBlank()) {
                        TagDTO existingOrSaved = tagDao.saveTag(tag);
                        if (existingOrSaved != null && existingOrSaved.getId() != null) {
                            tagIds.add(existingOrSaved.getId());
                        }
                    }
                }
                pageTagDao.setTagsForPage(page.getId(), tagIds);
            }

            if (page.getId() != null && page.getContent() != null && revisionDao != null) {
                revisionDao.createRevision(page.getId(), page.getContent());
            }
        } catch (SQLException e) {
            if (SQLErrors.SQL_DUPLICATE_KEY.equals(e.getSQLState())) {
                throw new DuplicateTitleException(e);
            }
            throw new RuntimeException(e);
        }
        return page;
    }

    @Override
    public PageDTO findByTitle(String title) {
        String query = "SELECT id, title, content FROM pages WHERE LOWER(title) = LOWER(?)";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, title);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    PageDTO page = new PageProxyDTO(pageTagDao, revisionDao);
                    page.setId(rs.getLong("id"));
                    page.setTitle(rs.getString("title"));
                    page.setContent(rs.getString("content"));
                    return page;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public List<PageDTO> findByTag(String tagName) {
        List<PageDTO> pages = new ArrayList<>();
        String query = "SELECT pages.id, pages.title, pages.content FROM pages " +
                "JOIN page_tags ON pages.id = page_tags.page_id " +
                "JOIN tags ON page_tags.tag_id = tags.id " +
                "WHERE LOWER(tags.name) = LOWER(?) ORDER BY pages.title ASC";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, tagName);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    PageDTO page = new PageProxyDTO(pageTagDao, revisionDao);
                    page.setId(rs.getLong("id"));
                    page.setTitle(rs.getString("title"));
                    page.setContent(rs.getString("content"));
                    pages.add(page);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return pages;
    }

    @Override
    public List<PageDTO> findAll() {
        List<PageDTO> list = new ArrayList<>();
        String query = "SELECT id, title, content FROM pages ORDER BY title ASC";
        try (PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                PageDTO page = new PageProxyDTO(pageTagDao, revisionDao);
                page.setId(rs.getLong("id"));
                page.setTitle(rs.getString("title"));
                page.setContent(rs.getString("content"));
                list.add(page);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return list;
    }

    @Override
    public boolean deleteById(Long id) {
        String query = "DELETE FROM pages WHERE id = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setLong(1, id);
            int rows = ps.executeUpdate();
            if (rows > 0) {
                String cleanQuery = "DELETE FROM tags WHERE id NOT IN (SELECT tag_id FROM page_tags)";
                try (PreparedStatement cleanPs = connection.prepareStatement(cleanQuery)) {
                    cleanPs.executeUpdate();
                }
                return true;
            }
            return false;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
