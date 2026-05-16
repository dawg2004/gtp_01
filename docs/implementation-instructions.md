# GOOD TIME PHOTO 実装指示書

## 1. プロジェクト概要（現在の実装状況）

- 現在のリポジトリは初期状態で、プロダクション用バックエンドは未実装です。
- フロントエンドの管理系画面として、以下2ファイルを `site/files/` に配置済みです。
  - `admin-dashboard.html`
  - `event-archive.html`
- 今後はこの静的HTMLを起点として、API連携・認証・投稿管理を段階的に追加します。

---

## 2. 現在の仕様（フロントエンド / 管理画面）

### フロントエンド
- 目的: イベント写真・投稿一覧・アーカイブ閲覧。
- 主要要件:
  - 投稿一覧表示（最新順）
  - イベント別フィルタ
  - ページネーション
  - 公開/非公開状態の表示

### 管理画面
- 目的: 投稿の作成・編集・削除・公開管理。
- 主要要件:
  - 管理者ログイン
  - 投稿CRUD
  - 画像URLまたは画像アップロード情報の登録
  - 公開ステータス切替

---

## 3. 次に実装すべき機能（優先度別）

### 最優先（P0）
1. Node.js + Express サーバー構築
2. DB接続（MongoDB または PostgreSQL）
3. 投稿CRUD API実装
4. JWT認証（ログイン / トークン検証）

### 高優先（P1）
1. 管理画面とAPIの接続
2. 入力バリデーション（zod / joi / express-validator いずれか）
3. ロール制御（admin/editor）

### 中優先（P2）
1. 画像管理（Cloudinary/S3）
2. 監査ログ（誰がいつ編集したか）
3. 検索・タグ機能

### 低優先（P3）
1. 通知（Slack/メール）
2. 下書きプレビュー
3. 分析ダッシュボード

---

## 4. ファイル構成（推奨ディレクトリ構造）

```txt
project-root/
  backend/
    src/
      app.js
      server.js
      config/
        db.js
        env.js
      models/
        Post.js
        User.js
      controllers/
        postController.js
        authController.js
      routes/
        posts.js
        auth.js
      middlewares/
        auth.js
        errorHandler.js
      services/
        postService.js
      utils/
        jwt.js
  frontend/
    public/
    src/
  site/
    files/
      admin-dashboard.html
      event-archive.html
  docs/
    implementation-instructions.md
```

---

## 5. データベーススキーマ

### Posts テーブル/コレクション
- `id` (UUID or ObjectId)
- `title` (string, required)
- `description` (text)
- `eventDate` (datetime)
- `eventName` (string, indexed)
- `imageUrls` (array[string])
- `isPublished` (boolean, default: false)
- `createdBy` (User参照)
- `updatedBy` (User参照)
- `createdAt` / `updatedAt` (timestamp)

### Users テーブル/コレクション
- `id` (UUID or ObjectId)
- `name` (string, required)
- `email` (string, unique, required)
- `passwordHash` (string, required)
- `role` (enum: `admin` | `editor`, default: `editor`)
- `isActive` (boolean, default: true)
- `lastLoginAt` (datetime)
- `createdAt` / `updatedAt` (timestamp)

---

## 6. セキュリティ対策（必須）

1. パスワードを平文保存しない（bcryptでハッシュ化）
2. JWTの有効期限を短めに設定（例: 15m〜1h）
3. Refresh Tokenの導入（HTTP Only Cookie推奨）
4. CORS許可オリジンを限定
5. Helmetで主要ヘッダを保護
6. Rate Limitでログイン試行を制限
7. 入力値サニタイズ（XSS/NoSQLインジェクション対策）
8. 環境変数で秘密情報を管理
9. 監査ログの保存（認証失敗/権限エラー含む）

---

## 7. 環境変数設定（`.env` 例）

```env
NODE_ENV=development
PORT=4000

# Database
DATABASE_URL=mongodb+srv://<user>:<pass>@cluster.mongodb.net/goodtimephoto
# PostgreSQLの場合:
# DATABASE_URL=postgresql://user:password@localhost:5432/goodtimephoto

# Auth
JWT_ACCESS_SECRET=replace_with_strong_random_secret
JWT_REFRESH_SECRET=replace_with_another_strong_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=https://example.com

# Storage (optional)
CLOUDINARY_URL=cloudinary://<key>:<secret>@<cloud_name>
```

---

## 8. デプロイ推奨サービス

- **Frontend**: Vercel
- **Backend API**: Render / Railway / Heroku
- **Database**: MongoDB Atlas または Supabase/PostgreSQL
- **Media Storage**: Cloudinary または AWS S3
- **Monitoring**: Sentry + UptimeRobot

---

## 9. 実装の優先順位（Phase 1〜4）

### Phase 1: バックエンド構築（最優先）
- Express初期化
- DB接続
- `POST /auth/login`, `GET /posts`, `POST /posts`, `PATCH /posts/:id`, `DELETE /posts/:id`
- JWT認証ミドルウェア

### Phase 2: 管理画面連携
- 管理画面からCRUDを実行
- トークン管理（期限切れ処理含む）
- エラーハンドリングUI

### Phase 3: 運用機能
- 画像アップロード
- ロール管理
- 監査ログ

### Phase 4: 品質・拡張
- テスト自動化
- CI/CD
- パフォーマンス最適化

---

## 10. テスト項目（チェックリスト）

- [ ] ログイン成功/失敗
- [ ] JWTなしで保護APIにアクセス不可
- [ ] 投稿作成（正常/異常）
- [ ] 投稿更新（権限あり/なし）
- [ ] 投稿削除（論理/物理）
- [ ] 一覧取得（ページネーション、絞り込み）
- [ ] XSS/不正入力対策
- [ ] Rate limit動作
- [ ] CORS設定確認
- [ ] 監査ログ出力確認

---

## 11. 参考リソース

- Express: https://expressjs.com/
- Node.js: https://nodejs.org/
- MongoDB Atlas: https://www.mongodb.com/atlas
- PostgreSQL: https://www.postgresql.org/docs/
- JWT: https://jwt.io/introduction
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Vercel Docs: https://vercel.com/docs
- Heroku Docs: https://devcenter.heroku.com/

---

## 🎯 次のステップ（再確認）

最優先は **Phase 1（バックエンド構築）** です。

1. Node.js + Express サーバーを立ち上げる
2. MongoDB/PostgreSQLの接続を確立する
3. Posts CRUD APIを実装する
4. JWT認証を実装する

