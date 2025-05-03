# スカウトサービス

## 実装した機能

- ユーザー機能（サインアップ, ログイン）
  1. recruiter, studentのロールがあります。
  2. email, passwordでログインできます。
- 企業プロフィールの更新（recruiterのみ）
- 学生のプロフィールの更新（studentのみ）
- 求人情報の投稿,編集（recruiterのみ）
- 求人への応募（studentのみ）
- メッセージ機能（recruiter - student間のみ）
- 通知機能（開発途中）

## 実装できなかった機能

- 各機能のエラースローが不十分の箇所があります。
  1. 特にform系のSubmit後のエラースローが不十分で、バックエンド側のエラーを検知してUIに反映できていません。
- 通知機能の既読をつける機能が不十分です。
- バックエンド側で作成したエクセル出力がフロントエンド側で実装できていません

## 反省

- 設計が不十分な箇所が多かった。

  フロントエンド側の実装時にAPIの設計が不十分だったため、実装が難しくなった。

- もっとドキュメントを充実させてAIを活用するべきだった。

  時間が足りないからこそ仕様やDBの設計を言語化してAIをもっと活用するべきだった。


## ユーザーインターフェース

実装できた機能のスクリーンショットです。

### Home page
![Image](https://github.com/user-attachments/assets/c611638f-7ebb-4867-a786-81ef03c1774d)


### Job posting page
![Image](https://github.com/user-attachments/assets/310fc8f5-25bb-4fec-b65b-e4379eeb8049)

### Login page
![Image](https://github.com/user-attachments/assets/f4f23a92-49bf-4aaa-b0d3-3f6419a2a43d)

### Register page

- 学生登録用
![Image](https://github.com/user-attachments/assets/8e7421f0-f36a-422e-9010-88c098e525fe)

- 企業の採用担当者登録用
![Image](https://github.com/user-attachments/assets/c1f3c2e3-7fe5-48a8-8f91-3a7c45291a58)

### Student Profile

- プロフィール
![Image](https://github.com/user-attachments/assets/5666d9fd-c4d0-4268-b3b2-2f1175e324fb)

- プロフィール編集
![Image](https://github.com/user-attachments/assets/c7e8e6fb-b53f-4066-8408-a8f4eeaee0b0)

### Company Profile

- 企業プロフィール
![Image](https://github.com/user-attachments/assets/aefbb8da-32cc-43cb-984a-ee807bc92b80)

- 企業プロフィール編集
![Image](https://github.com/user-attachments/assets/f6addbf4-e9d2-46a6-bfed-c912e359da47)

### Company Job Posting

- 企業の求人一覧
![Image](https://github.com/user-attachments/assets/6b83fefb-a9ee-4a5d-8970-3031a7754cce)

- 求人情報の編集
![Image](https://github.com/user-attachments/assets/8f61f02a-264d-471e-a7b2-08a5c9b0e207)

### Notification

- 通知一覧
![Image](https://github.com/user-attachments/assets/079296d1-ff7a-4559-84ca-c9b6abad7eb8)

### Message
![Image](https://github.com/user-attachments/assets/c4b09f76-01cb-466f-a07b-beaf37c88378)
