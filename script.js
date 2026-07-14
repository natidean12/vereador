// --- 1. GERENCIADOR DE SEÇÕES (NAVEGAÇÃO) ---
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.content');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Remove classe ativa de todos os botões do menu
    navLinks.forEach(l => l.classList.remove('active'));
    // Adiciona classe ativa no botão clicado
    link.classList.add('active');

    // Esconde todas as seções
    sections.forEach(section => {
      section.classList.remove('visible');
    });

    // Pega o ID do href do botão e exibe a seção correspondente
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      targetSection.classList.add('visible');
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- 2. ACORDEÃO POLIDO (PROJETOS) ---
const accordions = document.querySelectorAll('.accordion');

accordions.forEach((accordion) => {
  accordion.addEventListener('click', function() {
    const panel = this.nextElementSibling;
    
    // Alterna o estado ativo do botão atual
    this.classList.toggle('active');
    
    // Abre ou fecha o painel de forma dinâmica
    if (panel) {
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    }
  });
});

// --- 3. CARROSSEL DE IMAGENS AUTOMÁTICO ---
const carouselImages = document.querySelectorAll('.carousel img');
let carouselIndex = 0;

function rotateCarousel() {
  if (carouselImages.length === 0) return;

  // Tira a classe 'active' da foto atual
  carouselImages[carouselIndex].classList.remove('active');
  
  // Avança o contador para a próxima foto
  carouselIndex = (carouselIndex + 1) % carouselImages.length;
  
  // Insere a classe 'active' na nova foto
  carouselImages[carouselIndex].classList.add('active');
}

// Inicia a rotação a cada 4 segundos
if (carouselImages.length > 0) {
  setInterval(rotateCarousel, 4000);
}

// --- 4. FORMULÁRIO DE CONTATO (FEEDBACK) ---
function handleContactSubmit(event) {
  event.preventDefault(); // Impede o recarregamento padrão da página

  const name = document.getElementById('name').value;
  
  // Feedback visual simulando o sucesso do envio
  alert(`Obrigado pelo contato, ${name}! Sua mensagem foi enviada com sucesso para nossa equipe parlamentar.`);
  
  // Limpa o formulário
  document.getElementById('contactForm').reset();
}

// --- 5. INTELIGÊNCIA ARTIFICIAL DO GABINETE VIRTUAL ---

// Abre/Fecha Janela de Chat
function toggleChat() {
  const chatWindow = document.getElementById('chatWindow');
  if (!chatWindow) return;
  
  if (chatWindow.style.display === "flex") {
    chatWindow.style.display = "none";
  } else {
    chatWindow.style.display = "flex";
  }
}

// Processa a Mensagem do Usuário e Gera Resposta
function handleChatSubmit(event) {
  event.preventDefault();
  
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  if (!chatInput || !chatMessages) return;
  
  const queryText = chatInput.value.trim();
  if (!queryText) return;

  // 1. Renderiza a mensagem do usuário na tela
  appendMessage(queryText, 'user');
  chatInput.value = '';

  // 2. Simula tempo de resposta do Bot
  setTimeout(() => {
    const response = generateBotResponse(queryText);
    appendMessage(response, 'bot');
    
    // Rola para a mensagem mais recente
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 600);
}

// Insere a mensagem no HTML do chat
function appendMessage(text, sender) {
  const chatMessages = document.getElementById('chatMessages');
  if (!chatMessages) return;
  
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}`;
  msgDiv.innerHTML = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Lógica de Busca e Resposta Baseada em Palavras-Chave
function generateBotResponse(query) {
  const text = query.toLowerCase();

  // Busca por Projetos de Lei
  if (text.includes('projeto') || text.includes('lei') || text.includes('proposta')) {
    return `O Coronel Salles teve forte atuação legislativa. Seus principais destaques são:<br><br>
    • <strong>Lei nº 18.106</strong>: Programa Servidor Amigo do Autista.<br>
    • <strong>Plano Municipal de Segurança</strong>: Integrado ao Plano Diretor.<br>
    • <strong>CPI de Fios e Cabos</strong>: Combate ao roubo de cobre.<br><br>
    Gostaria que eu te guiasse até a seção de projetos? Responda com <strong>"ir para projetos"</strong>.`;
  }

  // Busca por Trajetória/Militar
  if (text.includes('trajetória') || text.includes('carreira') || text.includes('militar') || text.includes('comandante') || text.includes('história')) {
    return `A carreira militar do Coronel Salles começou em <strong>1985 na Academia do Barro Branco</strong>. Ele alcançou o cargo de <strong>Comandante-Geral da PM de São Paulo</strong> (2018-2020), liderando mais de 80 mil homens e mulheres.<br><br>
    Quer ver a linha do tempo completa? Pergunte por <strong>"ir para timeline"</strong>.`;
  }

  // Busca por Contato
  if (text.includes('contato') || text.includes('gabinete') || text.includes('email') || text.includes('telefone') || text.includes('endereço')) {
    return `O gabinete do Coronel Salles fica na <strong>Câmara Municipal de São Paulo</strong> (Viaduto Jacareí, 100).<br>
    Você também pode enviar um e-mail para <strong>contato@coronelsalles.com.br</strong>.<br><br>
    Se quiser abrir o formulário na tela, mande <strong>"ir para contato"</strong>!`;
  }

  // Assistente Virtual de Navegação Automática
  if (text.includes('ir para projetos') || text.includes('ver projetos')) {
    triggerSectionNavigation('btnProjetos');
    return "Navegando você até a nossa seção de Projetos... Veja abaixo!";
  }
  if (text.includes('ir para timeline') || text.includes('ver timeline') || text.includes('ver linha do tempo')) {
    triggerSectionNavigation('btnTimeline');
    return "Carregando a nossa Linha do Tempo interativa... Confira!";
  }
  if (text.includes('ir para contato') || text.includes('enviar mensagem')) {
    triggerSectionNavigation('btnContato');
    return "Pronto! Abrindo a nossa seção de Contato para você enviar sua mensagem.";
  }

  // Resposta Padrão
  return `Ainda estou aprendendo a responder sobre isso. Tente perguntar usando termos como:<br>
  • <strong>"Projetos"</strong> (Leis e CPIs)<br>
  • <strong>"Trajetória"</strong> (Carreira militar)<br>
  • <strong>"Contato"</strong> (Como falar com a equipe)<br>
  • Ou peça para navegar: <strong>"Ir para projetos"</strong>!`;
}

// Função auxiliar para clicar no botão de menu correto de forma automática
function triggerSectionNavigation(buttonId) {
  const btn = document.getElementById(buttonId);
  if (btn) btn.click();
}
