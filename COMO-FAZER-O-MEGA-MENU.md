# Como montar o mega menu no WordPress (Elementor Pro)

Passo a passo para recriar no WordPress o menu da v2: ao passar o mouse em **Sectors** ou **Services**,
abre um painel largo com um título pequeno em terracota e os links em 3 colunas, separados por linhas finas.

> Para ver como deve ficar, abra `Site-HTML-v2/index.html` no navegador e passe o mouse em "Sectors".

> ⚠️ O Elementor muda o nome de alguns botões entre versões. Se algum nome abaixo estiver um pouco diferente,
> procure a opção com sentido parecido. Os nomes aparecem em inglês porque é assim que o painel do Elementor costuma vir.

---

## Antes de começar (5 minutos)

1. **Elementor e Elementor Pro instalados, ativos e atualizados.** O mega menu é do **Pro**.
2. Em **Elementor → Settings → Features**, confirme que **Nested Elements** está como *Active*.
   (Nas versões recentes já vem ativo. Sem isso, o widget de mega menu não aparece.)
3. As páginas de cada setor e serviço já precisam existir (mesmo vazias), com os mesmos endereços do site atual
   (`/banking-and-finance`, `/deep-cleaning` etc.), para você conseguir escolher os links.
4. As **Global Colors** e **Global Fonts** já configuradas (Site Settings), porque o menu usa elas.

---

## Passo 1: Criar o cabeçalho

1. No painel do WordPress: **Templates → Theme Builder → Header → Add New**.
2. Dê o nome **Header principal** e clique em **Create Template**.
3. Feche a janela de modelos prontos (o "X" no canto). Você vai montar do zero.
4. Monte o container do cabeçalho como está no `GUIA-ELEMENTOR.md` (seção 3): largura **1360px** (*Boxed*), altura mínima **112px**,
   fundo branco. Coloque o **logo** à esquerda.

> **Importante:** o container do cabeçalho precisa estar com **Content Width: Full Width**.
> É ele que define a largura do painel do mega menu.

---

## Passo 2: Colocar o widget certo

1. No painel da esquerda, busque por **Menu** e arraste o widget para o cabeçalho, ao lado do logo.

> ⚠️ Use o widget chamado **Menu**, e **não** o "Nav Menu" (ou "Menu de navegação"), que é o antigo.
> Só o novo tem a opção de mega menu. Os itens ficam dentro do próprio widget, não em *Aparência → Menus*.

---

## Passo 3: Cadastrar os itens do menu

Na aba **Content → Menu Items**, deixe os itens nesta ordem (use **Add Item** para criar novos):

| Item | Link |
|---|---|
| Home | `/` |
| About Us | `/about` |
| Sectors | `/#sectors` |
| Services | `/#services` |
| Blog | `/blog` |
| Contact | `/contact` |
| 0406 750 746 | `tel:+61406750746` |
| 0431 155 594 | `tel:+61431155594` |

Agora o ponto principal:

1. Abra o item **Sectors** e ligue a opção **Dropdown Content** (conteúdo suspenso).
2. Faça o mesmo no item **Services**.

Isso cria um "painel vazio" embaixo de cada um desses itens, onde você monta o conteúdo.

---

## Passo 4: Montar o painel de Sectors

1. No editor, clique no item **Sectors** dentro do widget. Aparece logo abaixo um espaço vazio
   ("arraste o widget aqui"). Esse é o painel.
2. Selecione o **container** desse painel e configure:
   - **Direction:** coluna (vertical)
   - **Padding:** `32px` em cima, `48px` embaixo (laterais: as do container padrão)
   - **Content Width:** *Boxed*, **1360px** (a mesma largura do cabeçalho, para os links alinharem com o logo)
   - **Background:** branco
   - **Box Shadow:** horizontal `0`, vertical `26`, blur `40`, spread `-14`, cor `rgba(41,77,93,0.2)`
   - **Border:** só em cima, 1px, cor **Tint** (`#F1F5F7`)
3. **Título pequeno:** arraste um widget **Heading** para dentro do painel.
   - Texto: `Cleaning sectors`
   - **HTML Tag: `span` ou `p`** (não use H2/H3, senão o Google vai ler esse título como um título de verdade em todas as páginas)
   - Tipografia: Quicksand, **12.5px**, peso **500**, **Transform: Uppercase**, **Letter Spacing: 1.2px**
   - Cor: **Accent** (`#D26D51`)
   - Espaço embaixo: 12px
4. **As 3 colunas:** arraste um **container** para dentro do painel, abaixo do título.
   - **Direction:** linha (horizontal) · **Gap:** `64px`
   - Dentro dele, crie **3 containers** (um por coluna), cada um com **largura 33%**.
5. **Os links:** em cada coluna, coloque um widget **Icon List**.
   - Em cada item: escreva o nome e coloque o link da página. No ícone, escolha **None** (sem ícone).
   - Divida os 13 setores assim:

   | Coluna 1 | Coluna 2 | Coluna 3 |
   |---|---|---|
   | Banking and Finance | Healthcare & Medical Centre | TV, Radio & Film Studio |
   | Car dealership & Showroom | Property Management | Church & Community Centre |
   | Business Office | Public Sector | Residential Homes |
   | Hospitality & Accommodation | Retail, Gym and Leisure | |
   | Professional Practice | School & Education | |

   - Na aba **Style** do Icon List:
     - **Divider: Yes**, estilo sólido, espessura **1px**, cor `#E6EDF0` (são as linhas entre os itens)
     - **Space Between:** `24px` (12px acima e 12px abaixo de cada link)
     - **Text:** Quicksand **14.5px**, peso **400**, cor **Primary**; cor no **Hover: Accent**
   - O divisor do Icon List só desenha linha **entre** os itens. Para ter linha também embaixo do último,
     vá em **Advanced → Border** do widget e coloque **só embaixo**, 1px, `#E6EDF0`.

---

## Passo 5: Montar o painel de Services

O painel é igual ao de Sectors, então não precisa montar de novo:

1. Clique com o botão direito no **container do painel de Sectors** → **Copy**.
2. Clique no item **Services**, botão direito no painel vazio → **Paste**.
3. Troque o título para `Cleaning services` e os links para os 6 serviços, **2 por coluna**:

   | Coluna 1 | Coluna 2 | Coluna 3 |
   |---|---|---|
   | Builder’s Cleaning | Deep Cleaning | Window Cleaning |
   | Upholstery and Carpet Cleaning | Exit Cleaning | Carpark and Facade Cleaning |

---

## Passo 6: Configurar como o menu abre

Selecione o widget **Menu** inteiro e, na aba **Content**, procure a parte de **Dropdown** / **Settings**:

| Opção | Valor |
|---|---|
| **Content Width** (largura do conteúdo suspenso) | **Full Width** (largura total) |
| **Open Dropdown** (abrir ao) | **Hover** (passar o mouse) |
| **Dropdown Indicator** (ícone ao lado de Sectors/Services) | uma setinha para baixo (chevron) |
| **Breakpoint** (quando vira menu de celular) | **Tablet (1024px)** |

Na aba **Style**:
- **Menu Items:** fonte global **Body**, cor **Primary**, espaço entre itens **32px**
- **Pointer** (efeito ao passar o mouse): **Underline**, 1px, cor Primary
- **Dropdown / Animation:** **Fade**

Os dois telefones devem ficar em **negrito (peso 700)**. Se o widget não deixar mudar só esses dois itens,
tire os telefones do menu e coloque como um widget **Text Editor** ou **Button** ao lado.

---

## Passo 7: Ajustar para celular

No celular o menu vira o ícone de três linhas, e o conteúdo do mega menu aparece **dentro** dele quando a
pessoa toca em Sectors/Services. Para não ficar espremido:

1. Mude a visualização do editor para **Mobile** (ícone de celular no rodapé do painel).
2. No container das **3 colunas**, mude **Direction** para **coluna (vertical)** e o **Gap** para `0`.
3. Nas 3 colunas, coloque **largura 100%**.
4. Diminua o padding do painel para `16px` nas laterais.

---

## Passo 8: Publicar no site todo

1. Clique em **Publish**.
2. Em **Add Condition**, escolha **Entire Site** (site inteiro) → **Save & Close**.

---

## Passo 9: Testar (não pule)

- [ ] Passar o mouse em **Sectors**: o painel abre na largura toda, logo abaixo do cabeçalho
- [ ] Levar o mouse **na diagonal** até um link do painel: ele **não pode fechar** no meio do caminho
- [ ] Clicar num link: abre a página certa
- [ ] Passar o mouse num link: fica terracota
- [ ] **Services** abre o painel dele, com os 6 serviços
- [ ] No **celular**: o ícone de três linhas abre o menu e Sectors/Services mostram os links empilhados
- [ ] Testar em outra página (About, Contact): o cabeçalho é o mesmo

---

## Se der problema

| Problema | Solução |
|---|---|
| Não aparece a opção **Dropdown Content** | Você está usando o widget antigo "Nav Menu". Troque pelo widget **Menu**. Se ele não aparecer na busca, ative **Nested Elements** em Elementor → Settings → Features |
| O painel não ocupa a largura toda | Confira **Content Width: Full Width** no widget **e** se o container do cabeçalho também está em largura total |
| O painel fecha antes de o mouse chegar nos links | Teste **Open Dropdown: Click**. Ou verifique se não ficou um espaço vazio entre o cabeçalho e o painel (padding/margem no topo do painel) |
| O painel aparece atrás do conteúdo da página | No container do cabeçalho: **Advanced → Z-Index: 100** |
| Os links ficaram com ícone (bolinha, check) | No Icon List, em cada item, escolha o ícone **None** |
| Não tenho Elementor Pro | Existem plugins gratuitos de mega menu (ex.: o mega menu do **ElementsKit Lite**). O resultado visual é parecido, mas o passo a passo muda. Me avise que eu adapto |
