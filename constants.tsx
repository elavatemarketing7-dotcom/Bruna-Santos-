
import React from 'react';
import { Sparkles, ShieldCheck, Heart, Users, MessageCircle, Calendar } from 'lucide-react';

export const EXPERT = {
  name: 'Bruna Santos',
  profession: 'Harmonização Facial',
  address: '📍Rua Tereza Mota Valadares 837 | Buritis - BH',
  whatsapp: '5531991532432',
  whatsappLink: 'https://api.whatsapp.com/send?phone=5531991532432',
  instagram: 'https://www.instagram.com/dra.brunaasantos/',
};

export const IMAGES = {
  hero: 'https://i.imgur.com/wgvDc6o.png',
  authority1: 'https://i.imgur.com/bTyZxOq.png',
  authority2: 'https://i.imgur.com/hLpJUaW.png',
  lifestyle: [
    'https://i.imgur.com/XRWnYAP.png',
    'https://i.imgur.com/i4BQc3i.png',
    'https://i.imgur.com/3unxicq.png',
    'https://i.imgur.com/wSXsNlK.png',
    'https://i.imgur.com/8aI009x.png',
    'https://i.imgur.com/bTyZxOq.png',
    'https://i.imgur.com/PPx7TZM.png',
  ],
  gallery: [
    'https://i.imgur.com/9wJcUYU.png',
    'https://i.imgur.com/DYM6vvH.png',
    'https://i.imgur.com/g4VZK2z.png',
    'https://i.imgur.com/Romnfpi.png',
    'https://i.imgur.com/qilGUe2.png',
    'https://i.imgur.com/ANxugMw.png',
    'https://i.imgur.com/AUyTXbf.png',
    'https://i.imgur.com/JgfggxQ.png',
    'https://i.imgur.com/CkUox4P.png',
    'https://i.imgur.com/x13JMUo.png',
    'https://i.imgur.com/RECk3Dp.png',
    'https://i.imgur.com/yVga4wb.png',
    'https://i.imgur.com/MHRdrOu.png',
    'https://i.imgur.com/0GnB9Ln.png',
    'https://i.imgur.com/Vh52irt.png',
    'https://i.imgur.com/sGWEPZ7.png',
    'https://i.imgur.com/Ic7sxbh.png',
    'https://i.imgur.com/5HXQo8u.png',
    'https://i.imgur.com/1nbTZW9.png',
    'https://i.imgur.com/Mj3mN48.png',
  ]
};

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "O que você mais deseja melhorar hoje?",
    options: ["Naturalidade no rosto", "Rejuvenescimento", "Definição de traços", "Autoestima geral"]
  },
  {
    id: 2,
    question: "Você já realizou algum procedimento estético?",
    options: ["Sim, e amei", "Sim, mas não tive boa experiência", "Nunca fiz, tenho receio", "Nunca fiz, mas quero começar"]
  },
  {
    id: 3,
    question: "Qual sua maior prioridade em um procedimento?",
    options: ["Segurança total", "Resultado imediato", "Discrição (ninguém notar)", "Durabilidade"]
  }
];

export const DIFFERENTIALS = [
  {
    icon: <Sparkles className="w-8 h-8 text-[#c5a059]" />,
    title: "Avaliação Honesta",
    desc: "Não vendo procedimentos, vendo transformações reais e seguras."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#c5a059]" />,
    title: "Segurança Técnica",
    desc: "Protocolos avançados e materiais de altíssima qualidade."
  },
  {
    icon: <Heart className="w-8 h-8 text-[#c5a059]" />,
    title: "Atendimento Exclusivo",
    desc: "Cada rosto é único e o plano é feito sob medida para você."
  },
  {
    icon: <Users className="w-8 h-8 text-[#c5a059]" />,
    title: "Acompanhamento",
    desc: "Suporte total após o procedimento para garantir sua satisfação."
  }
];
