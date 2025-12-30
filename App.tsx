import React, { useState } from 'react';
import { ViewState, UserAnswers } from './types';
import { EXPERT, IMAGES, QUIZ_QUESTIONS, DIFFERENTIALS } from './constants';
import { ChevronRight, ArrowRight, Instagram, MapPin, Check, MessageCircle, X, Calendar } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.INITIAL);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState('');

  const handleNextStep = (answer: string) => {
    const newAnswers = { ...answers, [QUIZ_QUESTIONS[quizStep].id]: answer };
    setAnswers(newAnswers);
    
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(prev => prev + 1);
    } else {
      setView(ViewState.RESULT);
    }
  };

  const getWhatsAppMessage = (withQuiz: boolean) => {
    if (!withQuiz) return `Olá Dra. Bruna Santos! Gostaria de agendar uma consulta para conhecer melhor o seu método.`;
    
    let quizText = "Respostas da minha Avaliação:\n";
    QUIZ_QUESTIONS.forEach(q => {
      quizText += `- ${q.question}: ${answers[q.id]}\n`;
    });
    return encodeURIComponent(`Olá Dra. Bruna Santos! Acabei de fazer o quiz e sou sua paciente ideal.\n\n${quizText}\nQuero agendar minha consulta!`);
  };

  const openWhatsApp = (withQuiz: boolean) => {
    const message = getWhatsAppMessage(withQuiz);
    window.open(`https://api.whatsapp.com/send?phone=${EXPERT.whatsapp}&text=${message}`, '_blank');
  };

  // Quiz View Component
  const QuizView = () => (
    <div className="fixed inset-0 z-50 bg-[#0f1c14] overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center p-6 py-12">
        <div className="text-center mb-6">
          <h2 className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-1">Avaliação Exclusiva</h2>
          <h1 className="text-white text-3xl heading-serif italic">Dra. Bruna Santos</h1>
        </div>
        
        <div className="w-full max-w-md bg-white rounded-[2rem] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
            <div 
              className="h-full bg-gold transition-all duration-500" 
              style={{ width: `${((quizStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          <div className="flex justify-center -mt-4">
              <div className="relative">
                  <div className="absolute inset-0 bg-gold blur-xl opacity-20 rounded-full"></div>
                  <img 
                      src={IMAGES.hero} 
                      alt={EXPERT.name} 
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg relative z-10"
                  />
              </div>
          </div>

          <div className="space-y-2 text-center">
            <span className="text-gold font-bold text-[10px] tracking-widest uppercase bg-gold/5 px-3 py-1 rounded-full inline-block">Pergunta {quizStep + 1} de {QUIZ_QUESTIONS.length}</span>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a] leading-tight">
              {QUIZ_QUESTIONS[quizStep].question}
            </h2>
          </div>

          <div className="grid gap-2 sm:gap-3">
            {QUIZ_QUESTIONS[quizStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleNextStep(option)}
                className="w-full py-4 px-5 text-left rounded-2xl border-2 border-gray-100 hover:border-gold hover:bg-gold/5 transition-all text-gray-700 font-medium active:scale-95 flex items-center justify-between group text-sm sm:text-base"
              >
                {option}
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-gold" />
              </button>
            ))}
          </div>

          <button 
            onClick={() => setView(ViewState.MAIN)}
            className="text-gray-400 text-xs font-medium w-full text-center hover:text-gray-600 transition-colors pt-2"
          >
            Pular para o site completo
          </button>
        </div>
      </div>
    </div>
  );

  const ResultView = () => (
    <div className="fixed inset-0 z-50 bg-[#0f1c14] overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center p-6 py-12 space-y-8 max-w-md mx-auto text-center">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-gold shadow-2xl animate-float">
          <img src={IMAGES.hero} alt={EXPERT.name} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-4">
          <div className="bg-gold/20 text-gold border border-gold/30 px-4 py-1 rounded-full inline-block text-xs font-bold tracking-widest uppercase">
            Perfil Compatível
          </div>
          <h1 className="text-white text-3xl sm:text-4xl heading-serif leading-tight">Você é a Paciente Ideal</h1>
          <p className="text-white/80 leading-relaxed font-light text-sm sm:text-base">
            Com base nas suas respostas, o Método da <span className="text-gold font-semibold">Bruna Santos</span> consegue entregar exatamente a naturalidade e segurança que você procura.
          </p>
        </div>

        <div className="w-full space-y-4 pt-4">
          <button 
            onClick={() => openWhatsApp(true)}
            className="w-full bg-gold text-white py-5 rounded-2xl font-bold shadow-lg shadow-gold/20 flex items-center justify-center gap-3 animate-pulse active:scale-95 transition-transform text-sm sm:text-base"
          >
            <MessageCircle className="w-6 h-6" />
            ENVIAR MINHA AVALIAÇÃO À DRA
          </button>
          
          <button 
             onClick={() => openWhatsApp(false)}
            className="w-full bg-white/10 text-white border border-white/20 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform text-sm sm:text-base"
          >
            CHAMAR NO WHATSAPP
          </button>

          <button 
            onClick={() => setView(ViewState.MAIN)}
            className="text-white/50 text-xs hover:text-white transition-colors underline underline-offset-4"
          >
            Não enviar e continuar no site
          </button>
        </div>
      </div>
    </div>
  );

  const InitialChoice = () => (
    <div className="fixed inset-0 z-[60] bg-premium overflow-y-auto">
      <div className="min-h-full flex flex-col items-center justify-center p-6 py-12 space-y-8 text-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-gold/20 blur-[60px] rounded-full group-hover:bg-gold/30 transition-all"></div>
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-gold shadow-2xl animate-float">
            <img src={IMAGES.hero} alt={EXPERT.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-white text-4xl sm:text-5xl heading-serif italic">{EXPERT.name}</h1>
          <p className="text-gold tracking-[0.3em] uppercase text-[9px] sm:text-[10px] font-bold">Harmonização Facial de 💚</p>
        </div>

        <p className="text-white/70 max-w-xs mx-auto text-sm font-light leading-relaxed italic">
          "Meu compromisso é realçar sua beleza com segurança e total naturalidade."
        </p>

        <div className="w-full max-w-sm space-y-4 pt-4">
          <button 
            onClick={() => setView(ViewState.QUIZ)}
            className="w-full bg-gold text-white py-5 sm:py-6 rounded-2xl font-bold text-base sm:text-lg shadow-2xl shadow-gold/20 flex items-center justify-center gap-4 group active:scale-95 transition-all"
          >
            FAZER MINHA AVALIAÇÃO
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => setView(ViewState.MAIN)}
            className="w-full bg-white/5 border border-white/10 text-white py-5 sm:py-6 rounded-2xl font-medium text-base sm:text-lg hover:bg-white/10 transition-all active:scale-95"
          >
            IR DIRETO PARA O SITE
          </button>
        </div>
        
        <p className="text-white/30 text-[9px] font-light tracking-[0.2em] uppercase mt-4">Exclusividade em cada detalhe.</p>
      </div>
    </div>
  );

  if (view === ViewState.INITIAL) return <InitialChoice />;
  if (view === ViewState.QUIZ) return <QuizView />;
  if (view === ViewState.RESULT) return <ResultView />;

  return (
    <div className="relative">
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <button onClick={() => setIsLightboxOpen(false)} className="absolute top-8 right-8 text-white">
            <X className="w-10 h-10" />
          </button>
          <img src={activeImage} className="max-w-full max-h-[80vh] object-contain rounded-lg" alt="Resultado" />
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col bg-premium pt-12 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col justify-end pb-20 sm:pb-32">
          <div className="max-w-2xl space-y-8 bg-gradient-to-t from-[#0f1c14]/40 to-transparent p-4 rounded-3xl backdrop-blur-[2px] sm:backdrop-blur-0 sm:bg-none">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-[2px] bg-gold"></div>
                <h2 className="text-gold tracking-[0.6em] uppercase text-xs sm:text-base font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Naturalidade & Segurança
                </h2>
              </div>
            </div>

            <h1 className="text-white text-5xl sm:text-8xl leading-[1.05] sm:leading-[0.85] heading-serif italic drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">
              Sou Bruna Santos, e ajudo você a encontrar sua <span className="text-gold not-italic font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)]">melhor versão.</span>
            </h1>

            <p className="text-white text-lg sm:text-3xl font-light leading-tight sm:leading-relaxed max-w-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)]">
              Minha missão é realçar sua beleza natural sem mudar quem você é. Ciência, estética e um toque de arte para <span className="text-gold font-bold underline decoration-gold/30 underline-offset-8">resultados sofisticados.</span>
            </p>

            <div className="pt-8 space-y-6">
              <button 
                onClick={() => openWhatsApp(false)}
                className="w-full sm:w-auto px-12 py-5 sm:py-6 bg-gold text-white rounded-full font-extrabold text-lg sm:text-xl flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(197,160,89,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                <MessageCircle className="w-7 h-7" />
                Agendar consulta no WhatsApp
              </button>
            </div>
          </div>
        </div>
        
        {/* Foto do Heroi Ajustada: Mobile igual ao Desktop (Preenchimento Total) */}
        <div className="absolute right-0 bottom-0 w-full h-full opacity-95 pointer-events-none transition-all duration-1000 sm:w-[65%]">
          <img src={IMAGES.hero} alt={EXPERT.name} className="w-full h-full object-cover object-top sm:object-right-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c14] via-[#0f1c14]/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1c14] via-transparent to-transparent"></div>
        </div>
      </section>

      {/* Authority Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gold/10 rounded-3xl group-hover:scale-105 transition-transform duration-500"></div>
              <img src={IMAGES.authority1} alt="Dra Bruna Santos em atendimento" className="relative rounded-2xl shadow-2xl w-full h-[400px] sm:h-[500px] object-cover" />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs sm:text-sm">Autoridade em Harmonização</span>
                <h2 className="text-3xl sm:text-4xl heading-serif leading-tight">Uma jornada focada no <span className="italic">atendimento humanizado.</span></h2>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg font-light">
                  Acredito que cada rosto conta uma história. Não uso fórmulas prontas. Meu método exclusivo consiste em analisar as proporções áureas e entender as expectativas de cada paciente.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  "Especialista em Harmonização Facial",
                  "Foco total em resultados naturais",
                  "Atendimento personalizado e individual",
                  "Localização premium no Buritis - BH"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-700 font-medium text-sm sm:text-base">
                    <div className="bg-gold/10 p-1 rounded-full"><Check className="w-4 h-4 text-gold" /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => openWhatsApp(false)}
                className="inline-flex items-center gap-2 text-gold font-bold text-base sm:text-lg hover:translate-x-2 transition-transform"
              >
                Saiba mais sobre meu método <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-24 bg-[#f8f5f0]">
        <div className="container mx-auto px-6 text-center mb-12">
          <h2 className="text-3xl sm:text-4xl heading-serif mb-4">Resultados Reais</h2>
          <p className="text-gray-500 max-w-lg mx-auto italic text-sm">Veja algumas das transformações realizadas em nosso consultório.</p>
        </div>
        
        <div className="px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 max-w-7xl mx-auto">
            {IMAGES.gallery.map((img, i) => (
              <div 
                key={i} 
                className="aspect-[4/5] overflow-hidden rounded-lg sm:rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => { setActiveImage(img); setIsLightboxOpen(true); }}
              >
                <img src={img} alt={`Resultado ${i+1}`} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-[10px] mt-8">* Resultados podem variar de pessoa para pessoa. Cada organismo responde de forma única.</p>
        </div>
      </section>

      {/* Why Trust Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl heading-serif mb-4">Por que confiar em mim?</h2>
            <div className="w-20 h-1 bg-gold mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {DIFFERENTIALS.map((card, i) => (
              <div key={i} className="bg-[#fcfaf7] p-6 sm:p-8 rounded-3xl border border-gold/5 hover:border-gold/20 hover:shadow-xl transition-all group">
                <div className="mb-6 group-hover:scale-110 transition-transform">{card.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 text-[#1a1a1a]">{card.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed text-sm sm:text-base">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Intermediate */}
      <section className="py-16 px-6">
        <div className="bg-premium rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-12 text-center space-y-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[100px] rounded-full"></div>
          <h2 className="text-2xl sm:text-3xl text-white heading-serif italic">Pronta para viver essa experiência?</h2>
          <p className="text-white/70 max-w-lg mx-auto font-light text-sm sm:text-base">Sua jornada para a autoconfiança começa com um simples clique. Vamos conversar?</p>
          <button 
            onClick={() => openWhatsApp(false)}
            className="w-full sm:w-auto px-12 py-5 bg-gold text-white rounded-full font-bold shadow-xl shadow-gold/20 active:scale-95 transition-all text-sm sm:text-base"
          >
            Falar com a Dra. Bruna no WhatsApp
          </button>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl heading-serif">Como funciona a primeira consulta</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: "01", title: "Contato Inicial", desc: "Tiramos suas dúvidas rápidas via WhatsApp e agendamos seu horário." },
              { step: "02", title: "Avaliação Facial", desc: "Analisamos cada detalhe do seu rosto e ouvimos suas necessidades reais." },
              { step: "03", title: "Plano sob Medida", desc: "Criamos o seu cronograma de beleza focando sempre na naturalidade." }
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="text-gold/20 text-6xl sm:text-7xl font-bold leading-none select-none">{item.step}</div>
                <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
                <p className="text-gray-500 font-light px-4 text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gold font-bold mt-16 italic uppercase tracking-widest text-xs sm:text-sm">Agendamento rápido e prático.</p>
        </div>
      </section>

      {/* Authority Lifestyle Carousel */}
      <section className="py-24 bg-[#f8f5f0] overflow-hidden">
        <div className="container mx-auto px-6 mb-12 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl heading-serif italic">Bastidores & Atendimento</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 scrollbar-hide">
          {IMAGES.lifestyle.map((img, i) => (
            <div key={i} className="flex-shrink-0 w-64 sm:w-72 h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg group relative">
               <img src={img} alt="Expert Lifestyle" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
               <div className="absolute bottom-6 left-6 text-white font-medium italic text-sm">Atendimento exclusivo</div>
            </div>
          ))}
          <div className="flex-shrink-0 w-12 sm:w-24"></div> 
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-4xl sm:text-7xl heading-serif leading-tight">
            Não é apenas sobre estética. É sobre como <span className="text-gold">você se sente.</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-500 font-light max-w-2xl mx-auto">
            Recupere o brilho no olhar e a confiança ao se olhar no espelho. Reserve agora o seu momento de cuidado.
          </p>
          <div className="space-y-6 pt-6">
            <button 
              onClick={() => openWhatsApp(false)}
              className="w-full sm:w-auto px-12 sm:px-16 py-5 sm:py-6 bg-premium text-white rounded-full font-bold text-lg sm:text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 mx-auto"
            >
              <Calendar className="w-6 h-6 text-gold" />
              Agendar consulta no WhatsApp
            </button>
            <p className="text-gold font-bold uppercase tracking-widest text-xs sm:text-sm">Vagas limitadas para este mês</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#0f1c14] text-white/80 text-center px-6">
        <div className="container mx-auto space-y-10">
          <div className="space-y-2">
            <h3 className="signature text-4xl sm:text-5xl text-gold">{EXPERT.name}</h3>
            <p className="uppercase tracking-[0.3em] text-[10px] text-white/40">{EXPERT.profession}</p>
          </div>
          
          <div className="flex flex-col items-center space-y-4">
            <a href={EXPERT.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors text-sm sm:text-base">
              <Instagram className="w-5 h-5" />
              @dra.brunaasantos
            </a>
            <p className="flex items-center gap-2 text-xs sm:text-sm text-white/50">
              <MapPin className="w-4 h-4" />
              {EXPERT.address}
            </p>
          </div>

          <div className="pt-10 border-t border-white/5 text-[9px] sm:text-[10px] uppercase tracking-widest text-white/20">
            &copy; {new Date().getFullYear()} {EXPERT.name}. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Floating WA Button (Mobile only) */}
      <div className="fixed bottom-6 right-6 z-[40] sm:hidden">
        <button 
          onClick={() => openWhatsApp(false)}
          className="bg-green-600 text-white p-4 rounded-full shadow-2xl animate-bounce"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

export default App;