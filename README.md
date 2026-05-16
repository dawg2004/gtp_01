# gtp_01

GOOD TIME PHOTO の実装準備リポジトリです。

## 追加済み

- 実装指示書: `docs/implementation-instructions.md`
- 管理画面HTML: `site/files/admin-dashboard.html`
- イベントアーカイブHTML: `site/files/event-archive.html`
- Phase 1バックエンド雛形: `backend/`（Express + JWT + 投稿CRUD API）

## バックエンド起動

```bash
cd backend
npm install
npm run dev
```

## API（最小実装）

- `POST /auth/login`
- `GET /posts`
- `POST /posts` (Bearer token 必須)
- `PATCH /posts/:id` (Bearer token 必須)
- `DELETE /posts/:id` (Bearer token 必須)
