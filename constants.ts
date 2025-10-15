import { CharacterId, RelationshipCharacterId, StatId, type Character, type Stats, type Scene, type Ending, Relationships, ShopItem, RelationshipMood } from './types.ts';

export const CHARACTERS: Record<CharacterId, Character> = {
  [CharacterId.RUY]: {
    id: CharacterId.RUY,
    name: 'Ruy',
    image: 'https://i.imgur.com/b3WM3Mw.png',
    biography: 'Advogado por formação, malabarista de boletos por necessidade. Ruy vive em um delicado equilíbrio entre o Código Penal e a pomada para micose. Sonha com um caso que pague o aluguel e uma noite de sono sem coceira.',
  },
  [CharacterId.LINDINHA]: {
    id: CharacterId.LINDINHA,
    name: 'Lindinha',
    image: 'https://i.imgur.com/DkWtCaS.jpeg',
    biography: 'A personificação da paz e do chá de boldo. Lindinha é a âncora de bom senso na vida caótica de Ruy. Preocupa-se genuinamente com ele, mesmo quando ele não se preocupa consigo mesmo.',
  },
  [CharacterId.LARA]: {
    id: CharacterId.LARA,
    name: 'Lara',
    image: 'https://i.imgur.com/FlZVsnD.jpeg',
    biography: 'Ex-namorada de Ruy e especialista em criar o caos. Lara opera em sua própria frequência, onde o drama é uma forma de arte e uma medida protetiva é um convite para conversar.',
  },
  [CharacterId.JAQUE]: {
    id: CharacterId.JAQUE,
    name: 'Jaque',
    image: 'https://i.imgur.com/QiUEs0m.jpeg',
    biography: 'Filósofa de bar e apreciadora da decadência. Jaque vê a vida (e a micose de Ruy) como um grande ensaio sobre a entropia. Suas palavras de conforto geralmente soam como uma sentença de morte.',
  },
  [CharacterId.GI]: {
    id: CharacterId.GI,
    name: 'Gi',
    image: 'https://i.imgur.com/IcAdC0e.jpeg',
    biography: 'Advogada competente e rival de Ruy nos tribunais. Gi é tudo que Ruy não é: organizada, bem-sucedida e provavelmente não tem problemas de pele. Sua presença é um lembrete constante do que ele poderia ter sido.',
  },
  [CharacterId.NETTO]: {
    id: CharacterId.NETTO,
    name: 'Netto',
    image: 'https://i.imgur.com/OJq2crm.jpeg',
    biography: 'Policial correto e amigo de Ruy (ou pelo menos tenta ser). Netto se preocupa com o amigo, mas sua abordagem "pela lei" nem sempre se encaixa no universo de gambiarras de Ruy. Tem orelhas notáveis.',
  },
  [CharacterId.KESLLEY]: {
    id: CharacterId.KESLLEY,
    name: 'Keslley "Cowboy-Gay"',
    image: 'https://i.imgur.com/Rj5FPov.jpeg',
    biography: 'Amigo de longa data de Ruy com uma energia contagiante e uma missão de vida: mostrar a Ruy que a felicidade pode estar em uma pista de dança ao som de Shania Twain. Ele acredita que a cura para a alma (e talvez para a micose) de Ruy está em abraçar seu lado "cowboy-gay".',
  },
  [CharacterId.NARRATOR]: {
    id: CharacterId.NARRATOR,
    name: 'Narrador',
    image: '',
    biography: 'A voz cínica que acompanha Ruy em sua jornada. O Narrador sabe de tudo, julga tudo e não tem o menor problema em apontar o quão patética a situação pode ser.',
  },
  [CharacterId.DOCTOR]: {
    id: CharacterId.DOCTOR,
    name: 'Doutor',
    image: '',
    biography: 'Dermatologista com a paciência de um santo e o olhar de quem já viu de tudo. Trata a condição de Ruy com profissionalismo, mas por dentro, provavelmente se pergunta onde foi que a humanidade errou.',
  },
};

export const INITIAL_STATS: Stats = {
  [StatId.SANIDADE]: 50,
  [StatId.PRESTIGIO]: 20,
  [StatId.FUNGOS]: 60,
  [StatId.DINHEIRO]: 100,
};

export const RELATIONSHIP_CHARACTERS: RelationshipCharacterId[] = [
    RelationshipCharacterId.LINDINHA,
    RelationshipCharacterId.LARA,
    RelationshipCharacterId.JAQUE,
    RelationshipCharacterId.GI,
    RelationshipCharacterId.NETTO,
    RelationshipCharacterId.KESLLEY,
];

export const INITIAL_RELATIONSHIPS: Relationships = {
    [RelationshipCharacterId.LINDINHA]: { affinity: 0, mood: RelationshipMood.NEUTRAL },
    [RelationshipCharacterId.LARA]: { affinity: 0, mood: RelationshipMood.NEUTRAL },
    [RelationshipCharacterId.JAQUE]: { affinity: 0, mood: RelationshipMood.NEUTRAL },
    [RelationshipCharacterId.GI]: { affinity: 0, mood: RelationshipMood.NEUTRAL },
    [RelationshipCharacterId.NETTO]: { affinity: 0, mood: RelationshipMood.NEUTRAL },
    [RelationshipCharacterId.KESLLEY]: { affinity: 0, mood: RelationshipMood.NEUTRAL },
};

export const SHOP_ITEMS: ShopItem[] = [
    { id: 'bolo', name: 'Bolo de Micro-empreendedor', description: 'Um bolo com mais corante do que sabor. Perfeito para adoçar o dia e o coração de quem tem bom gosto... ou não.', price: 50, targetCharacterId: RelationshipCharacterId.LINDINHA, affinityValue: 1 },
    { id: 'marmita', name: 'Marmita Light', description: 'Frango com batata doce. O prato oficial de quem "está focado". Mostra que você se importa... com o índice glicêmico dela.', price: 80, targetCharacterId: RelationshipCharacterId.LINDINHA, affinityValue: 2 },
    { id: 'flores', name: 'Flores Murchas', description: 'Elas já viram dias melhores. Assim como o seu relacionamento com ela. Uma metáfora perfeita e barata.', price: 30, targetCharacterId: RelationshipCharacterId.LARA, affinityValue: 1 },
    { id: 'bilhete', name: 'Bilhete Dramático', description: 'Escrito em papel de pão com uma caneta que falhou no meio. "O oceano do seu desprezo não afogará a nau do meu querer".', price: 25, targetCharacterId: RelationshipCharacterId.LARA, affinityValue: 1 },
    { id: 'vela', name: 'Vela Preta Aromática', description: 'Aroma: "poeira de biblioteca abandonada com um toque de desilusão". Acenda para meditar sobre o vazio da existência.', price: 60, targetCharacterId: RelationshipCharacterId.JAQUE, affinityValue: 1 },
    { id: 'livro', name: 'Livro de Filosofia Macabra', description: '"Por que Rir no Funeral da Esperança", de Cioran. Um presente que diz: "eu entendo a sua dor e acho ela poeticamente interessante".', price: 90, targetCharacterId: RelationshipCharacterId.JAQUE, affinityValue: 2 },
    { id: 'boneco', name: 'Boneco de Papelão do Caos', description: 'Um boneco de palitos com a palavra "CAOS" escrita em vermelho. Um presente conceitual para quem aprecia a arte da desordem.', price: 45, targetCharacterId: RelationshipCharacterId.GI, affinityValue: 1 },
    { id: 'adesivo', name: 'Adesivo de Gato Psicótico', description: 'Um gatinho fofo com olhos que viram o abismo. Perfeito para o notebook de uma advogada que encara o caos de frente.', price: 35, targetCharacterId: RelationshipCharacterId.GI, affinityValue: 1 },
    { id: 'bone', name: 'Boné Policial de Brinquedo', description: 'Com a aba torta e o distintivo descascando. Um aceno respeitoso (e levemente irônico) à autoridade.', price: 55, targetCharacterId: RelationshipCharacterId.NETTO, affinityValue: 1 },
    { id: 'cotonete', name: 'Cotonete Gigante', description: 'Um cotonete de 30cm. Uma piada interna que só você (e talvez ele) entenderá. Ou não.', price: 40, targetCharacterId: RelationshipCharacterId.NETTO, affinityValue: 1 },
    { id: 'espora_glitter', name: 'Espora com Glitter', description: 'Para o cowboy que não abre mão do brilho. Funcional e fabulosa. Cuidado para não arranhar o linóleo.', price: 65, targetCharacterId: RelationshipCharacterId.KESLLEY, affinityValue: 1 },
    { id: 'convite_vip', name: 'Convite VIP para "Poc Palace"', description: 'Um convite dourado para a boate mais badalada da cidade. Garante entrada sem fila e o direito de julgar os looks alheios.', price: 100, targetCharacterId: RelationshipCharacterId.KESLLEY, affinityValue: 2 },
];

export const STORY: Scene[] = [
  // --- STARTING SCENE ---
  {
    id: 'DIA_1_MANHA',
    background: 'https://i.imgur.com/ZYzYaTa.jpeg',
    dialogues: [
      {
        characterId: CharacterId.NARRATOR,
        text: 'Dia 1. O cheiro de poeira e desespero preenche seu escritório. A pilha de processos parece zombar de você. No canto, a cafeteira solta um último suspiro asmático.',
      },
      {
        characterId: CharacterId.RUY,
        isRuyThought: true,
        text: 'Ok, Ruy. Foco. A vida é uma gincana de boletos e problemas de pele. Só posso fazer uma coisa importante hoje. O que vai ser?',
        choices: [
          {
            text: '[Tentar ganhar dinheiro] Limpar a caixa de emails.',
            effects: [{ stat: StatId.DINHEIRO, value: 5 }, { stat: StatId.SANIDADE, value: -5 }],
          },
          {
            text: '[Focar na Saúde] Ir a uma consulta médica (finalmente).',
            effects: [{ stat: StatId.FUNGOS, value: -5 }, { stat: StatId.SANIDADE, value: 5 }],
            relationshipEffects: [{characterId: RelationshipCharacterId.LINDINHA, value: 1}]
          },
          {
            text: '[Focar na Vida Social] Ligar para Lindinha e marcar um café.',
            effects: [{ stat: StatId.SANIDADE, value: 10 }, { stat: StatId.FUNGOS, value: 5 }],
            relationshipEffects: [{characterId: RelationshipCharacterId.LINDINHA, value: 1}]
          },
        ],
      },
    ],
  },
];


export const ENDINGS: Ending[] = [
    {
        id: 'FINAL_FUNGICO',
        title: 'Final Fúngico: O Coach',
        description: 'A micose venceu. Você abandona o direito e se torna um coach motivacional, usando sua "maldição" como metáfora para o sucesso. Seu slogan: "Seja o fungo que você quer ver no mundo".',
        condition: (stats: Stats) => stats[StatId.FUNGOS] >= 100,
    },
    {
        id: 'FINAL_LIMPO',
        title: 'Final Limpo: Quase Digno',
        description: 'Com esforço, honestidade e muitos banhos, você se cura. A vida ainda é um caos, mas pelo menos é um caos sem coceira. Lindinha te chama para tomar um açaí. Há esperança.',
        condition: (stats: Stats) => stats[StatId.FUNGOS] <= 0,
    },
    {
        id: 'FINAL_FALIDO',
        title: 'Final Falido: O Barão do Serasa',
        description: 'Seu nome está mais sujo que pau de galinheiro. Entre clientes caloteiros e golpes de Pix, você está oficialmente quebrado. Sua maior posse é uma coleção de boletos vencidos.',
        condition: (stats: Stats) => stats[StatId.DINHEIRO] <= 0,
    },
    {
        id: 'FINAL_INSANO',
        title: 'Final Internado: Férias na Terapinga',
        description: 'Sua mente finalmente deu tela azul. Você agora passa os dias em uma clínica de repouso, debatendo com um esquilo sobre a inconstitucionalidade da cobrança de nozes.',
        condition: (stats: Stats) => stats[StatId.SANIDADE] <= 0,
    },
    {
        id: 'FINAL_PRESTIGIO',
        title: 'Final Processado: O Réu',
        description: 'Sua reputação foi para o ralo. Um ex-cliente te processou por má prática, uma ex por danos morais e o pastor do NFT de fé por quebra de contrato divino. Você agora precisa de um advogado.',
        condition: (stats: Stats) => stats[StatId.PRESTIGIO] <= 0,
    },
    {
        id: 'FINAL_PRESTIGIO_VAZIO',
        title: 'Final do Prestígio Vazio: O Advogado do Diabo',
        description: 'Você se tornou uma lenda no fórum. Seu nome é sinônimo de vitória. Mas a que custo? As noites são longas, as paredes do seu escritório de luxo sussurram seus fracassos pessoais. Você ganhou todos os processos, menos o seu próprio.',
        condition: (stats: Stats) => stats[StatId.PRESTIGIO] > 80 && stats[StatId.SANIDADE] < 30,
    },
    {
        id: 'FINAL_AMOR_COMPLICado',
        title: 'Final do Amor... e da Conta Negativa',
        description: 'Você e Lindinha estão juntos. O amor é real, o apoio é constante, e a coceira sumiu. O problema? O amor não paga o aluguel. Vocês vivem de miojo e carinho, provando que o coração pode estar cheio, mesmo que a carteira esteja vazia.',
        condition: (stats: Stats) => stats[StatId.FUNGOS] < 20 && stats[StatId.SANIDADE] > 60 && stats[StatId.DINHEIRO] < 40,
    },
    {
        id: 'FINAL_MEDIOCRE',
        title: 'Final Medíocre: O Limbo do Advogado',
        description: 'Você sobreviveu. Não brilhantemente, mas sobreviveu. A vida continua, com seus processos, boletos e uma coceira que nunca some de verdade. Você é o eterno estagiário da existência.',
        condition: () => true,
    }
];