import { posts } from '../data/store.js';
import crypto from 'crypto';

export function listPosts(_req, res) {
  return res.json({ items: posts });
}

export function createPost(req, res) {
  const { title, description = '', eventName = '', eventDate = null, isPublished = false } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'title is required' });
  }

  const post = {
    id: crypto.randomUUID(),
    title,
    description,
    eventName,
    eventDate,
    isPublished,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: req.user?.sub ?? null,
    updatedBy: req.user?.sub ?? null
  };

  posts.unshift(post);
  return res.status(201).json(post);
}

export function updatePost(req, res) {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx < 0) return res.status(404).json({ message: 'Post not found' });

  posts[idx] = {
    ...posts[idx],
    ...req.body,
    id: posts[idx].id,
    updatedAt: new Date().toISOString(),
    updatedBy: req.user?.sub ?? null
  };

  return res.json(posts[idx]);
}

export function deletePost(req, res) {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx < 0) return res.status(404).json({ message: 'Post not found' });
  posts.splice(idx, 1);
  return res.status(204).send();
}
