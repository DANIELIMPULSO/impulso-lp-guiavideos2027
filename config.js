// Configurações da landing page. É o único arquivo que precisa ser editado para colocar a página no ar.
window.LP = {
  // RD Station Marketing > Configurações da conta > Integrações > Tokens > "Token Público".
  // Vazio = modo de teste: o formulário não envia nada e só leva à página de agradecimento.
  rdToken: '07ddf930fcb3d6ec8f952ef44a4277f7',

  // Código de monitoramento do RD Station (Configurações > Integrações > Código de monitoramento):
  // só o endereço do script, ex.: 'https://d335luupugsy2.cloudfront.net/js/loader-scripts/xxxx-loader.js'.
  // Opcional: registra a origem do tráfego e as visitas do lead.
  rdMonitoramento: '',

  // Nome da conversão que aparece no RD Station (use o mesmo na automação que envia o PDF por e-mail).
  conversao: 'lp-guia-planejamento-audiovisual-2027',

  // Campos personalizados do RD Station (opcional). O identificador começa com "cf_".
  // Vazio = porte e objetivo vão só como tags no lead (porte-..., objetivo-...).
  campoPorte: 'cf_porte_da_empresa_atualizado_26',
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
