/**
 * SISTEMA PERICIAL VÉRTICE & NEXUS — MOTOR DE DADOS MULTI-CASOS
 * Suporte a múltiplos casos forenses, 62 alunos e 806 combinações por caso.
 */

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
// GERADOR DINÂMICO DE CÓDIGOS POR CASO, ALUNO E ETAPA
// ============================================================================
function getStudentCodes(studentId, stageId, caseId = 1) {
  const student = LISTA_ALUNOS[studentId - 1] || "ALUNO";
  const inits = student
    .split(" ")
    .filter((n) => n.length > 2)
    .map((n) => n[0].toUpperCase())
    .join("")
    .slice(0, 3);

  const sPad = String(studentId).padStart(2, "0");
  const ePad = String(stageId).padStart(2, "0");

  const prefixTrue = caseId === 1 ? "VRT" : "NXS";
  const prefixFake = caseId === 1 ? "TRP" : "SAB";

  const caseSeedOffset = caseId === 1 ? 1740 : 2890;
  const seedTrue =
    ((studentId * 73 + stageId * 37 + caseSeedOffset) % 9000) + 1000;
  const seedFake =
    ((studentId * 89 + stageId * 53 + caseSeedOffset + 3100) % 9000) + 1000;

  return {
    trueCode: `${prefixTrue}-${inits}${sPad}-E${ePad}-${seedTrue}`,
    fakeCode: `${prefixFake}-${inits}${sPad}-E${ePad}-${seedFake}`,
  };
}

function isTrapCode(code) {
  if (!code || typeof code !== "string") return false;
  const clean = code.trim().toUpperCase();
  return clean.startsWith("TRP-") || clean.startsWith("SAB-");
}

// ============================================================================
// BASE DE DADOS DOS CASOS
// ============================================================================
const DADOS_CASOS = {
  // ==========================================================================
  // CASO 01: OPERAÇÃO ÚLTIMO FRAME
  // ==========================================================================
  1: {
    id: 1,
    tituloCurto: "Caso 01: Operação Último Frame",
    empresa: "Vértice Produções Digitais",
    cliente: "MaqTec Industrial S.A.",
    projeto: "VRT-MAQ-2026-017",
    dossieUrl: "caso01-historia.html",
    culpado: "Gabi Lima",
    motivoCurto:
      "Injetou robot_model_v08.blend às 18h53 após checar aprovação da v07 às 18h49 para impressionar a diretoria.",
    teatro: {
      culpadoNome: "Gabi Lima",
      acusadorNome: "Clara Mendes",
      falaDefesa:
        "— Eu achei que aquela alteração que a Marina comentou na copa já pudesse ser colocada na timeline...",
      falaConfissaoMeio:
        "— Eu vi o termo de aprovação... Eu li que a v07 era a única versão aprovada no ERP. E mesmo assim, às 18h53, eu abri a cena quatro e engatei a v08.",
      perguntaClara:
        "— Por que você fez isso, sabendo que violava o Freeze 1 do Protocolo Vértice?",
      falaConfissaoFinal:
        "— Eu queria adiantar o processo... Achei que o braço pareado duplo ia ficar esteticamente muito superior na tela, a Marina ia adorar e, na correria do prazo das oito da noite, ninguém na revisão iria abrir a árvore da SAN para conferir número de versão... Eu achei que ninguém perceberia.",
    },
    logsTerminal: [
      "> 19h42: Entrega suspensa por inconsistência no asset do robô.",
      "> 19h42: Clara Mendes acionou o protocolo pericial.",
      "> 19h43: Servidor SAN montado em modo somente-leitura.",
      "> 19h44: Histórico do Deadline e logs do Active Directory congelados.",
      "> 19h45: Aguardando homologação dos laudos periciais...",
    ],
    etapas: [
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
        evidencia:
          "19h18 — Henrique Moura — Utilização do render no script Nuke.",
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
        formatoEsperado:
          "Exigido: Horário [hh:mm] + Nome do documento consultado",
        respostaEsperada:
          "18h49 — Consulta ao arquivo aprovacao_asset_robot.pdf",
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
    ],
  },

  // ==========================================================================
  // CASO 02: PROJETO ASA OCULTA — VÉRTICE PRODUÇÕES & AEROTECH SYSTEMS
  // ==========================================================================
  2: {
    id: 2,
    tituloCurto: "Caso 02: Projeto Asa Oculta",
    empresa: "Vértice Produções Digitais",
    cliente: "AeroTech Systems",
    projeto: "FALCON-X — ATX-026",
    dossieUrl: "caso02-historia.html",
    culpado: "Bruno Prado",
    motivoCurto:
      "Substituiu a turbina homologada v04 pela clandestina v05 às 18h53 para inflar seu portfólio com geometria militar secreta, mesmo após ler o PDF de proibição às 18h49.",
    teatro: {
      culpadoNome: "Bruno Prado",
      acusadorNome: "Clara Mendes",
      falaDefesa:
        "— Clara, isso é um absurdo! Eu apenas modelei a v05 como estudo estético a pedido da Marina! Às 18h50 eu fui tomar café na copa. Qualquer um pode ter sentado na WS-3D-07 e linkado na cena!",
      falaConfissaoMeio:
        "— Como você explica o log das 18h49, Bruno? Você abriu o PDF de homologação com o carimbo de patente restrita por 38 segundos na sua tela. E às 19h38 você tentou apagar o cache local do Blender para sumir com os rastros!",
      perguntaClara:
        "— Por que você colocou a empresa na mira de um processo de espionagem industrial militar de R$ 3,2 milhões, Bruno?",
      falaConfissaoFinal:
        "— Aquele bocal cônico v04 era monótono... Uma peça genérica de catálogo industrial! Quando vi as aletas dente-de-tubarão cortando as nuvens no viewport, percebi que aquele seria o plano de abertura da minha próxima demo reel internacional. Eu li a patente às 18h49... Eu sabia do risco. Mas achei que no desespero das oito da noite os engenheiros da AeroTech só olhariam o tracking da câmera e ninguém abriria a árvore de vínculos da SAN.",
    },
    logsTerminal: [
      "> 19h42: Anomalia de patente militar detectada no bocal de exaustão do Drone Falcon-X.",
      "> 19h42: Clara Mendes acionou o Freeze Geral Pericial sob o Protocolo Vértice.",
      "> 19h43: Servidor //VERTICE_STORAGE/ montado em modo somente-leitura por Guga Lima.",
      "> 19h44: Histórico de jobs do Deadline, sessões SMB e logs do Active Directory congelados.",
      "> 19h45: Aguardando homologação dos laudos periciais de engenharia reversa...",
    ],
    etapas: [
      {
        id: 1,
        fase: "FASE 01 — ESTABELECER A VERDADE",
        titulo: "INVESTIGAÇÃO 01 — O MARCO OFICIAL DE CONFORMIDADE",
        historia:
          "Antes de investigar o erro, é necessário estabelecer o estado oficial do projeto. Daniel Azevedo e Clara Mendes alinharam com a equipe que a AeroTech homologou a turbina v04 às 17h40 no documento oficial, proibindo expressamente a divulgação da configuração experimental stealth.",
        pergunta:
          "Qual é o nome exato do arquivo .blend da turbina homologada e qual documento em 01_DOCUMENTACAO comprova sua aprovação jurídica?",
        formatoEsperado: "Exigido: Arquivo [nome].blend + Documento [nome].pdf",
        respostaEsperada:
          "drone_turbine_v04.blend e homologacao_turbina_aerotech.pdf",
        evidencia:
          "17h40:00 — Clara Mendes & Lucas Vasconcelos assinam homologacao_turbina_aerotech.pdf travando a drone_turbine_v04.blend.",
        falaProfessor:
          "Laudo confirmado. Estabelecemos a âncora de conformidade: drone_turbine_v04.blend era o único componente de propulsão homologado sob o Freeze 1.",
        dicaIsca:
          "Vaze este código falso: ele faz a equipe adversária crer que o modelo aprovado era a turbina v03 de Rodrigo Faro.",
        dicas: [
          "Não comece investigando o vídeo das 19h42.",
          "Procure o marco zero da conformidade às 17h40.",
          "Verifique os arquivos da pasta 03_ASSETS/PROPULSAO/.",
          "Apenas uma turbina possui termo assinado na pasta 01_DOCUMENTACAO/.",
          "Consulte o documento de homologação assinado por Clara Mendes e Lucas.",
          "A turbina oficial possui extensão .blend.",
          "A aprovação jurídica ocorreu pontualmente às 17h40.",
          "O documento comprobatório é homologacao_turbina_aerotech.pdf.",
          "O ativo homologado é drone_turbine_v04.blend.",
          "drone_turbine_v04.blend e homologacao_turbina_aerotech.pdf.",
        ],
      },
      {
        id: 2,
        fase: "FASE 02 — DESCOBRIR A ALTERAÇÃO",
        titulo: "INVESTIGAÇÃO 02 — A CRIAÇÃO CLANDESTINA",
        historia:
          "Na estação WS-3D-07, Bruno Prado abriu a drone_turbine_v04.blend, duplicou a geometria, construiu o perfil serrilhado stealth dente-de-tubarão e gravou a nova versão no storage central.",
        pergunta:
          "Quem criou a nova versão e qual foi o nome exato do arquivo gerado?",
        formatoEsperado:
          "Exigido: Login/Nome do usuário + Arquivo [nome].blend",
        respostaEsperada: "bruno.prado (Bruno Prado) — drone_turbine_v05.blend",
        evidencia:
          "18h46:25 — Syslog SMB: gravação de drone_turbine_v05.blend por bruno.prado no host WS-3D-07.",
        falaProfessor:
          "Origem do arquivo isolada: Bruno Prado gravou a drone_turbine_v05.blend às 18h46 em sua estação física WS-3D-07.",
        dicaIsca:
          "Vaze este código falso: diz que Gabriel Lima (gabi.lima) salvou a v05 a pedido de Daniel.",
        dicas: [
          "Consulte o diretório 03_ASSETS/PROPULSAO/.",
          "Localize a versão subsequente à v04 criada quase uma hora depois.",
          "O carimbo de gravação marca exatamente 18h46:25.",
          "Consulte a tabela da Rede Humana para ver quem é o Modelador Lead Hard-Surface.",
          "A estação de trabalho utilizada foi a WS-3D-07.",
          "Identifique qual login gravou o arquivo no servidor.",
          "A credencial do Active Directory é bruno.prado.",
          "O arquivo criado possui extensão .blend e numeração v05.",
          "O nome do arquivo é drone_turbine_v05.blend.",
          "bruno.prado (Bruno Prado) — drone_turbine_v05.blend.",
        ],
      },
      {
        id: 3,
        fase: "FASE 02 — DESCOBRIR A ALTERAÇÃO",
        titulo: "INVESTIGAÇÃO 03 — A VALIDADE CONTRATUAL DA V05",
        historia:
          "Às 18h48, o sistema de auditoria detectou o novo arquivo. Clara Mendes questionou Daniel sobre a existência de autorização ou de formulário de Override formal assinado para substituir a turbina na entrega.",
        pergunta:
          "Existe formulário de Override assinado autorizando a substituição da v04 pela v05?",
        formatoEsperado:
          "Exigido: Sim/Não + Justificativa com base em 01_DOCUMENTACAO",
        respostaEsperada:
          "Não. A v05 não possui termo de Override assinado; o documento solicitacao_estudo_stealth.pdf em 01_DOCUMENTACAO é apenas um estudo interno sem assinaturas de liberação.",
        evidencia:
          "01_DOCUMENTACAO/solicitacao_estudo_stealth.pdf: campos de aprovação técnica e visto de produção sem preenchimento e sem carimbo digital.",
        falaProfessor:
          "Laudo confirmado. Salvar em disco não confere autorização. A v05 era um ativo juridicamente clandestino.",
        dicaIsca:
          "Vaze este código falso: faz os adversários crerem que houve um 'OK' digital assinado por Marina no portal ERP.",
        dicas: [
          "Diferencie teste de viewport de homologação oficial.",
          "Examine a pasta 01_DOCUMENTACAO/.",
          "Abra mentalmente o arquivo solicitacao_estudo_stealth.pdf gerado às 18h20.",
          "Verifique se constam assinaturas válidas da gerência de risco.",
          "O Protocolo Vértice exige assinatura conjunta de Daniel (SDA) e Clara.",
          "O documento está com campos de carimbo digital vazios.",
          "Marina Valente não possui poder de assinatura isolada de aditivos contratuais.",
          "O cliente não foi consultado sobre o estudo stealth.",
          "Sem Ordem de Serviço, o arquivo é juridicamente clandestino.",
          "Não. A v05 não possui termo assinado; o solicitacao_estudo_stealth.pdf é um rascunho sem aprovação.",
        ],
      },
      {
        id: 4,
        fase: "FASE 03 — A ENTRADA NA ESTEIRA",
        titulo: "INVESTIGAÇÃO 04 — A INFECÇÃO DA CENA OFICIAL",
        historia:
          "Bruno Prado abriu o arquivo de cena oficial em 04_CENAS/TAKEOFF/ e alterou o gerenciador de referências externas (External Links), trocando a turbina homologada v04 pelo modelo não autorizado v05.",
        pergunta:
          "Qual arquivo .blend em 04_CENAS/TAKEOFF/ recebeu a referência da v05 e em qual horário ocorreu o salvamento?",
        formatoEsperado: "Exigido: Arquivo [nome].blend + Horário [hh:mm]",
        respostaEsperada: "shot_03_v04.blend às 18h53",
        evidencia:
          "18h53:14 — WS-3D-07: save de shot_03_v04.blend com dependência interna trocada para drone_turbine_v05.blend.",
        falaProfessor:
          "A infecção material ocorreu às 18h53:14! Foi neste exato segundo que a tomada 03 foi envenenada.",
        dicaIsca:
          "Vaze este código falso: desvia a auditoria para investigar a tomada shot_01_v02.blend.",
        dicas: [
          "Vá para o diretório 04_CENAS/TAKEOFF/.",
          "Examine os arquivos da tomada 03 (shot_03).",
          "Existem duas versões dessa tomada: v03 e v04.",
          "A tomada v03 foi gravada às 17h52 com a turbina v04.",
          "A tomada adulterada foi gravada 7 minutos após a criação da turbina v05.",
          "Observe o timestamp do arquivo de cena subsequente.",
          "O horário é exatamente 18h53 (18:53:14).",
          "A cena com o erro foi salva na mesma máquina WS-3D-07.",
          "O arquivo gerado é shot_03_v04.blend.",
          "shot_03_v04.blend às 18h53.",
        ],
      },
      {
        id: 5,
        fase: "FASE 04 — O RASTRO NO PIPELINE",
        titulo: "INVESTIGAÇÃO 05 — O PROCESSAMENTO NA RENDER FARM",
        historia:
          "O gerenciador Deadline recebeu a cena adulterada e o cluster de GPUs executou o cálculo de iluminação e geometria sem interpretar contratos, gerando a sequência de frames OpenEXR de 32 bits.",
        pergunta:
          "Qual arquivo .exr foi gerado e qual foi o horário de conclusão do Job na Render Farm?",
        formatoEsperado: "Exigido: Arquivo [nome].exr + Horário [hh:mm]",
        respostaEsperada: "render_shot03_v03.exr às 19h08",
        evidencia:
          "19h08:15 — Cluster Deadline finaliza Job #99140 gravando render_shot03_v03.[0001-0240].exr em 06_RENDERS/ACEScg/shot_03_v03/.",
        falaProfessor:
          "A render farm não julga legalidade: ela calculou os 240 frames com a turbina stealth às 19h08:15 sob o Job #99140.",
        dicaIsca:
          "Vaze este código falso: diz que os passes foram processados em GPU local fora do cluster.",
        dicas: [
          "Abra a pasta 06_RENDERS/ACEScg/.",
          "Examine a pasta do render contaminado.",
          "O render anterior correto era a pasta shot_03_v02.",
          "O novo lote recebeu o sufixo v03.",
          "Confira o horário de conclusão no Deadline.",
          "O término do cálculo ocorreu às 19h08 (19:08:15).",
          "O formato gerado foi OpenEXR multipass de 32 bits.",
          "O nome do arquivo segue o padrão render_shot03_v03.exr.",
          "O Job executado foi o #99140.",
          "render_shot03_v03.exr às 19h08.",
        ],
      },
      {
        id: 6,
        fase: "FASE 04 — O RASTRO NO PIPELINE",
        titulo: "INVESTIGAÇÃO 06 — O AVANÇO PELA COMPOSIÇÃO",
        historia:
          "Na suíte de VFX, Beatriz Nogueira abriu o script de composição do Nuke e atualizou o Read Node para carregar a nova sequência EXR entregue pela Farm, ajustando passes de cor e brilho sem abrir a malha 3D.",
        pergunta:
          "Qual o nome do script .nk, o horário de salvamento e o compositor responsável?",
        formatoEsperado:
          "Exigido: Arquivo [nome].nk + Horário [hh:mm] + Compositor(a)",
        respostaEsperada: "shot03_comp_v02.nk às 19h18 por Beatriz Nogueira",
        evidencia:
          "19h18:22 — WS-COMP-01: salvamento de shot03_comp_v02.nk com Read Node conectado em render_shot03_v03 por Beatriz Nogueira.",
        falaProfessor:
          "Confirmado. O setor de VFX manipula pixels e luz. Beatriz confiou que a pasta de renders continha uma cena auditada e avançou com shot03_comp_v02.nk.",
        dicaIsca:
          "Vaze este código falso: acusa Larissa Mendonça de ter feito um retoque 2D deliberado para mascarar o erro.",
        dicas: [
          "Verifique o diretório 07_COMPOSICAO/NUKE/.",
          "Localize a versão 02 do script Nuke (.nk).",
          "O script foi salvo logo após a saída da Farm às 19h08.",
          "O relógio do servidor marcava exatamente 19h18 (19:18:22).",
          "A estação utilizada foi a WS-COMP-01.",
          "A responsável pela ilha é a Lead de Composição.",
          "O nome da compositora é Beatriz Nogueira.",
          "O Read Node importou o render contaminado sem checagem de hash 3D.",
          "O arquivo gerado é shot03_comp_v02.nk.",
          "shot03_comp_v02.nk às 19h18 por Beatriz Nogueira.",
        ],
      },
      {
        id: 7,
        fase: "FASE 04 — O RASTRO NO PIPELINE",
        titulo: "INVESTIGAÇÃO 07 — O MASTER DE ENTREGA",
        historia:
          "A suíte de pós concluiu a renderização do vídeo e exportou o arquivo master para o diretório de entregas, disponibilizando-o para a revisão executiva que antecedia o envio final.",
        pergunta: "Qual arquivo .mp4 foi apresentado na reunião de revisão?",
        formatoEsperado: "Exigido: Arquivo [nome].mp4",
        respostaEsperada: "drone_master_v02.mp4",
        evidencia:
          "19h31:05 — Exportação de drone_master_v02.mp4 contendo a turbina adulterada.",
        falaProfessor:
          "Materialidade do flagrante estabelecida: o drone_master_v02.mp4 gerado às 19:31:05 continha a infração travada no frame 6.312.",
        dicaIsca:
          "Vaze este código falso: diz que a inspeção detectou a falha no primeiro vídeo drone_master_v01.mp4.",
        dicas: [
          "Inspecione a pasta 08_EXPORTACAO/MASTERS/.",
          "Existem dois vídeos masters: v01 e v02.",
          "O vídeo v01 foi exportado às 19h06 sem a nova composição.",
          "O vídeo v02 foi gerado após a saída do script do Nuke.",
          "O carimbo de gravação marca 19h31 (19:31:05).",
          "Este vídeo foi congelado às 19h42 por Clara Mendes.",
          "O frame da interrupção foi o 6.312.",
          "O arquivo possui extensão .mp4.",
          "O nome do arquivo é drone_master_v02.mp4.",
          "drone_master_v02.mp4.",
        ],
      },
      {
        id: 8,
        fase: "FASE 05 — O MOMENTO DA RUPTURA",
        titulo: "INVESTIGAÇÃO 08 — O MINUTO DA RUPTURA OPERACIONAL",
        historia:
          "Criar uma malha isolada no disco às 18h46 não contaminou o vídeo. O colapso operacional da Vértice aconteceu no instante exato em que a tomada oficial teve sua dependência externa alterada.",
        pergunta:
          "Qual ação técnica e horário representam o momento exato em que o ativo clandestino infectou o pipeline?",
        formatoEsperado: "Exigido: Ação realizada + Horário exato [hh:mm]",
        respostaEsperada:
          "18h53 — Substituição do link da turbina v04 pela v05 no arquivo de cena shot_03_v04.blend",
        evidencia:
          "18h53:14 — Substituição manual da referência externa de v04 para v05 na tomada 03.",
        falaProfessor:
          "O dano fatal ocorreu ao engatar a v05 na cena às 18h53:14, contaminando toda a esteira subsequente.",
        dicaIsca:
          "Vaze este código falso: sustenta que o crime foi o disparo do render na Farm às 19h08.",
        dicas: [
          "Diferencie criar um arquivo de teste e infectar a esteira oficial.",
          "A v05 existia isolada em 03_ASSETS/ desde 18h46 sem estragar o vídeo.",
          "A Render Farm só processa arquivos contidos em 04_CENAS/.",
          "Procure a alteração na referência externa (External Links) da cena.",
          "Essa modificação foi salva na tomada shot_03_v04.blend.",
          "O horário do relógio marcava exatamente 18h53.",
          "A estação de origem foi a WS-3D-07.",
          "A partir deste instante todo o pipeline posterior foi contaminado.",
          "A ação foi a troca do link relativo para a turbina v05.",
          "18h53 — Substituição do link da turbina v04 pela v05 na cena shot_03_v04.blend.",
        ],
      },
      {
        id: 9,
        fase: "FASE 06 — O CERCO HUMANO",
        titulo: "INVESTIGAÇÃO 09 — O CÍRCULO DO CONHECIMENTO INFORMAL",
        historia:
          "Na copa (zona cega sem câmeras de CFTV), às 18h30, um grupo de colaboradores viu referências visuais de aletas stealth serrilhadas e conversou informalmente sobre o impacto estético na tomada traseira.",
        pergunta:
          "Quais cinco colaboradores sabiam que um estudo stealth havia sido comentado informalmente?",
        formatoEsperado:
          "Exigido: Lista com os 5 nomes de colaboradores da Vértice",
        respostaEsperada:
          "Marina Valente, Daniel Azevedo, Thiago Neves, Juliana Costa e Bruno Prado",
        evidencia:
          "Depoimentos cruzados tomados por Clara Mendes às 19h45 e ata de circulação da copa.",
        falaProfessor:
          "Mapeamento humano exato. Cinco pessoas sabiam da conversa: Marina, Daniel, Thiago, Juliana e Bruno. Mas conversar na copa não confere autorização executiva.",
        dicaIsca:
          "Vaze este código falso: inclui os nomes de Tchelo Ribeiro e Camila Rocha entre os participantes.",
        dicas: [
          "Consulte o mapa social da Copa (Seção 5 da Rede Humana).",
          "Releia a cena das 18h30 no dossiê.",
          "Marina Valente mostrou a foto de referência no tablet.",
          "Thiago Neves (Shading) comentou sobre o perfil agressivo.",
          "Juliana Costa (TD Rig) elogiou o reflexo de luz.",
          "Bruno Prado (Lead Hard-Surface) ofereceu-se para testar.",
          "Daniel Azevedo passou no corredor e ouviu o assunto.",
          "Clara Mendes, Beatriz Nogueira e Henrique Moura não estavam lá.",
          "São exatamente 5 colaboradores do estúdio.",
          "Marina Valente, Daniel Azevedo, Thiago Neves, Juliana Costa e Bruno Prado.",
        ],
      },
      {
        id: 10,
        fase: "FASE 06 — O CERCO HUMANO",
        titulo: "INVESTIGAÇÃO 10 — PEDIDO OU AUTORIZAÇÃO?",
        historia:
          "Uma diretora de arte pode pedir estudos visuais, mas no Protocolo Vértice uma conversa informal jamais anula uma homologação técnica oficial de cliente.",
        pergunta:
          "Quem sugeriu avaliar a silhueta e qual a frase exata do seu depoimento que comprova a finalidade do teste?",
        formatoEsperado:
          "Exigido: Nome do solicitante + Frase exata dita no depoimento",
        respostaEsperada:
          "Marina Valente — 'Eu pedi um teste de silhueta. Eu pedi uma prova de conceito para avaliação interna.'",
        evidencia:
          "Termo de Declaração Gravada de Marina Valente às 19h45 no livro de ocorrências periciais.",
        falaProfessor:
          "A fronteira está nítida: Marina pediu um teste de silhueta para avaliação interna. Jamais autorizou a troca no master da AeroTech.",
        dicaIsca:
          "Vaze este código falso: atribui a Marina uma fala dizendo que autorizou a inclusão se ficasse bonito.",
        dicas: [
          "Procure quem lidera a Direção de Arte da empresa.",
          "Releia a declaração de Marina Valente no depoimento das 19h45.",
          "Ela admite ter solicitado uma variação visual no viewport.",
          "Observe a palavra-chave de finalidade usada por ela: 'avaliação interna'.",
          "Ela destaca que era apenas um teste de silhueta.",
          "Não houve assinatura de formulário de Override.",
          "A frase é composta por duas sentenças breves.",
          "Ambas começam com a locução 'Eu pedi...'.",
          "A frase contém 'prova de conceito para avaliação interna'.",
          "Marina Valente — 'Eu pedi um teste de silhueta. Eu pedi uma prova de conceito para avaliação interna.'",
        ],
      },
      {
        id: 11,
        fase: "FASE 06 — O CERCO HUMANO",
        titulo: "INVESTIGAÇÃO 11 — A PROVA DA INTENÇÃO",
        historia:
          "A tese de esquecimento ou engano acidental foi descartada quando os logs de auditoria do storage revelaram o que o operador consultou em sua estação instantes antes de adulterar a cena.",
        pergunta:
          "Qual registro demonstra que o operador consultou a proibição jurídica antes de alterar a cena?",
        formatoEsperado:
          "Exigido: Horário [hh:mm] + Nome do documento consultado",
        respostaEsperada:
          "18h49 — Consulta ao arquivo homologacao_turbina_aerotech.pdf",
        evidencia:
          "Log SMB //VERTICE_STORAGE/: leitura de homologacao_turbina_aerotech.pdf pelo usuário bruno.prado às 18:49:10 por 38s na WS-3D-07.",
        falaProfessor:
          "A tese de acidente foi destruída! Bruno leu a restrição da patente às 18h49 por 38 segundos. Ele agiu com 100% de consciência da infração!",
        dicaIsca:
          "Vaze este código falso: diz que o PDF foi aberto por varredura automática de antivírus.",
        dicas: [
          "Depoimentos mentem, logs de auditoria do servidor não.",
          "Inspecione os registros entre 18h46 (criação da v05) e 18h53 (save da cena).",
          "A estação WS-3D-07 abriu a pasta 01_DOCUMENTACAO/.",
          "O arquivo consultado continha as cláusulas de patente da AeroTech.",
          "O documento aberto foi homologacao_turbina_aerotech.pdf.",
          "O carimbo de tempo marca pontualmente 18h49.",
          "O arquivo permaneceu aberto na tela por 38 segundos.",
          "O documento continha o carimbo de ativo travado na v04.",
          "Mesmo ciente, o operador trocou a referência quatro minutos depois.",
          "18h49 — Consulta ao arquivo homologacao_turbina_aerotech.pdf.",
        ],
      },
      {
        id: 12,
        fase: "FASE 07 — PROVAR A DECISÃO",
        titulo: "INVESTIGAÇÃO 12 — A CADEIA CRONOLÓGICA",
        historia:
          "A perícia reuniu os registros cronológicos da estação de modelagem que comprovam a sequência deliberada de atos que violaram as diretrizes de produção.",
        pergunta: "Apresente os 5 horários e ações do responsável.",
        formatoEsperado:
          "Exigido: Sequência com os 5 horários [hh:mm] e respectivas ações",
        respostaEsperada:
          "17h40 (Homologação v04) ➔ 18h46 (Criação v05) ➔ 18h49 (Leitura PDF homologação) ➔ 18h51 (Reabertura v05) ➔ 18h53 (Substituição link na cena oficial)",
        evidencia:
          "Trilha temporal consolidada da credencial bruno.prado na estação física WS-3D-07.",
        falaProfessor:
          "Laudo confirmado. A cadeia de 17h40 a 18h53 demonstra dolo operacional e ação premeditada.",
        dicaIsca:
          "Vaze este código falso: espalha que houve colisão de branch no Git LFS do servidor.",
        dicas: [
          "Organize os fatos da WS-3D-07 em ordem estrita de acontecimento.",
          "1º Marco: 17h40 — Homologação da turbina v04 por Daniel e Clara.",
          "2º Marco: 18h46 — Criação da drone_turbine_v05.blend sem autorização.",
          "3º Marco: 18h49 — Leitura de homologacao_turbina_aerotech.pdf por 38s.",
          "4º Marco: 18h51 — Reabertura da malha v05 para checagem de eixos.",
          "5º Marco: 18h53 — Substituição da v04 pela v05 na cena shot_03_v04.blend.",
          "Todas as ações de 2 a 5 foram executadas sob a credencial bruno.prado.",
          "O intervalo total da adulteração durou apenas sete minutos.",
          "A sequência matemática elimina qualquer alegação de confusão fortuita.",
          "17h40 (Homologação v04) ➔ 18h46 (Cria v05) ➔ 18h49 (Lê PDF) ➔ 18h51 (Reabre v05) ➔ 18h53 (Insere na cena).",
        ],
      },
      {
        id: 13,
        fase: "FASE FINAL — O VEREDITO DA PIPELINE",
        titulo: "ACUSAÇÃO FORMAL — O CULPADO IDENTIFICADO",
        historia:
          "Faltam minutos para as 20h00. Clara Mendes exige o relatório conclusivo identificando o culpado e o motivo da adulteração para formalizar as medidas cabíveis.",
        pergunta:
          "Quem foi o responsável pela contaminação do pipeline e qual foi o motivo real da infração?",
        formatoEsperado:
          "Exigido: Nome do Culpado + Motivo real comprovado pela perícia",
        respostaEsperada:
          "CULPADO: Bruno Prado. MOTIVO: Colocou a versão experimental stealth na tomada oficial para inflar seu portfólio pessoal de modelagem Hard-Surface; sabia da proibição jurídica (lida às 18h49) e alterou o link da cena às 18h53 apostando que a modificação passaria despercebida na alta velocidade do voo.",
        evidencia:
          "Confissão de Bruno Prado gravada às 19h56 na presença de Clara Mendes e Daniel Azevedo.",
        falaProfessor:
          "CASO 02 ENCERRADO COM HONRA! A evidência técnica falou mais alto que a soberba artística. O rigor do pipeline salvou a Vértice!",
        dicaIsca:
          "Vaze este código falso: a última tentativa de culpar o setor de composição pelo erro no master.",
        dicas: [
          "Não aponte intermediários como Beatriz Nogueira ou Henrique Moura.",
          "A autoria material ocorreu na ilha de Modelagem 3D.",
          "O operador da estação WS-3D-07 foi Bruno Prado.",
          "O motivo envolvia vaidade artística e exibição em demo reel pessoal.",
          "Ele admitiu acreditar que ninguém notaria o bocal na alta velocidade do voo.",
          "Ele violou o Freeze 1 (Asset Lock) do Protocolo Vértice.",
          "A credencial comprovada nos logs é bruno.prado.",
          "O culpado é Bruno Prado.",
          "Ele leu o PDF às 18h49 e colocou a v05 na cena às 18h53.",
          "O CULPADO É BRUNO PRADO.",
        ],
      },
    ],
  },
};

// Funções utilitárias
function getCaseData(caseId = 1) {
  return DADOS_CASOS[caseId] || DADOS_CASOS[1];
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    LISTA_ALUNOS,
    DADOS_CASOS,
    getCaseData,
    getStudentCodes,
    isTrapCode,
  };
}
