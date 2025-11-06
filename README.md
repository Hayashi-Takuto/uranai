# uranai

## プロジェクト概要
- Next.js 16（App Router）と React 19 を用いて構築した占いダッシュボードアプリです。
- Supabase 認証でログインしたユーザーが、AI 占い師に相談内容を送信し、OpenAI（gpt-4o-mini）による鑑定結果を保存・閲覧できます。
- Tailwind CSS 4 をベースにしたダークテーマ UI と、占い師のペルソナ設定が特徴です。

## 主な機能
- **鑑定依頼**: 好みの占い師と相談内容を選び、AI から鑑定結果を取得。
- **鑑定履歴**: ユーザーごとの過去鑑定を Supabase/Postgres に保存し、履歴ページで再確認。
- **ユーザー認証**: Supabase Auth によるメール・パスワード認証と RLS 保護済みテーブル。
- **占い師管理**: `lib/fortune-tellers.ts` および `supabase/seed.sql` で占い師プロフィールとプロンプトを一元管理。

## 技術スタック
- Next.js 16 / React 19
- TypeScript 5
- Tailwind CSS 4 (`@tailwindcss/postcss` 利用)
- Supabase（Auth・Postgres・Row Level Security）
- OpenAI SDK 6
- Framer Motion, lucide-react など UI 補助ライブラリ

## セットアップ手順
1. 依存関係をインストール: `npm install`
2. Supabase CLI をインストールしていない場合は `npm install -g supabase` などで導入。
3. `.env.local` を作成し、以下の環境変数を設定します。

   ```bash
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="https://..."       # プロジェクト URL またはローカルスタック URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY="..."          # anon キー
   SUPABASE_SERVICE_ROLE_KEY="..."              # サーバー処理用（ローカル開発では supabase start で取得）

   # OpenAI
   OPENAI_API_KEY="sk-..."
   ```

   認証メールのリダイレクト先を変更したい場合は `NEXT_PUBLIC_SITE_URL` も併せて定義してください。

## Supabase ローカル起動
```bash
npx supabase start                         # Postgres・Auth・Mailpit を起動
npx supabase db reset --use-migrations --seed # マイグレーションと seed の適用
```
- `supabase/seed.sql` により占い師の初期データが挿入されます。
- メール認証の挙動は Mailpit (通常 http://127.0.0.1:54324) で確認できます。詳細は `docs/auth-checklist.md` 参照。

## 開発用コマンド
- `npm run dev` : 開発サーバー (`http://localhost:3000`)
- `npm run build` : 本番ビルド
- `npm run start` : 本番ビルドの起動
- `npm run lint` : ESLint 実行

## 主なディレクトリ
- `app/` : App Router ページ、API ルート、レイアウト
- `components/` : UI コンポーネントとフォーム
- `lib/` : 占い師定義、OpenAI・Supabase クライアント
- `supabase/` : マイグレーション、シード、`config.toml`
- `docs/` : 運用ドキュメント（例: Supabase 認証チェックリスト）

## デプロイメモ
- Vercel などでデプロイする場合は、上記環境変数をプロダクションにも設定し、Supabase Auth の `site_url` を本番 URL に更新してください。
- OpenAI API の料金とレート制限に留意し、必要に応じてモデルや温度の調整を行ってください。
