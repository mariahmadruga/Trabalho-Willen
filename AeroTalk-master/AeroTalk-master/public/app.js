// =========================================================
// BANCO DE PERGUNTAS E EXERCÍCIOS
// =========================================================
const vocabQuestions=[
  {q:'Como se diz “cartão de embarque”?',o:['Boarding pass','Flight ticket counter','Baggage claim'],a:0},
  {q:'O que significa “aisle seat”?',o:['Assento na janela','Assento no corredor','Assento da frente'],a:1},
  {q:'O que significa “to check a bag”?',o:['Abrir uma mala','Verificar um bilhete','Despachar uma mala'],a:2},
  {q:'O que significa “overhead compartment”?',o:['Compartimento superior para bagagem','Esteira de bagagem','Portão de embarque'],a:0},
  {q:'O que significa “baggage claim”?',o:['Balcão de check-in','Retirada de bagagem','Inspeção de segurança'],a:1},
  {q:'O que significa “connecting flight”?',o:['Voo cancelado','Voo direto','Voo de conexão'],a:2},
  {q:'Como se diz “balança de bagagem”?',o:['Baggage scale','Security tray','Boarding gate'],a:0},
  {q:'O que significa “proceed” em “You may proceed”?',o:['Esperar','Prosseguir','Retornar'],a:1},
  {q:'O que significa “delayed flight”?',o:['Voo lotado','Voo antecipado','Voo atrasado'],a:2},
  {q:'O que significa “last call” no aeroporto?',o:['Última chamada','Último voo do dia','Última mala'],a:0}
];

const opsQuestions=[
  {q:'The flight has 180 ______ on board.',o:['slots','PAX','gates'],a:1},
  {q:'We may lose our departure ______ if we are late.',o:['slot','suitcase','tray'],a:0},
  {q:'Four passengers cannot be accommodated because of ______.',o:['check-in','overbooking','boarding pass'],a:1},
  {q:'The passenger did not arrive at the gate. He is a ______.',o:['no-show','crew rest','ground staff'],a:0},
  {q:'All operational times are being reported in ______ time.',o:['window','Zulu','local seat'],a:1},
  {q:'The crew member is going to the ______ to rest.',o:['baggage claim','crew rest compartment','security tray'],a:1},
  {q:'The ______ team is assisting passengers at the terminal.',o:['ground staff','PAX','slot'],a:0},
  {q:'Attention: there has been a ______ from gate A4 to gate A8.',o:['gate change','no-show','crew rest'],a:0}
];

const fillItems=[
  {q:'Agent: May I see your ______, please?',hint:'Documento usado em viagens internacionais.',a:'passport'},
  {q:'Agent: Please put your suitcase on the ______.',hint:'Objeto usado para medir o peso.',a:'scale'},
  {q:'Passenger: I’d prefer a window ______.',hint:'Significa assento.',a:'seat'},
  {q:'Agent: Here is your boarding ______.',hint:'Documento usado para embarcar.',a:'pass'},
  {q:'Officer: Please place your laptop in the ______.',hint:'Bandeja em inglês.',a:'tray'},
  {q:'Passenger: Where is the boarding ______?',hint:'Local onde você entra no avião.',a:'gate'},
  {q:'Flight attendant: Please fasten your seat ______.',hint:'Cinto de segurança.',a:'belt'},
  {q:'Passenger: Could I have a glass of ______?',hint:'Água em inglês.',a:'water'},
  {q:'Employee: Follow the signs to baggage ______.',hint:'Local de retirada de bagagens.',a:'claim'},
  {q:'Passenger: I have a connecting ______ to Rome.',hint:'Voo em inglês.',a:'flight'}
];

const translations=[
  ['Bom dia. Gostaria de fazer o check-in.',"Good morning. I'd like to check in."],
  ['Posso ver seu passaporte, por favor?','May I see your passport, please?'],
  ['Você prefere janela ou corredor?','Would you prefer a window or an aisle seat?'],
  ['Preciso despachar esta mala.','I need to check this suitcase.'],
  ['Onde fica o portão de embarque?','Where is the boarding gate?'],
  ['O embarque já começou?','Has boarding started yet?'],
  ['Este voo está atrasado?','Is this flight delayed?'],
  ['Por favor, aperte o cinto de segurança.','Please fasten your seat belt.'],
  ['Poderia me trazer um copo de água?','Could you bring me a glass of water?'],
  ['Onde posso retirar minha bagagem?','Where can I collect my luggage?'],
  ['Preciso fazer uma conexão para Londres.','I need to catch a connecting flight to London.'],
  ['O portão de embarque foi alterado.','The boarding gate has been changed.'],
  ['Última chamada para o voo 452.','Last call for flight 452.'],
  ['Por favor, retire os objetos metálicos dos bolsos.','Please remove the metal objects from your pockets.'],
  ['O voo está lotado e há passageiros sem assento disponível.','The flight is full, and there are passengers without an available seat.']
];

// =========================================================
// RENDERIZADORES
// =========================================================
function renderQuiz(id,questions){
  const root=document.getElementById(id);
  if(!root) return;
  root.innerHTML=questions.map((q,i)=>`
    <div class="question" data-q="${i}">
      <p>${i+1}. ${q.q}</p>
      <div class="options">
        ${q.o.map((opt,j)=>`
          <label>
            <input type="radio" name="${id}-${i}" value="${j}">
            <span><strong>${String.fromCharCode(65+j)}.</strong> ${opt}</span>
          </label>
        `).join('')}
      </div>
      <div class="answer" id="${id}-answer-${i}"></div>
    </div>
  `).join('');
}

function gradeQuiz(id,resultId){
  const qs=id==='quizVocabulary'?vocabQuestions:opsQuestions;
  let score=0;
  qs.forEach((q,i)=>{
    const selected=document.querySelector(`input[name="${id}-${i}"]:checked`);
    const box=document.getElementById(`${id}-answer-${i}`);
    const correct=selected && Number(selected.value)===q.a;
    if(correct) score++;
    box.className='answer show '+(correct?'correct':'incorrect');
    box.textContent=(correct?'Correto! ':'Resposta correta: ')+String.fromCharCode(65+q.a)+'. '+q.o[q.a];
  });
  const resEl=document.getElementById(resultId);
  resEl.innerHTML=`Resultado: <strong>${score}/${qs.length}</strong> ${score===qs.length?'— Excelente!':score>=qs.length*.7?'— Bom trabalho!':'— Revise o conteúdo e tente novamente.'}`;
  resEl.style.color = score>=qs.length*.7 ? 'var(--accent)' : 'var(--bad)';
}

function resetQuiz(id,resultId){
  document.querySelectorAll(`#${id} input[type=radio]`).forEach(x=>x.checked=false);
  document.querySelectorAll(`#${id} .answer`).forEach(x=>{x.className='answer';x.textContent=''});
  const resEl=document.getElementById(resultId);
  resEl.textContent='';
}

function renderFill(){
  const root=document.getElementById('fillExercises');
  if(!root) return;
  root.innerHTML=fillItems.map((x,i)=>`
    <div class="question">
      <p>${i+1}. ${x.q}</p>
      <div class="hint">Dica: ${x.hint}</div>
      <input type="text" id="fill-${i}" placeholder="Digite em inglês...">
      <div id="fill-answer-${i}" class="answer"></div>
    </div>
  `).join('');
}

function gradeFill(){
  let score=0;
  fillItems.forEach((x,i)=>{
    const val=document.getElementById('fill-'+i).value.trim().toLowerCase().replace(/[.!?]$/,'');
    const ok=val===x.a;
    if(ok) score++;
    const a=document.getElementById('fill-answer-'+i);
    a.className='answer show '+(ok?'correct':'incorrect');
    a.textContent=(ok?'Correto! ':'') + 'Resposta: '+x.a;
  });
  const res=document.getElementById('fillResult');
  res.textContent=`Respostas corretas: ${score}/${fillItems.length}`;
  res.style.color=score>=fillItems.length*0.7 ? 'var(--accent)' : 'var(--bad)';
}

function resetFill(){
  fillItems.forEach((x,i)=>{
    document.getElementById('fill-'+i).value='';
    const a=document.getElementById('fill-answer-'+i);
    a.className='answer';
    a.textContent='';
  });
  document.getElementById('fillResult').textContent='';
}

function renderTranslations(){
  const root=document.getElementById('translationExercises');
  if(!root) return;
  root.innerHTML=translations.map((x,i)=>`
    <div class="question">
      <p><strong>${i+1}.</strong> ${x[0]}</p>
      <textarea id="translation-${i}" placeholder="Digite sua tradução em inglês..." style="min-height:60px"></textarea>
      <div>
        <button class="secondary" style="padding:5px 12px; font-size:0.8rem;" onclick="toggleAnswer(${i})">Ver / Ocultar Resposta</button>
        <button class="secondary" style="padding:5px 12px; font-size:0.8rem;" onclick="copyText('translation-answer-${i}')">Copiar Resposta</button>
      </div>
      <div id="translation-answer-${i}" class="answer" style="font-weight:600;">${x[1]}</div>
    </div>
  `).join('');
}

function toggleAnswer(i){
  document.getElementById('translation-answer-'+i).classList.toggle('show');
}

function copyText(id){
  const el=document.getElementById(id);
  const text=el.value!==undefined?el.value:el.textContent;
  if(!text.trim()){
    alert('Ainda não há texto para copiar.');
    return;
  }
  navigator.clipboard.writeText(text).then(()=>{
    alert('Texto copiado com sucesso.');
  }).catch(()=>{
    alert('Selecione e copie o texto manualmente.');
  });
}

// =========================================================
// SÍNTESE DE VOZ NATIVA
// =========================================================
function tocarVoz(texto, lang = 'en-US') {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = lang;
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Síntese de voz não suportada pelo navegador.');
  }
}

// =========================================================
// INTEGRAÇÃO COM BACKEND (POSTGRESQL & EXPRESS CRUD)
// =========================================================
async function requisitarApi(url, options = {}) {
  const res = await fetch(url, options);
  const contentType = res.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await res.json() : null;

  if (!res.ok) {
    throw new Error(data?.erro || data?.mensagem || `A requisição falhou (${res.status}).`);
  }

  return data;
}

async function carregarLicoesDoBanco() {
  const container = document.getElementById('listaLicoes');
  if (!container) return;
  container.replaceChildren(criarMensagemLicoes('Carregando lições...'));

  try {
    const licoes = await requisitarApi('/api/licoes');
    if (!Array.isArray(licoes)) {
      throw new Error('A resposta do servidor não contém uma lista de lições válida.');
    }

    if (licoes.length === 0) {
      container.replaceChildren(criarMensagemLicoes('Nenhuma lição salva no banco de dados.'));
      return;
    }

    const itens = licoes.map((licao) => {
      const item = document.createElement('div');
      item.className = 'lesson-item';

      const meta = document.createElement('div');
      meta.className = 'lesson-meta';

      const titulo = document.createElement('h4');
      titulo.textContent = licao.titulo;

      const categoria = document.createElement('span');
      categoria.className = 'lesson-badge';
      categoria.textContent = licao.categoria || 'Geral';

      const excluir = document.createElement('button');
      excluir.className = 'btn-delete-item';
      excluir.type = 'button';
      excluir.textContent = 'Excluir';
      excluir.addEventListener('click', () => deletarLicaoDoBanco(licao.id));

      meta.append(titulo, categoria);
      item.append(meta, excluir);
      return item;
    });

    container.replaceChildren(...itens);
  } catch (err) {
    console.error('Erro ao carregar lições:', err);
    container.replaceChildren(criarMensagemLicoes(
      err.message || 'Não foi possível carregar as lições do servidor.',
      true
    ));
  }
}

function criarMensagemLicoes(texto, isError = false) {
  const mensagem = document.createElement('p');
  mensagem.className = isError ? 'lesson-message error' : 'lesson-message muted';
  mensagem.setAttribute('role', isError ? 'alert' : 'status');
  mensagem.textContent = texto;
  return mensagem;
}

async function salvarLicaoNoBanco(e) {
  e.preventDefault();
  const titulo = document.getElementById('inputLicaoTitulo').value.trim();
  const categoria = document.getElementById('inputLicaoCategoria').value;
  const fb = document.getElementById('licaoFeedback');

  if (!titulo) {
    fb.className = 'form-feedback error';
    fb.textContent = 'Informe o título da lição.';
    return;
  }

  try {
    await requisitarApi('/api/licoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, categoria, conteudos: [] })
    });

    fb.className = 'form-feedback success';
    fb.textContent = 'Lição registrada com sucesso no banco de dados.';
    document.getElementById('inputLicaoTitulo').value = '';
    await carregarLicoesDoBanco();
  } catch (err) {
    fb.className = 'form-feedback error';
    fb.textContent = err.message || 'Não foi possível salvar a lição.';
  }
}

async function deletarLicaoDoBanco(id) {
  if (!confirm('Deseja realmente remover esta lição?')) return;
  try {
    await requisitarApi(`/api/licoes/${encodeURIComponent(id)}`, { method: 'DELETE' });
    await carregarLicoesDoBanco();
  } catch (err) {
    alert(err.message || 'Não foi possível excluir a lição.');
  }
}

// =========================================================
// AUTENTICAÇÃO DO USUÁRIO (REGISTRO / LOGIN / LOGOUT)
// =========================================================
function openAuthModal() {
  document.getElementById('authModal').style.display = 'flex';
  document.getElementById('modal-email').focus();
}

function closeAuthModal() {
  document.getElementById('authModal').style.display = 'none';
  document.getElementById('modal-msg').textContent = '';
}

async function executarRegisto() {
  const email = document.getElementById('modal-email').value.trim();
  const senha = document.getElementById('modal-senha').value;
  const msg = document.getElementById('modal-msg');

  try {
    const data = await requisitarApi('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    msg.className = 'auth-feedback success';
    msg.textContent = data.mensagem || 'Conta criada com sucesso. Faça login para continuar.';
    setTimeout(() => closeAuthModal(), 1200);
  } catch (err) {
    msg.className = 'auth-feedback error';
    msg.textContent = err.message || 'Não foi possível conectar ao servidor.';
  }
}

async function executarLogin() {
  const email = document.getElementById('modal-email').value.trim();
  const senha = document.getElementById('modal-senha').value;
  const msg = document.getElementById('modal-msg');

  try {
    const data = await requisitarApi('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    msg.className = 'auth-feedback success';
    msg.textContent = data.mensagem || 'Login efetuado com sucesso.';
    const usuarioId = data.usuarioId || (data.usuario && data.usuario.id);
    const usuarioEmail = data.email || (data.usuario && data.usuario.email) || email;
    if (usuarioId) localStorage.setItem('usuarioId', usuarioId);
    if (usuarioEmail) localStorage.setItem('usuarioEmail', usuarioEmail);
    atualizarEstadoAuth();
    setTimeout(() => {
      closeAuthModal();
      msg.textContent = '';
    }, 1000);
  } catch (err) {
    msg.className = 'auth-feedback error';
    msg.textContent = err.message || 'Não foi possível conectar ao servidor.';
  }
}

function atualizarEstadoAuth() {
  const authContainer = document.getElementById('authContainer');
  if (!authContainer) return;
  const email = localStorage.getItem('usuarioEmail');
  if (email) {
    const user = document.createElement('span');
    user.className = 'chip chip-user';
    user.textContent = email;

    const logout = document.createElement('button');
    logout.className = 'chip chip-logout';
    logout.type = 'button';
    logout.textContent = 'Sair da conta';
    logout.addEventListener('click', executarLogout);

    authContainer.replaceChildren(user, logout);
  } else {
    const login = document.createElement('button');
    login.className = 'chip chip-auth-btn';
    login.type = 'button';
    login.textContent = 'Entrar / Cadastrar';
    login.addEventListener('click', openAuthModal);
    authContainer.replaceChildren(login);
  }
}

function executarLogout() {
  localStorage.removeItem('usuarioId');
  localStorage.removeItem('usuarioEmail');
  atualizarEstadoAuth();
}

// INICIALIZADOR
document.addEventListener('DOMContentLoaded', () => {
  renderQuiz('quizVocabulary', vocabQuestions);
  renderQuiz('quizOperations', opsQuestions);
  renderFill();
  renderTranslations();
  atualizarEstadoAuth();
  carregarLicoesDoBanco();
});
