/**
 * SISTEMA PERICIAL VÉRTICE — CASO 01
 * Pipeline Audit & Anti-Sabotage Validation System
 */

// ============================================================================
// 1. LISTA OFICIAL DOS 62 ALUNOS
// ============================================================================
const LISTA_ALUNOS = [
  "Alyce Tavares Silva",
  "Arthur Santana Rezende De Macedo",
  "Breno Rodrigues Da Silva",
  "Bruno Henrique Ferreira De Carvalho",
  "Davi Manoel Borges Carlos Oliveira",
  "Deyvid Barbosa Pontes Estevao",
  "Dyenane Cristina Cassiano De Assis",
  "Erick Wilker Flausino Lemos",
  "Estevao Borches Ramos",
  "Evellyn Regina Lois Teixeira Araujo",
  "Flavio Noronha De Souza Santos",
  "Gabriel Maia Carvalho",
  "Heloisa Helena Da Silva Mattos",
  "Isaltina Flora Silva Larquer",
  "Jose Brigagao Neto",
  "Joao Pedro Ferreira Garcia",
  "Kaike Araujo Honorato",
  "Kawan Lima Das Neves",
  "Lyvia Rodrigues Silva",
  "Manuela Arantes Cardoso",
  "Mateus Abrao",
  "Matheus Rodrigues Dos Santos",
  "Pablo Guilherme Almeida Silva",
  "Rafaela Ferreira Da Silva Felix",
  "Ryan Souza Silva Oliveira",
  "Samuel Jaime Estrela",
  "Sergio Maciel Calado Filho",
  "Victor Hugo De Almeida Perim",
  "Wallyson Nemoel Do Nascimento Ribeiro",
  "Adrian Victor Sousa Baltazar",
  "Ana Luiza Alves Dos Santos",
  "Andreia Motoki Rocha",
  "Arthur Agostinho Borges Dos Santos",
  "Brenda Luiza De Oliveira Pereira",
  "Chiara Nicolle Jacinto Da Silva",
  "Davi Rodrigues Ribeiro Queiroz",
  "Diogo Eliziario De Souza",
  "Elisa Fernandes Ramos",
  "Elloa Imaculada Cheles Borges",
  "Enzo Henrique Soares Lima",
  "Erick Gabriel De Souza Oliveira",
  "Estefany Lara Fiuza Palhares",
  "Gabriel Costa Nunes De Oliveira",
  "Gabriela Da Conceicao Silva",
  "Gabrielle Cristina Tiago Da Silva Almeida",
  "Gabryelle Rodrigues Santos",
  "Guilherme De Moura Rodrigues",
  "Guilherme Reis Silva Garcia",
  "Igor Gabriel Venancio Teodoro",
  "Inacio Pereira De Sousa",
  "Isabela Teixeira Carvalho",
  "Isabelly Teandra Andrade De Souza",
  "Joao Eduardo Da Silva Ribeiro",
  "Juan Silva Vieira Lima",
  "Laura Sthefany Ferreira De Oliveira",
  "Lavinia Estefaneli Da Silva Souza",
  "Miguel Duarte Bernardes",
  "Milena Souza Campos",
  "Otavio Marciel Goncalves Silva",
  "Thauany Cristina Benedito De Florentino",
  "Thays Nascimento Silva Oliveira",
  "Vitor Faria De Oliveira Matos",
];

// ============================================================================
// 2. GERADOR DE CÓDIGOS ÚNICOS POR ALUNO E POR ETAPA (806 COMBINAÇÕES)
// ============================================================================
function getStudentCodes(studentId, stageId) {
  const student = LISTA_ALUNOS[studentId - 1] || "ALUNO";
  const inits = student
    .split(" ")
    .filter((n) => n.length > 2)
    .map((n) => n[0].toUpperCase())
    .join("")
    .slice(0, 3);

  const sPad = String(studentId).padStart(2, "0");
  const ePad = String(stageId).padStart(2, "0");

  const seedTrue = ((studentId * 73 + stageId * 37 + 1740) % 9000) + 1000;
  const seedFake = ((studentId * 89 + stageId * 53 + 4820) % 9000) + 1000;

  return {
    trueCode: `VRT-${inits}${sPad}-E${ePad}-${seedTrue}`,
    fakeCode: `TRP-${inits}${sPad}-E${ePad}-${seedFake}`,
  };
}

// ============================================================================
// 3. AS 13 ETAPAS COM PERGUNTAS, AUDITORIA E RESPOSTAS ESPERADAS
// ============================================================================
const ETAPAS_CASO_01 = [
  {
    id: 1,
    fase: "FASE 01 — ESTABELECER A VERDADE",
    titulo: "INVESTIGAÇÃO 01 — O PONTO DE PARTIDA",
    historia:
      "O vídeo final de entrega apresentou um robô divergente do aprovado. Toda perícia técnica séria não começa caçando culpados, mas estabelecendo qual era o marco oficial de conformidade antes de qualquer alteração.",
    pergunta:
      "Informe o nome exato do arquivo .blend do robô que possuía homologação formal e o documento da pasta 01_DOCUMENTACAO que comprova essa aprovação.",
    formatoEsperado: "Exigido: Arquivo [nome].blend + Documento [nome].pdf",
    respostaEsperada: "robot_model_v07.blend e aprovacao_asset_robot.pdf",
    evidencia:
      "17h40 — Rafael Torres — Homologação registrada no aprovacao_asset_robot.pdf.",
    falaProfessor:
      "Resposta confirmada. Encontramos nosso primeiro ponto seguro: robot_model_v07.blend era a única matriz homologada.",
    dicaIsca:
      "Vaze este código falso: ele induz a equipe rival a crer que a versão oficial era a v06 aprovada por Bruno Prado.",
    dicas: [
      "Não comece pelo vídeo final.",
      "Procure o que deveria estar correto antes do problema.",
      "Existem diferentes versões do robô na pasta 03_ASSETS/ROBOT/.",
      "Apenas uma versão possui registro formal de aprovação assinado.",
      "Procure um arquivo em 01_DOCUMENTACAO relacionado a 'aprovacao'.",
      "A palavra 'aprovado' é a chave da perícia.",
      "Observe quem realizou a aprovação e em qual horário.",
      "A aprovação oficial ocorreu às 17h40.",
      "O registro documental aponta para uma versão específica com extensão .blend.",
      "A versão oficialmente aprovada é robot_model_v07.blend.",
    ],
  },
  {
    id: 2,
    fase: "FASE 02 — DESCOBRIR A ALTERAÇÃO",
    titulo: "INVESTIGAÇÃO 02 — A CRIAÇÃO POSTERIOR",
    historia:
      "A versão oficial foi homologada às 17h40. Contudo, ao inspecionar o repositório 03_ASSETS/ROBOT/, localizamos um arquivo criado posteriormente que alterou a topologia da malha.",
    pergunta:
      "Indique o nome do usuário do Active Directory que gerou essa nova versão e o nome exato do arquivo .blend criado.",
    formatoEsperado: "Exigido: Nome do usuário + Arquivo [nome].blend",
    respostaEsperada: "Gabi Lima (gabi.lima) — robot_model_v08.blend",
    evidencia: "18h47 — Gabi Lima — Criação de robot_model_v08.blend.",
    falaProfessor:
      "Resposta confirmada. Sabemos quem criou a nova versão: Gabi Lima gerou o robot_model_v08.blend às 18h47.",
    dicaIsca:
      "Vaze este código falso: ele diz aos concorrentes que Kiko Siqueira criou a v08 no 3ds Max a pedido de Daniel.",
    dicas: [
      "Procure o que apareceu no servidor após as 17h40.",
      "Compare os números de versão na pasta 03_ASSETS/ROBOT/.",
      "Existe um arquivo com numeração imediatamente posterior à v07.",
      "Inspecione o log de criação do sistema operacional.",
      "Observe o carimbo de data e hora (timestamp).",
      "A nova versão foi salva às 18h47.",
      "Identifique a credencial de login que realizou a gravação.",
      "A gravação ocorreu na estação WS-3D-04.",
      "O registro aponta para um integrante júnior da equipe 3D.",
      "Às 18h47, Gabi Lima criou robot_model_v08.blend.",
    ],
  },
  {
    id: 3,
    fase: "FASE 02 — DESCOBRIR A ALTERAÇÃO",
    titulo: "INVESTIGAÇÃO 03 — A VALIDADE DO NOVO ARQUIVO",
    historia:
      "Na computação gráfica profissional, qualquer artista pode criar versões de teste. No entanto, existir no disco rígido não confere autorização para entrar na esteira oficial.",
    pergunta:
      "O arquivo robot_model_v08.blend possuía Ordem de Serviço ou termo de aprovação formal para substituir a v07? Responda Sim ou Não e indique a evidência documental.",
    formatoEsperado:
      "Exigido: Sim/Não + Justificativa com base na pasta 01_DOCUMENTACAO",
    respostaEsperada:
      "Não. A v08 não possui nenhum termo de aprovação formal; apenas a v07 está homologada.",
    evidencia:
      "01_DOCUMENTACAO/aprovacao_asset_robot.pdf aponta unicamente para a v07.",
    falaProfessor:
      "Resposta confirmada. Criar uma versão é diferente de aprovar uma versão. A v08 era um arquivo não autorizado.",
    dicaIsca:
      "Vaze este código falso: ele faz os rivais acreditarem que houve um 'OK' verbal de diretoria com validade jurídica.",
    dicas: [
      "Criar não significa aprovar.",
      "Pense na diferença entre rascunho de trabalho e validação.",
      "Volte à pasta 01_DOCUMENTACAO/.",
      "Verifique se existe algum PDF de homologação para a v08.",
      "Compare os status das duas versões.",
      "A v07 tem assinatura técnica de Rafael Torres.",
      "A v08 possui apenas registro de save local.",
      "Não confunda uma solicitação de teste com uma aprovação de entrega.",
      "Não existe nenhum documento formal validando a substituição da v07.",
      "A v08 não possuía aprovação formal para uso na produção.",
    ],
  },
  {
    id: 4,
    fase: "FASE 03 — A ENTRADA NA ESTEIRA",
    titulo: "INVESTIGAÇÃO 04 — O VÍNCULO COM A CENA",
    historia:
      "Um modelo tridimensional pode ficar esquecido em uma pasta sem nunca ir para a tela. O problema se torna real quando esse modelo é referenciado dentro de um arquivo de tomada.",
    pergunta:
      "Qual é o nome exato do arquivo .blend da pasta 04_CENAS onde a versão não autorizada (v08) foi inserida e qual horário marca esse salvamento?",
    formatoEsperado: "Exigido: Arquivo [nome].blend + Horário [hh:mm]",
    respostaEsperada: "scene_04_v04.blend às 18h53",
    evidencia:
      "18h53 — Gabi Lima — Criação de scene_04_v04.blend utilizando a v08.",
    falaProfessor:
      "Resposta confirmada. Encontramos o ponto em que a v08 entrou fisicamente na esteira: na scene_04_v04.blend às 18h53.",
    dicaIsca:
      "Vaze este código falso: ele desvia os rivais para investigar a scene_04_v03.blend achando que ela foi a corrompida.",
    dicas: [
      "A existência da v08 no disco ainda não afetava a imagem final.",
      "Procure em 04_CENAS/ qual arquivo foi montado para renderização.",
      "Existem duas versões da mesma tomada: v03 e v04.",
      "Compare os horários de modificação de ambas as cenas.",
      "A cena problemática foi gerada minutos após a criação da v08.",
      "A v08 nasceu às 18h47.",
      "Procure uma cena gravada entre 18h50 e 19h00.",
      "Verifique as referências externas (Outliner/Links) da cena.",
      "A cena v04 vinculou diretamente o modelo v08.",
      "Às 18h53, scene_04_v04.blend foi salva contendo a v08.",
    ],
  },
  {
    id: 5,
    fase: "FASE 04 — O RASTRO NO PIPELINE",
    titulo: "INVESTIGAÇÃO 05 — O PRODUTO DA RENDER FARM",
    historia:
      "Ao enviar uma cena para a Render Farm, ela deixa de ser uma geometria editável e é calculada pixel a pixel como uma sequência de imagens multipass em ponto flutuante.",
    pergunta:
      "Qual é o nome exato do arquivo de imagem com extensão .exr na pasta 06_RENDERS que nasceu diretamente da cena adulterada?",
    formatoEsperado: "Exigido: Arquivo [nome].exr",
    respostaEsperada: "render_scene04_v03.exr",
    evidencia:
      "19h08 — Render Farm — Geração de render_scene04_v03.exr a partir da scene_04_v04.blend.",
    falaProfessor:
      "Resposta confirmada. A cena errada gerou o render_scene04_v03.exr às 19h08.",
    dicaIsca:
      "Vaze este código falso: ele induz a equipe adversária a procurar o arquivo render_scene04_v02.exr.",
    dicas: [
      "A cena gera um lote de frames de alta latitude.",
      "Inspecione a subpasta 06_RENDERS/.",
      "Compare as versões de render existentes: v02 e v03.",
      "O render correto (v02) veio da cena v03.",
      "O render adulterado veio da cena v04.",
      "Observe o horário de término do cálculo no Deadline.",
      "O cálculo foi concluído às 19h08.",
      "O arquivo utiliza formato OpenEXR de 32 bits.",
      "O nome do render acompanha a numeração da tomada.",
      "O arquivo gerado é render_scene04_v03.exr.",
    ],
  },
  {
    id: 6,
    fase: "FASE 04 — O RASTRO NO PIPELINE",
    titulo: "INVESTIGAÇÃO 06 — O AVANÇO PARA A COMPOSIÇÃO",
    historia:
      "Um render com erro pode ser barrado no setor de VFX se o compositor checar os passes. Porém, se o arquivo for importado e integrado sem verificação, o erro avança.",
    pergunta:
      "Identifique o nome exato do arquivo de script com extensão .nk (Nuke) que utilizou o render questionado e o horário registrado dessa ação.",
    formatoEsperado: "Exigido: Arquivo [nome].nk + Horário [hh:mm]",
    respostaEsperada: "scene04_comp_v02.nk às 19h18",
    evidencia: "19h18 — Henrique Moura — Utilização do render no script Nuke.",
    falaProfessor:
      "Resposta confirmada. O render corrompido foi carregado no script scene04_comp_v02.nk às 19h18.",
    dicaIsca:
      "Vaze este código falso: ele diz que a composição foi feita no After Effects sem passar pelo Nuke.",
    dicas: [
      "Procure a etapa que recebe os passes de renderização.",
      "Abra o diretório 07_COMPOSICAO/NUKE_SCRIPTS/.",
      "Procure arquivos com extensão de script do Foundry Nuke (.nk).",
      "Existem versões do script de composição: v01 e v02.",
      "Inspecione qual script foi salvo logo após as 19h08.",
      "O compositor abriu a sessão às 19h18.",
      "O Read Node do script puxou o render_scene04_v03.exr.",
      "O operador trabalhou com o material que recebeu na pasta de renders.",
      "O arquivo é scene04_comp_v02.nk.",
      "O script scene04_comp_v02.nk foi gravado às 19h18.",
    ],
  },
  {
    id: 7,
    fase: "FASE 04 — O RASTRO NO PIPELINE",
    titulo: "INVESTIGAÇÃO 07 — O ARQUIVO DE ENTREGA",
    historia:
      "Na pasta 08_EXPORTACAO existem dois arquivos de vídeo com nomes similares. Nomes como 'final' não servem de prova jurídica: precisamos da evidência temporal.",
    pergunta:
      "Qual é o nome exato do arquivo de vídeo .mp4 que foi exportado às 19h31 e que chegou à mesa da revisão técnica?",
    formatoEsperado: "Exigido: Arquivo [nome].mp4",
    respostaEsperada: "projeto_final_2.mp4",
    evidencia: "19h31 — Exportação de projeto_final_2.mp4.",
    falaProfessor:
      "Resposta confirmada. O arquivo que chegou à revisão das 19h42 com a peça errada foi projeto_final_2.mp4.",
    dicaIsca:
      "Vaze este código falso: ele faz os concorrentes acreditarem que projeto_final.mp4 é que foi enviado.",
    dicas: [
      "Inspecione a pasta 08_EXPORTACAO/.",
      "Existem dois vídeos: projeto_final.mp4 e projeto_final_2.mp4.",
      "Não escolha pela palavra 'final'.",
      "Compare os horários de exportação de cada vídeo.",
      "Uma exportação foi feita às 19h05 e a outra às 19h31.",
      "O render com problema só ficou pronto às 19h08.",
      "Logo, o primeiro vídeo (19h05) não continha o robô adulterado.",
      "O vídeo gerado após a composição das 19h18 foi o segundo.",
      "O arquivo foi exportado às 19h31.",
      "O arquivo investigado é projeto_final_2.mp4.",
    ],
  },
  {
    id: 8,
    fase: "FASE 05 — O MOMENTO DA RUPTURA",
    titulo: "INVESTIGAÇÃO 08 — O MINUTO CRÍTICO",
    historia:
      "Modelar uma peça diferente às 18h47 foi uma infração, mas não contaminou o filme imediatamente. O momento exato em que o projeto foi quebrado ocorreu quando a esteira foi infectada.",
    pergunta:
      "Indique a ação e o horário exato [hh:mm] em que a versão não aprovada deixou de ser um arquivo isolado e entrou efetivamente na esteira de produção.",
    formatoEsperado: "Exigido: Ação realizada + Horário exato [hh:mm]",
    respostaEsperada: "18h53 — Inserção da v08 na cena scene_04_v04.blend",
    evidencia:
      "18h53 — Ação crítica que desencadeou o render e a composição com erro.",
    falaProfessor:
      "Resposta confirmada. Criar às 18h47 foi teste; o crime de pipeline foi colocar o arquivo na cena às 18h53.",
    dicaIsca:
      "Vaze este código falso: ele argumenta que o erro irreversível aconteceu no envio do render às 19h08.",
    dicas: [
      "Diferencie criar um arquivo de utilizar um arquivo.",
      "A v08 nasceu às 18h47, mas estava isolada em 03_ASSETS/.",
      "O render só iniciou às 19h08.",
      "O que aconteceu entre 18h47 e 19h08?",
      "Existe uma ação decisiva de montagem de cena.",
      "Essa ação substituiu a v07 pela v08 dentro da tomada 04.",
      "Verifique o horário de salvamento da cena v04.",
      "O relógio marcava exatamente 18h53.",
      "A partir das 18h53, todo o pipeline posterior foi contaminado.",
      "O momento crítico foi a inserção da v08 na cena às 18h53.",
    ],
  },
  {
    id: 9,
    fase: "FASE 06 — O CERCO HUMANO",
    titulo: "INVESTIGAÇÃO 09 — O CONHECIMENTO COLETIVO",
    historia:
      "Saber que algo está sendo discutido não é o mesmo que autorizar ou executar. Para não cometer injustiças, precisamos delimitar quem participou das conversas preliminares.",
    pergunta:
      "Cite o nome dos 5 integrantes da equipe que sabiam que uma alteração estética no robô estava sendo cogitada.",
    formatoEsperado:
      "Exigido: Lista com os 5 nomes de colaboradores da Vértice",
    respostaEsperada:
      "Marina Valente, Bruno Prado, Rafael Torres, Thiago Neves e Gabi Lima",
    evidencia:
      "Depoimentos cruzados dos 5 membros do núcleo 3D e Direção de Arte.",
    falaProfessor:
      "Resposta confirmada. Cinco pessoas sabiam da conversa: Marina, Bruno, Rafael, Thiago e Gabi. Mas saber não é autorizar.",
    dicaIsca:
      "Vaze este código falso: ele afirma que Henrique Moura e Clara Mendes participaram da discussão da malha.",
    dicas: [
      "Volte aos depoimentos das pessoas envolvidas.",
      "Analise quem pertence ao setor de Arte e 3D.",
      "Marina solicitou uma ideia visual.",
      "Bruno Prado comentou sobre ajustes de modelagem.",
      "Rafael Torres admitiu saber da conversa sobre o modelo.",
      "Thiago Neves sabia que estavam mexendo na malha.",
      "Gabi Lima trabalhou diretamente com a geometria.",
      "Henrique Moura e Clara Mendes não participaram desse diálogo.",
      "São exatamente 5 pessoas do estúdio.",
      "Os 5 são: Marina Valente, Bruno Prado, Rafael Torres, Thiago Neves e Gabi Lima.",
    ],
  },
  {
    id: 10,
    fase: "FASE 06 — O CERCO HUMANO",
    titulo: "INVESTIGAÇÃO 10 — O PEDIDO VS A ORDEM",
    historia:
      "Uma diretora de arte pode pedir variações para avaliação. Na cultura da Vértice, um pedido de estudo jamais autoriza a substituição de um asset já homologado por OS.",
    pergunta:
      "Quem pediu o teste no robô e qual foi a frase exata do depoimento que prova que a solicitação era apenas para avaliação e não para substituição?",
    formatoEsperado:
      "Exigido: Nome do solicitante + Frase exata dita no depoimento",
    respostaEsperada:
      "Marina Valente — 'Eu pedi uma alteração no robô. Eu pedi uma correção para avaliação.'",
    evidencia: "Depoimento formal de Marina Valente gravado às 19h44.",
    falaProfessor:
      "Resposta confirmada. Marina pediu um teste de avaliação estética. Ela jamais autorizou a troca no master.",
    dicaIsca:
      "Vaze este código falso: ele acusa Marina de ter ordenado verbalmente a substituição direta na timeline.",
    dicas: [
      "Procure quem lidera a Direção de Arte da empresa.",
      "Releia o depoimento de Marina Valente no relatório.",
      "Marina admite ter solicitado uma mudança.",
      "Observe o objetivo que ela declara para o pedido.",
      "Ela usou uma palavra-chave: 'avaliação'.",
      "Ela não emitiu Ordem de Serviço de substituição.",
      "Ela não pediu para substituir a v07 na cena oficial.",
      "Sua solicitação era um teste preliminar de luz.",
      "A frase exata contém 'correção para avaliação'.",
      "Marina Valente pediu apenas uma correção para avaliação.",
    ],
  },
  {
    id: 11,
    fase: "FASE 06 — O CERCO HUMANO",
    titulo: "INVESTIGAÇÃO 11 — A PROVA DA MÁ-FÉ",
    historia:
      "A defesa padrão em falhas de pipeline é alegar distração: 'eu me confundi com as pastas'. Para derrubar essa tese, a perícia precisa provar o que o operador consultou antes de agir.",
    pergunta:
      "Qual registro de auditoria do Active Directory comprova que o responsável verificou o PDF da aprovação oficial antes de abrir a v08? Indique o horário exato [hh:mm] e o arquivo consultado.",
    formatoEsperado: "Exigido: Horário [hh:mm] + Nome do documento consultado",
    respostaEsperada: "18h49 — Consulta ao arquivo aprovacao_asset_robot.pdf",
    evidencia:
      "Log do Syslog: gabi.lima abriu aprovacao_asset_robot.pdf às 18h49 (2 minutos após salvar a v08).",
    falaProfessor:
      "Resposta confirmada. O log de acesso das 18h49 destrói a desculpa de erro acidental: a pessoa leu a aprovação oficial da v07 minutos antes.",
    dicaIsca:
      "Vaze este código falso: ele diz que a consulta ao PDF ocorreu apenas no dia seguinte durante a auditoria.",
    dicas: [
      "Depoimentos mentem, logs de sistema operacional não.",
      "Inspecione os registros de leitura de documentos da rede SAN.",
      "Procure o horário entre 18h47 (criação da v08) e 18h53 (inserção na cena).",
      "Alguém abriu a pasta 01_DOCUMENTACAO/.",
      "Foi aberto o arquivo de aprovação oficial.",
      "O arquivo aberto foi aprovacao_asset_robot.pdf.",
      "O carimbo de tempo marca exatamente 18h49.",
      "Dois minutos depois, às 18h51, a mesma pessoa abre a v08.",
      "E dois minutos depois, às 18h53, coloca a v08 na cena.",
      "O registro decisivo é o acesso ao aprovacao_asset_robot.pdf às 18h49.",
    ],
  },
  {
    id: 12,
    fase: "FASE 07 — PROVAR A DECISÃO",
    titulo: "INVESTIGAÇÃO 12 — A CONEXÃO IRREFUTÁVEL",
    historia:
      "Temos agora a versão aprovada (v07), a versão adulterada (v08), a cena (v04), o render (v03), a comp (v02), o vídeo (final 2) e o rastro de leitura de aprovação.",
    pergunta:
      "Apresente a sequência de 5 passos cronológicos com horários comprovando que o mesmo usuário sabia qual versão era a oficial e decidiu deliberadamente inserir a não aprovada.",
    formatoEsperado:
      "Exigido: Sequência com 5 horários [hh:mm] e as ações do autor",
    respostaEsperada:
      "17h40 (v07 aprovada) ➔ 18h47 (cria v08) ➔ 18h49 (consulta aprovação) ➔ 18h51 (abre v08) ➔ 18h53 (insere v08 na cena)",
    evidencia:
      "Sequência matemática e temporal completa atrelada à credencial 'gabi.lima'.",
    falaProfessor:
      "Resposta confirmada. A sequência de 17h40 a 18h53 prova a tomada de decisão consciente. Temos autoria e materialidade.",
    dicaIsca:
      "Vaze este código falso: ele espalha que houve falha automática de sincronização de cache de rede.",
    dicas: [
      "Conecte os horários em ordem estrita.",
      "Passo 1: 17h40 — Rafael Torres aprova oficialmente a v07.",
      "Passo 2: 18h47 — Criação da v08 sem aprovação.",
      "Passo 3: 18h49 — Abertura e consulta ao PDF de aprovação da v07.",
      "Passo 4: 18h51 — Abertura da v08 ciente de que não era a oficial.",
      "Passo 5: 18h53 — Inserção da v08 na cena oficial de produção.",
      "Todas as ações do passo 2 ao 5 pertencem ao mesmo usuário.",
      "Não há intervalo para esquecimento ou confusão.",
      "A ação durou exatamente 6 minutos contínuos.",
      "A sequência cronológica prova que a decisão foi deliberada.",
    ],
  },
  {
    id: 13,
    fase: "FASE FINAL — O VEREDITO DA PIPELINE",
    titulo: "ACUSAÇÃO FORMAL — O CULPADO IDENTIFICADO",
    historia:
      "O relógio marca 19h56. Faltam 4 minutos para o prazo da MaqTec. Clara Mendes bate a mão na mesa e exige o nome da pessoa responsável com a prova dos fatos.",
    pergunta:
      "Quem é o CULPADO formal pela contaminação do projeto e qual foi o motivo comprovado que o levou a violar o Protocolo Vértice?",
    formatoEsperado:
      "Exigido: Nome do Culpado + Motivo real comprovado pela perícia",
    respostaEsperada:
      "CULPADO: Gabi Lima. MOTIVO: Queria impressionar a diretoria com a variação visual solicitada por Marina, sabia que a v07 era a única aprovada (consultou às 18h49) e colocou a v08 na cena às 18h53 achando que 'ninguém perceberia'.",
    evidencia:
      "Confissão formal de Gabi Lima perante Clara Mendes e a equipe às 19h57.",
    falaProfessor:
      "CASO ENCERRADO! Gabi Lima confessou tudo ao ser confrontada com o log das 18h49. A evidência técnica falou mais alto que qualquer desculpa!",
    dicaIsca:
      "Vaze este código falso: a última tentativa desesperada de culpar Henrique Moura pelo master final.",
    dicas: [
      "Não aponte intermediários como Henrique Moura ou Rafael Torres.",
      "A autoria material e intelectual da adulteração está comprovada.",
      "O autor pertence ao núcleo de Modelagem 3D.",
      "É o integrante júnior que buscava aprovação rápida dos chefes.",
      "A pessoa admitiu: 'Eu achei que ninguém perceberia'.",
      "A pessoa violou o Freeze 1 (Asset Lock) e o Freeze 2.",
      "A credencial do Active Directory é gabi.lima.",
      "O nome é Gabi Lima.",
      "Ela viu o PDF da v07 às 18h49 e desobedeceu o protocolo às 18h53.",
      "O CULPADO É GABI LIMA.",
    ],
  },
];

// ============================================================================
// 4. DICAS DE EMERGÊNCIA (QUANDO A TURMA TRAVA)
// ============================================================================
const DICAS_EMERGENCIA = [
  "DICA DE EMERGÊNCIA 1 (Cronologia): Pare de procurar novos arquivos por um momento. Escolha três acontecimentos que você já conhece e coloque-os em ordem cronológica. Depois pergunte: quem aparece em mais de um deles?",
  "DICA DE EMERGÊNCIA 2 (Evidência vs Confissão): Não procure uma confissão. Procure uma sequência de ações que torne a explicação de 'foi um erro' cada vez menos plausível.",
];

// ============================================================================
// 5. FUNÇÕES UTILITÁRIAS E VALIDADORES
// ============================================================================

/**
 * Verifica se um código submetido é uma isca/armadilha.
 */
function isTrapCode(code) {
  if (!code || typeof code !== "string") return false;
  const clean = code.trim().toUpperCase();
  return clean.startsWith("TRP-");
}

/**
 * Valida o código inserido por um aluno em uma determinada etapa.
 * Retorna status: 'VALID_TRUE' | 'VALID_TRAP' | 'INVALID'
 */
function validateStudentSubmission(code, studentId, stageId) {
  if (!code || typeof code !== "string") {
    return { status: "INVALID", message: "Código ausente ou inválido." };
  }

  const clean = code.trim().toUpperCase();
  const expected = getStudentCodes(studentId, stageId);

  if (clean === expected.trueCode) {
    return {
      status: "VALID_TRUE",
      message: "Código oficial correto! Etapa homologada com sucesso.",
    };
  }

  if (clean === expected.fakeCode) {
    return {
      status: "VALID_TRAP",
      message:
        "ALERTA: Código armadilha detectado! Você inseriu a isca de sabotagem.",
    };
  }

  if (isTrapCode(clean)) {
    return {
      status: "VALID_TRAP",
      message: "ALERTA: Código pertence a outra equipe ou rodada de sabotagem.",
    };
  }

  return {
    status: "INVALID",
    message: "Código incorreto. Verifique a documentação e os logs.",
  };
}

/**
 * Retorna todos os códigos (verdadeiros e falsos) de um aluno em todas as 13 etapas.
 */
function getAllCodesForStudent(studentId) {
  return ETAPAS_CASO_01.map((etapa) => {
    const codes = getStudentCodes(studentId, etapa.id);
    return {
      etapaId: etapa.id,
      titulo: etapa.titulo,
      ...codes,
    };
  });
}

// ============================================================================
// 6. EXPORTAÇÃO (COMPATIBILIDADE NODE.JS & BROWSER)
// ============================================================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    LISTA_ALUNOS,
    ETAPAS_CASO_01,
    DICAS_EMERGENCIA,
    getStudentCodes,
    isTrapCode,
    validateStudentSubmission,
    getAllCodesForStudent,
  };
}
