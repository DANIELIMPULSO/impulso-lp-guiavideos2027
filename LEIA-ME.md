# Landing page: guia de planejamento de conteúdo audiovisual 2027

Página de captura do guia gratuito da Impulso Filmes, no visual do site novo (mockup em `impulso-site-mockup`).

| Arquivo | O que é |
|---|---|
| `index.html` | Landing page |
| `obrigado.html` | Página de agradecimento (pós-envio) |
| `config.js` | **Único arquivo a editar**: token do RD Station, campos, link do PDF, WhatsApp |
| `base.css` | Cópia do `style.css` do mockup (identidade aprovada) |
| `lp.css`, `lp.js` | Estilos e comportamento próprios da landing page |

## Para ligar ao RD Station

1. **Token público**: RD Station Marketing > Configurações da conta > Integrações > Tokens. Colar em `rdToken` no `config.js`. Sem token, a página fica em modo de teste (não envia nada e só leva ao agradecimento).
2. **Campos personalizados (opcional)**: porte e objetivo sempre vão como tags no lead (`guia-2027`, `porte-31-a-60`, `objetivo-apoiar-vendas` etc.). Para tê-los também como campos, criar dois campos de lista no RD Station e colocar os identificadores (`cf_...`) em `campoPorte` e `campoObjetivo`:
   - Porte da empresa: 1 a 30, 31 a 60, 61 a 100, 101 a 200, 201 a 500, Mais de 500
   - Objetivo com vídeo em 2027: Fortalecer a marca, Apoiar vendas, Treinar e engajar equipes, Divulgar um lançamento, Ainda estou avaliando
3. **Envio do PDF**: criar uma automação no RD Station com gatilho "converteu em `lp-guia-planejamento-audiovisual-2027`" que manda o e-mail com o PDF.
4. **PDF**: colocar o arquivo nesta pasta como `guia-planejamento-audiovisual-2027.pdf` (ou trocar o link em `pdf`).

Cada envio grava no lead: nome, e-mail, WhatsApp (+55), empresa, cargo, porte, objetivo e a base legal de consentimento (LGPD), que só é enviada com a caixa marcada (ela começa desmarcada e é obrigatória).

## Ao publicar mudanças

Os links de CSS, JS e da arte da capa levam `?v=MMDDHHMM`. Atualize esse número nos dois HTML sempre que mudar um desses arquivos, senão o navegador pode misturar o HTML novo com o CSS antigo guardado em cache.

## Para o desenvolvedor: publicar em www.impulsofilmes.com.br/guia-planejamento-audiovisual/

- A página é estática (HTML, CSS e JS, sem dependências nem build). Basta copiar a pasta inteira para o servidor, mantendo os arquivos juntos: os caminhos são relativos.
- Endereço final já declarado no `index.html` (canonical, Open Graph e dados estruturados): `https://www.impulsofilmes.com.br/guia-planejamento-audiovisual/`.
- Página de agradecimento: `obrigado.html`, na mesma pasta (o formulário redireciona para ela). Ela tem `noindex`. Se o WordPress usar outra URL, trocar `obrigado.html` em `lp.js` (duas ocorrências).
- Se a página for montada dentro de um modelo do WordPress, evitar que o tema injete cabeçalho, rodapé ou CSS próprios: a página já tem os seus.
- Fontes vêm do Google Fonts; imagens, vídeo de fundo e logos vêm de `www.impulsofilmes.com.br/wp-content/uploads/`.
- Incluir o script de monitoramento do RD Station (opcional, mas recomendado): ele grava a origem do tráfego, que o formulário envia junto com a conversão.
- Incluir a página no sitemap do site.
