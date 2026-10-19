// Configurações da landing page. É o único arquivo que precisa ser editado para colocar a página no ar.
window.LP = {
  // RD Station Marketing > Configurações da conta > Integrações > Tokens > "Token Público".
  // Vazio = modo de teste: o formulário não envia nada e só leva à página de agradecimento.
  rdToken: '',

  // Nome da conversão que aparece no RD Station (use o mesmo na automação que envia o PDF por e-mail).
  conversao: 'lp-guia-planejamento-audiovisual-2027',

  // Campos personalizados criados no RD Station (Configurações > Campos personalizados).
  // O identificador começa com "cf_" e precisa ser igual ao cadastrado lá.
  campoPorte: 'cf_porte_da_empresa',
  campoObjetivo: 'cf_objetivo_com_video_em_2027',

  // Link direto do PDF, usado no botão "Baixar agora" da página de agradecimento.
  pdf: 'guia-planejamento-audiovisual-2027.pdf',

  // Vídeo do sócio falando sobre o guia: link do Vimeo, do YouTube ou de um arquivo .mp4.
  // Vazio = mostra "vídeo em breve" no lugar do player.
  video: '',
  // Imagem de capa do player (opcional). Vazio = usa a imagem padrão.
  videoCapa: '',
  socioNome: 'Kiko',
  socioCargo: 'Sócio-diretor · Impulso Filmes',

  whatsapp: 'https://wa.me/553235124803',
  orcamento: 'https://www.impulsofilmes.com.br/orcamento',
  politica: 'https://www.impulsofilmes.com.br/politica-de-privacidade-e-cookies',
};
