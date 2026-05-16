import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.js';
import { listPosts, createPost, updatePost, deletePost } from '../controllers/postController.js';

const router = Router();
router.get('/', listPosts);
router.post('/', requireAuth, createPost);
router.patch('/:id', requireAuth, updatePost);
router.delete('/:id', requireAuth, deletePost);

export default router;
