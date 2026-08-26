package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.model.PageDTO;
import me.itsvixano.wikiwelp.model.PageProxyDTO;
import me.itsvixano.wikiwelp.model.TagDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public record PageDao(Connection connection, ITagDao tagDao) implements IPageDao {

    @Override
    public PageDTO savePage(PageDTO page) {
        String query = "INSERT INTO pages (title, content) VALUES (?, ?) " +
                "ON CONFLICT (title) DO UPDATE SET content = EXCLUDED.content RETURNING id, title, content";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, page.getTitle());
            ps.setString(2, page.getContent());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    page.setId(rs.getLong("id"));
                    page.setTitle(rs.getString("title"));
                    page.setContent(rs.getString("content"));
                }
            }

            if (page.getId() != null && page.getTags() != null && tagDao != null) {
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
                tagDao.setTagsForPage(page.getId(), tagIds);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return page;
    }

    @Override
    public PageDTO findByTitle(String title) {
        String query = "SELECT * FROM pages WHERE LOWER(title) = LOWER(?)";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, title);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    PageDTO page = new PageProxyDTO(tagDao);
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
        String query = "SELECT p.* FROM pages p " +
                "INNER JOIN page_tags pt ON p.id = pt.page_id " +
                "INNER JOIN tags t ON pt.tag_id = t.id " +
                "WHERE LOWER(t.name) = LOWER(?) ORDER BY p.title ASC";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, tagName);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    PageDTO page = new PageProxyDTO(tagDao);
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
}
