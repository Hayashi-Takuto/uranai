# Supabase Auth 確認チェックリスト

1. `npx supabase start` でローカルスタックを起動し、`Mailpit URL` (例: http://127.0.0.1:54324) にアクセスしてテストメールを確認します。
2. Supabase Studio (http://127.0.0.1:54323) → Authentication → Providers で Email の確認が有効になっているか確認します。
3. サインアップフォームから任意のメールアドレスで登録し、Mailpit 上の確認メールリンクでセッションが作成されるかを確認します。
4. `users` テーブルにレコードが追加され、`readings` テーブルの RLS ポリシーで本人のみが参照・登録できることを Studio から検証します（SQL Editor で `select * from readings;` を `service_role` ではなく `anon` JWT で試す）。
5. 必要に応じて `auth` 設定 (`supabase/config.toml`) の `site_url` を Vercel 本番 URL に変更し、Studio の Email Templates でブランドメッセージを更新します。
