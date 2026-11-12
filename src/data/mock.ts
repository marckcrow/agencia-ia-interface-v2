// DADOS DE SIMULAÇÃO — apenas para construção visual. Nenhuma integração real.
export const produtos = [
  { id: "ia-na-pratica", nome: "IA na Prática", descricao: "Tutoriais e casos práticos de IA aplicada.", publico: "Profissionais e empreendedores", pecas: 42, pendentes: 3 },
  { id: "voce-sabia", nome: "Você Sabia?", descricao: "Curiosidades rápidas em formato curto.", publico: "Público geral", pecas: 87, pendentes: 5 },
  { id: "poder-50", nome: "Poder 50+", descricao: "Tecnologia e autonomia para pessoas 50+.", publico: "Adultos 50+", pecas: 29, pendentes: 2 },
];
export const agentes = [
  { id: "A1", nome: "Pesquisador", funcao: "Pesquisa de pautas e tendências", status: "ativo", tarefas: 12 },
  { id: "A2", nome: "Roteirista", funcao: "Redação de roteiros e textos", status: "ativo", tarefas: 8 },
  { id: "A3", nome: "Revisor", funcao: "Checagem de fatos e revisão", status: "aguardando", tarefas: 4 },
  { id: "A4", nome: "Designer", funcao: "Criação de artes e miniaturas", status: "ativo", tarefas: 6 },
  { id: "A5", nome: "Editor de Vídeo", funcao: "Montagem audiovisual", status: "pausado", tarefas: 2 },
  { id: "A6", nome: "Distribuidor", funcao: "Preparação para publicação (manual)", status: "aguardando", tarefas: 5 },
];
export const aprovacoes = [
  { id: 1, titulo: "5 ferramentas de IA para pequenos negócios", produto: "IA na Prática", agente: "A2", tipo: "Roteiro" },
  { id: 2, titulo: "Você sabia que o primeiro e-mail foi enviado em 1971?", produto: "Você Sabia?", agente: "A3", tipo: "Post curto" },
  { id: 3, titulo: "Como usar o WhatsApp com segurança", produto: "Poder 50+", agente: "A5", tipo: "Vídeo" },
  { id: 4, titulo: "Miniatura: Automação sem código", produto: "IA na Prática", agente: "A4", tipo: "Arte" },
];
export const calendario = [
  { dia: 3, titulo: "Automação sem código", produto: "IA na Prática" },
  { dia: 5, titulo: "Curiosidade: Wi-Fi", produto: "Você Sabia?" },
  { dia: 9, titulo: "Golpes digitais", produto: "Poder 50+" },
  { dia: 12, titulo: "Prompts eficientes", produto: "IA na Prática" },
  { dia: 16, titulo: "Curiosidade: QR Code", produto: "Você Sabia?" },
  { dia: 21, titulo: "Videochamada fácil", produto: "Poder 50+" },
  { dia: 25, titulo: "IA no atendimento", produto: "IA na Prática" },
];
export const biblioteca = [
  { titulo: "Guia de prompts básicos", produto: "IA na Prática", formato: "Artigo", status: "Aprovado" },
  { titulo: "Origem do Bluetooth", produto: "Você Sabia?", formato: "Post curto", status: "Rascunho" },
  { titulo: "Banco digital sem medo", produto: "Poder 50+", formato: "Vídeo", status: "Em revisão" },
  { titulo: "Chatbots para lojas", produto: "IA na Prática", formato: "Vídeo", status: "Aprovado" },
  { titulo: "Por que o céu é azul?", produto: "Você Sabia?", formato: "Carrossel", status: "Em revisão" },
];
export const execucoes = [
  { hora: "15:02", agente: "A1", evento: "Pesquisa concluída: 14 pautas", nivel: "ok" },
  { hora: "14:47", agente: "A2", evento: "Roteiro gerado para revisão", nivel: "ok" },
  { hora: "14:30", agente: "A5", evento: "Renderização pausada manualmente", nivel: "alerta" },
  { hora: "14:11", agente: "A3", evento: "Checagem falhou: fonte indisponível", nivel: "erro" },
  { hora: "13:58", agente: "A4", evento: "3 miniaturas criadas", nivel: "ok" },
];
export const integracoes = [
  { nome: "API do sistema original (Node.js)", descricao: "Agentes, conteúdos e fila de execução" },
  { nome: "Armazenamento de mídia", descricao: "Vídeos, áudios e imagens" },
  { nome: "Redes sociais", descricao: "Publicação manual assistida" },
  { nome: "Notificações", descricao: "Alertas da Sala de Direção" },
];
