# HomeBrain — Plataforma Inteligente de Aprendizado

Uma plataforma modular e escalável para compartilhar conteúdo educativo (eBooks, audiobooks, vídeos, cursos) com trilhas de estudo personalizadas, sistema de categorias e player integrado.

---

## 🚀 Como Começar

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/homebrain.git
cd homebrain
```

### 2. Abrir localmente

Abra `index.html` no navegador ou use um servidor local:

```bash
# Python 3
python -m http.server 8000

# Node.js (se instalado)
npx http-server
```

Acesse `http://localhost:8000`

---

## 📚 Como Adicionar Conteúdo

### Arquivo Principal: `content.js`

Todos os dados da plataforma são gerenciados em um único arquivo: **`content.js`**

Isso permite que você adicione novos produtos, trilhas e categorias sem tocar no código.

#### ✅ Vantagens:
- ✨ Único arquivo para toda a plataforma
- 🔄 Alterações refletem automaticamente em todas as páginas
- 🎨 Suporta imagens em tempo real (Unsplash ou hospedagem própria)
- 🔐 Nenhum arquivo de configuração ou senha exposto

---

## 🆕 Adicionar um Novo Produto

Abra `content.js` e localize o array `products:`. Copie este template:

```javascript
{
  id: "seu-produto-unico",           // sem espaços, use hífens
  title: "Título do Produto",
  author: "Nome do Autor",
  category: "Desenvolvimento Pessoal", // deve existir em categories
  type: "ebook",                      // ebook | audiobook | video | curso
  price: 49.90,
  priceFormatted: "R$ 49,90",
  image: "https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=600&q=80",
  description: "Descrição curta (1 linha)",
  fullDescription: "Descrição longa com detalhes sobre o produto...",
  rating: 4,                          // 1 a 5
  reviews: 324,                       // número de reviews
  featured: true,                     // aparece na homepage?
  tags: ["tag1", "tag2", "tag3"],
  chapters: [
    {
      title: "Capítulo 1",
      duration: "24:38",
      text: "Conteúdo completo do capítulo ou descrição...",
    },
    // ... mais capítulos
  ],
}
```

Pronto! O produto aparecerá automaticamente em:
- ✅ Homepage (se `featured: true`)
- ✅ Categorias
- ✅ Página de detalhe do produto
- ✅ Trilhas (se linkado)

---

## 🛤️ Adicionar uma Nova Trilha

Localize o array `trails:` em `content.js`:

```javascript
{
  id: "foco-disciplina",              // ID único
  title: "Foco e Disciplina",
  description: "Desenvolva foco profundo...",
  category: "Mente",                  // categoria da trilha
  level: "Iniciante",                 // Iniciante | Intermediário | Avançado
  image: "https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=600&q=80",
  lessons: 12,                        // total de aulas
  completed: 6,                       // aulas concluídas (ajuste conforme progresso)
  productIds: [
    "produtividade-maxima",           // IDs dos produtos da trilha
    "inteligencia-emocional"
  ],
}
```

Os `productIds` devem referenciar produtos que existem no array `products`.

---

## 🏷️ Adicionar uma Categoria

Localize o array `categories:` em `content.js`:

```javascript
{
  id: "minha-categoria",              // ID único
  name: "Minha Categoria",
  color: "#FF6B6B",                   // cor em hex
  image: "https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&w=400&q=80",
}
```

---

## 🖼️ Sobre as Imagens

### Opção 1: Usar Unsplash (Grátis, de Qualidade)

```
https://images.unsplash.com/photo-XXXXXXX?auto=format&fit=crop&w=600&q=80
```

Acesse [unsplash.com](https://unsplash.com), escolha uma foto e copie a URL.

**Exemplo:**
```
https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80
```

### Opção 2: Hospedagem Própria

1. Crie uma pasta `/img/` no projeto
2. Coloque suas imagens nela: `/img/meu-produto.jpg`
3. Na URL, use: `/img/meu-produto.jpg`

---

## 📖 Estrutura de Arquivos

```
homebrain/
├── index.html              # Homepage
├── produto.html            # Página de detalhe do produto (dinâmica)
├── categorias.html         # Página de categorias (dinâmica)
├── trilhas.html            # Página de trilhas (dinâmica)
├── login.html              # Autenticação
├── planos.html             # Planos de preço
├── styles.css              # Estilos globais
├── pages.css               # Estilos de páginas internas
├── script.js               # Scripts da homepage
├── content.js              # ⭐ ARQUIVO PRINCIPAL DE CONTEÚDO
├── .gitignore              # Git ignore
└── README.md               # Este arquivo
```

---

## 🔐 Segurança

✅ **O que NÃO está exposto:**
- Senhas ou chaves de API
- Credenciais de banco de dados
- Informações sensíveis

✅ **Boas práticas:**
1. Não commit `.env` ou arquivos com senhas
2. Use variáveis de ambiente para dados sensíveis
3. Mantenha as credenciais em um `.env` local (já na `.gitignore`)

---

## 🚀 Publicar no GitHub Pages

### 1. Criar repositório no GitHub

1. Acesse [github.com/new](https://github.com/new)
2. Nomeie como `homebrain`
3. Escolha "Public"
4. Clique "Create repository"

### 2. Conectar repositório local

```bash
cd d:\HOMEBRAIN
git remote add origin https://github.com/seu-usuario/homebrain.git
git branch -M main
git push -u origin main
```

### 3. Ativar GitHub Pages

1. Vá para Settings → Pages
2. Escolha "Deploy from a branch"
3. Selecione branch `main` e pasta `/ (root)`
4. Salve

Seu site estará disponível em:
```
https://seu-usuario.github.io/homebrain
```

---

## 🛠️ Tecnologia

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Dados:** JSON em `content.js`
- **Imagens:** URLs do Unsplash ou hospedadas localmente
- **Hospedagem:** GitHub Pages (gratuito)
- **Versionamento:** Git

---

## 📝 Exemplo Completo: Adicionar um Produto

**Antes (content.js vazio):**
```javascript
products: []
```

**Depois (com 1 produto):**
```javascript
products: [
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Desenvolvimento Pessoal",
    type: "ebook",
    price: 45.90,
    priceFormatted: "R$ 45,90",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80",
    description: "Foco profundo no mundo digital",
    fullDescription: "A capacidade de fazer deep work — trabalho focado e valioso — é cada vez mais rara e valiosa...",
    rating: 5,
    reviews: 892,
    featured: true,
    tags: ["produtividade", "foco", "trabalho"],
    chapters: [
      { title: "O que é Deep Work", duration: "20:00", text: "Deep work é..." },
    ],
  }
]
```

Salve o arquivo. Recarregue o navegador. Pronto! ✨

---

## 💬 Suporte

Se tiver dúvidas ou encontrar problemas:

1. Verifique se os IDs em `productIds` existem em `products`
2. Verifique se as URLs de imagem estão corretas (não 404)
3. Verifique se as categorias em `products[].category` existem em `categories`
4. Abra o console (F12) e procure por erros

---

## 📄 Licença

HomeBrain © 2026. Todos os direitos reservados.

---

**Boa sorte com o HomeBrain! 🚀**
