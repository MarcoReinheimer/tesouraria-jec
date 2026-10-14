# Tesouraria da Juventude

App web (PWA) para controlar o caixa da juventude: entradas e saídas por evento, saldo em dinheiro e Pix, relatório mensal em Excel e prestação de contas para o WhatsApp.

- **Site:** GitHub Pages (grátis)
- **Banco de dados e login:** Supabase (plano grátis)
- Funciona no celular e pode ser instalado na tela inicial.

## Arquivos

| Arquivo | O que é |
|---|---|
| `index.html` | O app inteiro (telas, regras e Excel) |
| `config.js` | URL e chave do Supabase (você preenche) |
| `manifest.webmanifest`, `sw.js`, `icons/` | Fazem o app instalar no celular |
| `supabase/schema.sql` | Cria as tabelas e as regras de acesso |

---

## Passo 1: Criar o banco no Supabase

1. Entre em <https://supabase.com> e crie um projeto (região **South America (São Paulo)**). Guarde a senha do banco.
2. Abra **SQL Editor > New query**.
3. Abra `supabase/schema.sql`, troque `EMAIL_DA_NAMORADA@gmail.com` e `NOME_DELA` pelos dados dela, cole tudo e clique em **Run**.
4. Vá em **Authentication > Users > Add user > Create new user** e crie um usuário para você e outro para ela (e-mail + senha). Marque **Auto Confirm User**.
5. Vá em **Authentication > Sign In / Providers** e **desligue "Allow new users to sign up"**. Assim ninguém cria conta sozinho.
6. Vá em **Project Settings > API** e copie:
   - **Project URL**
   - chave **anon** / **publishable**

## Passo 2: Configurar o app

Abra `config.js` e cole os dois valores:

```js
window.TESOURARIA_CONFIG = {
  url: "https://abcdefgh.supabase.co",
  anonKey: "eyJhbGciOi..."
};
```

> A chave **anon** pode ficar pública no GitHub: quem protege os dados são as regras do `schema.sql`.
> **Nunca** coloque a chave `service_role` neste arquivo.

## Passo 3: Subir no GitHub

1. Em <https://github.com/new>, crie um repositório, por exemplo `tesouraria-juventude` (pode ser **Public**; o GitHub Pages grátis exige repositório público).
2. Clique em **uploading an existing file** e arraste **todos os arquivos e pastas** deste projeto (incluindo `icons/` e `supabase/`). Clique em **Commit changes**.
3. Vá em **Settings > Pages**. Em **Source**, escolha **Deploy from a branch**, branch **main**, pasta **/ (root)**, e salve.
4. Em 1 ou 2 minutos o site fica no ar em:
   `https://SEU-USUARIO.github.io/tesouraria-juventude/`

## Passo 4: Ligar o link no Supabase (para "Esqueci minha senha")

Em **Authentication > URL Configuration**:
- **Site URL:** `https://SEU-USUARIO.github.io/tesouraria-juventude/`
- **Redirect URLs:** adicione o mesmo endereço.

## Passo 5: Instalar no celular

- **Android (Chrome):** abra o link > menu ⋮ > **Instalar app** / **Adicionar à tela inicial**.
- **iPhone (Safari):** abra o link > botão Compartilhar > **Adicionar à Tela de Início**.

---

## Liberar ou tirar acesso de alguém

No Supabase, **Table Editor > membros**:
- `papel = editor`: lança, edita e exclui.
- `papel = leitor`: só vê (bom para padre ou coordenação).

A pessoa também precisa de um usuário em **Authentication > Users** com o mesmo e-mail. Para tirar o acesso, apague a linha dela em `membros`.

## Atualizar o app depois

Edite o arquivo no GitHub (ou suba de novo) e, em `sw.js`, aumente a versão (`tesouraria-v1` para `tesouraria-v2`). Assim os celulares pegam a versão nova.

## Backup

Além do Excel completo pelo app, você pode exportar no Supabase em **Table Editor > lancamentos > Export > CSV**. O plano grátis do Supabase pausa projetos sem uso por 7 dias; se acontecer, basta entrar no painel e clicar em **Restore**. Os dados não se perdem.
