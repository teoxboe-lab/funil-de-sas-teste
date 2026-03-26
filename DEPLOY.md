# IA Funnel — Deploy na Vercel

## PASSO 1 — Banco de dados (Supabase — grátis)

1. Acesse https://supabase.com → "New Project"
2. Anote: Settings → Database → Connection String → **URI**
3. Substitua `[YOUR-PASSWORD]` pela senha que você definiu

---

## PASSO 2 — Google OAuth

1. Acesse https://console.cloud.google.com
2. APIs & Services → Credentials → Create → OAuth 2.0 Client ID
3. Authorized redirect URIs — adicione as duas:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://SEU-PROJETO.vercel.app/api/auth/callback/google`
4. Copie o **Client ID** e **Client Secret**

---

## PASSO 3 — Chave Anthropic

1. Acesse https://console.anthropic.com
2. API Keys → Create Key
3. Copie a chave `sk-ant-...`

---

## PASSO 4 — Subir no GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/ia-funnel.git
git push -u origin main
```

---

## PASSO 5 — Deploy na Vercel

1. Acesse https://vercel.com → "Add New Project"
2. Importe o repositório do GitHub
3. Em **Environment Variables**, adicione todas as do `.env.example`:

| Variável | Valor |
|---|---|
| `DATABASE_URL` | String do Supabase |
| `NEXTAUTH_SECRET` | Resultado de: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://SEU-PROJETO.vercel.app` |
| `ANTHROPIC_API_KEY` | `sk-ant-...` |
| `GOOGLE_CLIENT_ID` | Do Google Console |
| `GOOGLE_CLIENT_SECRET` | Do Google Console |

4. Clique em **Deploy** ✅

---

## PASSO 6 — Criar as tabelas no banco

Após o primeiro deploy, rode localmente com o `.env.local` preenchido:

```bash
npm install
npx prisma generate
npx prisma db push
```

---

## ✅ Checklist final

- [ ] Supabase criado e `DATABASE_URL` copiado
- [ ] Google OAuth configurado com redirect URI da Vercel
- [ ] `NEXTAUTH_SECRET` gerado (`openssl rand -base64 32`)
- [ ] `ANTHROPIC_API_KEY` configurado
- [ ] Todas as vars adicionadas na Vercel
- [ ] `npx prisma db push` rodado
- [ ] URL da Vercel adicionada no Google Console como redirect URI

---

## 🛠 Desenvolvimento local

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
# Acesse http://localhost:3000
```
