package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.model.TagDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public record TagDao(Connection connection) implements ITagDao {

    @Override
    public TagDTO saveTag(TagDTO tag) {
        if (tag.getName() == null || tag.getName().isBlank()) {
            return null;
        }
        String trimmedName = tag.getName().trim();
        tag.setName(trimmedName);

        String findQuery = "SELECT id, name FROM tags WHERE LOWER(name) = LOWER(?)";
        try (PreparedStatement ps = connection.prepareStatement(findQuery)) {
            ps.setString(1, trimmedName);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    tag.setId(rs.getLong("id"));
                    tag.setName(rs.getString("name"));
                    return tag;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        String insertQuery = "INSERT INTO tags (name) VALUES (?) RETURNING id";
        try (PreparedStatement ps = connection.prepareStatement(insertQuery)) {
            ps.setString(1, trimmedName);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    tag.setId(rs.getLong("id"));
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return tag;
    }

    @Override
    public TagDTO findByName(String name) {
        String query = "SELECT id, name FROM tags WHERE LOWER(name) = LOWER(?)";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, name);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    TagDTO tag = new TagDTO();
                    tag.setId(rs.getLong("id"));
                    tag.setName(rs.getString("name"));
                    return tag;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public List<TagDTO> findAll() {
        List<TagDTO> list = new ArrayList<>();
        String query = "SELECT id, name FROM tags ORDER BY name ASC";
        try (PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                TagDTO tag = new TagDTO();
                tag.setId(rs.getLong("id"));
                tag.setName(rs.getString("name"));
                list.add(tag);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return list;
    }

    @Override
    public List<TagDTO> findByPageId(Long pageId) {
        List<TagDTO> list = new ArrayList<>();
        String query = "SELECT tags.id, tags.name FROM tags " +
                "JOIN page_tags ON tags.id = page_tags.tag_id " +
                "WHERE page_tags.page_id = ? ORDER BY tags.name ASC";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setLong(1, pageId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    TagDTO tag = new TagDTO();
                    tag.setId(rs.getLong("id"));
                    tag.setName(rs.getString("name"));
                    list.add(tag);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return list;
    }

    @Override
    public void setTagsForPage(Long pageId, List<Long> tagIds) {
        String deleteQuery = "DELETE FROM page_tags WHERE page_id = ?";
        try (PreparedStatement ps = connection.prepareStatement(deleteQuery)) {
            ps.setLong(1, pageId);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        if (tagIds == null || tagIds.isEmpty()) {
            return;
        }

        String insertQuery = "INSERT INTO page_tags (page_id, tag_id) VALUES (?, ?) ON CONFLICT DO NOTHING";
        try (PreparedStatement ps = connection.prepareStatement(insertQuery)) {
            for (Long tagId : tagIds) {
                ps.setLong(1, pageId);
                ps.setLong(2, tagId);
                ps.addBatch();
            }
            ps.executeBatch();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
