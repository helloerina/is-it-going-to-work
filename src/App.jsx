import React, { useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { PaddyFieldBackground } from './PaddyFieldBackground';

const RiceQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const bodyTextClass = "text-[1.6em] md:text-[2.25em] leading-[1.35]";

  const questions = [
    {
      id: 1,
      question: "How do you approach new experiences?",
      options: [
        { text: "I embrace them with enthusiasm and curiosity", value: "jasmine" },
        { text: "I prefer refined, sophisticated experiences", value: "basmati" },
        { text: "I like experiences that require patience and attention", value: "risotto" },
        { text: "I seek out unique, unconventional experiences", value: "purple" }
      ]
    },
    {
      id: 2,
      question: "How do you usually enjoy rice?",
      options: [
        { text: "A comforting everyday staple", value: "jasmine" },
        { text: "A base for a well-balanced meal", value: "basmati" },
        { text: "The star of the dish", value: "risotto" },
        { text: "As something nutritious", value: "purple" }
      ]
    },
    {
      id: 3,
      question: "When working on a project, you tend to:",
      options: [
        { text: "Go with the flow and adapt as needed", value: "jasmine" },
        { text: "Plan carefully and execute with precision", value: "basmati" },
        { text: "Stay deeply involved throughout the process", value: "risotto" },
        { text: "Take an unconventional, creative approach", value: "purple" }
      ]
    },
    {
      id: 4,
      question: "What draws you most to food experiences?",
      options: [
        { text: "Warm, comforting flavors and familiar smells", value: "jasmine" },
        { text: "Simple rituals and time-tested ways of cooking", value: "basmati" },
        { text: "Making food by hand and learning the process", value: "risotto" },
        { text: "Exploring new ideas around health and nutrition", value: "purple" }
      ]
    },
    {
      id: 5,
      question: "Rice feeds more than half of the world's population. What does this fact inspire in you?",
      options: [
        { text: "How something simple can quietly support everyday life", value: "jasmine" },
        { text: "How many different meals and traditions it shows up in", value: "basmati" },
        { text: "How humans have adapted food to fit so many environments", value: "risotto" },
        { text: "How important it is to think about food access and sustainability", value: "purple" }
      ]
    }
  ];

  const results = {
    jasmine: {
      name: "Jasmine, the Comfy Companion",
      displayName: "Jasmine",
      image: "/images/Jasmine.svg",
      tagline: "You're warm, welcoming, and naturally bring people together. You create comfort wherever you go.",
      history: "Jasmine rice was born in Thailand over 2,000 years ago. It gets its name from the sweet aroma it releases while cooking—just like jasmine flowers. This rice became the heart of Southeast Asian meals.",
      funFact: "Fresh jasmine rice smells so good that warehouses storing it would smell like flower gardens! The scent comes from a natural compound also found in pandan leaves.",
      reflection: "What simple moments create a feeling of togetherness for you?"
    },
    basmati: {
      name: "Basmati, the Elegant Queen",
      displayName: "Basmati",
      image: "/images/Basmati.svg",
      tagline: "You appreciate the finer things. You're elegant, refined, and you know good things take time.",
      history: "Basmati means 'queen of fragrance' in Sanskrit. It's been grown in the foothills of the Himalayas for thousands of years, prized in royal feasts across India and Pakistan.",
      funFact: "Basmati rice nearly doubles in length when cooked but barely gets wider. The older it is, the better it tastes—aged basmati (stored for a year+) is the most prized.",
      reflection: "What aspects of your life have become more valuable as time has passed?"
    },
    risotto: {
      name: "Risotto, the Slow Burn",
      displayName: "Risotto",
      image: "/images/Risotto.svg",
      tagline: "You believe good things take time. You're patient, present, and attentive, especially when something matters to you. You trust the process.",
      history: "Introduced to Italy in the 14th-15th century. Northern Italy's wetlands turned out to be perfect for growing short-grain rice.",
      funFact: "Stirring releases starch, creating risotto's creamy texture without using any cream.",
      reflection: "What in your life could use more time and care?"
    },
    purple: {
      name: "Forbidden, the Iconic Rizzer",
      displayName: "Purple",
      image: "/images/Purple.svg",
      tagline: "You're one-of-a-kind. You seek out the unique, value what's authentic, and believe good things should be accessible to all.",
      history: "Once called 'Forbidden Rice' in ancient China—reserved only for emperors! Commoners weren't allowed to eat it. Now it's celebrated as a superfood available to everyone.",
      funFact: "When you cook purple rice, the water turns deep purple from antioxidants (the same ones in blueberries). It's more nutritious than brown rice!",
      reflection: "What knowledge or resources do you believe should be more widely shared?"
    }
  };

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    const counts = { jasmine: 0, basmati: 0, risotto: 0, purple: 0 };
    Object.values(answers).forEach(answer => {
      counts[answer]++;
    });

    const maxCount = Math.max(...Object.values(counts));
    const winners = Object.keys(counts).filter(key => counts[key] === maxCount);
    return winners[Math.floor(Math.random() * winners.length)];
  };

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    const resultType = calculateResult();
    const result = results[resultType];

    return (
      <>
        <PaddyFieldBackground />
        <div className="min-h-screen p-4 md:p-8 flex items-center justify-center relative z-10">
          <div className="max-w-md w-full">
            {/* Glassmorphic Card */}
            <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/60">
              {/* Header with name and stars */}
              <div className="flex items-center justify-between mb-6">
                <div className="bg-white/80 backdrop-blur-sm border-2 border-black/20 rounded-full px-6 py-3 shadow-lg">
                  <h1 className="text-2xl font-bold text-black">{result.displayName}</h1>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
                  ))}
                </div>
              </div>

              {/* Pixel character image with shadow */}
              <div className="flex justify-center mb-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                  <img
                    src={result.image}
                    alt={result.displayName}
                    className="w-32 h-32 object-contain drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
                  />
                </div>
              </div>

              <hr className="my-6 border-white/40" />

              {/* Fun name */}
              <h2 className="text-xl font-bold text-black text-center mb-4 drop-shadow-md">
                {result.name}
              </h2>

              {/* Tagline (BODY TEXT SIZE UPDATED) */}
              <p className={`${bodyTextClass} font-medium text-black mb-6 drop-shadow-sm`}>
                {result.tagline}
              </p>

              {/* History Section */}
              <div className="mb-4">
                <button className="bg-white/60 backdrop-blur-sm border-2 border-black/20 rounded-full px-5 py-2 text-sm font-bold text-black mb-3 shadow-md">
                  History
                </button>
                <p className={`${bodyTextClass} text-black bg-white/30 backdrop-blur-sm rounded-lg p-3`}>
                  {result.history}
                </p>
              </div>

              {/* Fun Fact Section */}
              <div className="mb-4">
                <button className="bg-white/60 backdrop-blur-sm border-2 border-black/20 rounded-full px-5 py-2 text-sm font-bold text-black mb-3 flex items-center gap-2 shadow-md">
                  <span>✿</span> fun fact!
                </button>
                <div className="border-2 border-dashed border-black/30 rounded-lg p-3 bg-white/50 backdrop-blur-sm shadow-md">
                  <p className={`${bodyTextClass} text-black`}>
                    {result.funFact}
                  </p>
                </div>
              </div>

              {/* Reflection Section */}
              <div className="mb-6">
                <button className="bg-white/60 backdrop-blur-sm border-2 border-black/20 rounded-full px-5 py-2 text-sm font-bold text-black mb-3 shadow-md">
                  Reflection
                </button>
                <p className={`${bodyTextClass} text-black italic bg-white/30 backdrop-blur-sm rounded-lg p-3`}>
                  {result.reflection}
                </p>
              </div>

              {/* Restart button */}
              <button
                onClick={restart}
                className="w-full bg-black/80 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-full hover:bg-black transition-all duration-200 shadow-xl"
              >
                Take Quiz Again
              </button>
            </div>

            {/* Footer text */}
            <p className="text-center text-sm text-black mt-4 font-medium drop-shadow-lg bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 inline-block mx-auto w-full">
              Vibe coded by Erina Suzuki
            </p>
          </div>
        </div>
      </>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <PaddyFieldBackground />
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center relative z-10">
        <div className="max-w-2xl w-full">
          <div className="mb-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 drop-shadow-lg">
              Which Rice Are You Feeling Right Now?
            </h1>
            <p className="text-black font-medium drop-shadow-md">your rice moment</p>
          </div>

          <div className="bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 border border-white/60">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-black font-bold mb-2">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-white/50 backdrop-blur-sm rounded-full h-3 border-2 border-white/60 shadow-inner">
                <div
                  className="bg-[#C8E632] h-full rounded-full transition-all duration-300 shadow-lg"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-black mb-6 drop-shadow-md">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full text-left p-4 rounded-2xl border-2 border-black/20 bg-white/60 backdrop-blur-sm hover:bg-[#C8E632]/80 hover:scale-[1.02] transition-all duration-200 group shadow-lg"
                  >
                    <div className="flex items-center">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold mr-3 text-sm shadow-md">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {/* Option text (BODY TEXT SIZE UPDATED) */}
                      <span className={`${bodyTextClass} text-black font-medium group-hover:font-bold`}>
                        {option.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="flex items-center text-black font-bold hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200 drop-shadow-md"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <div className="text-sm text-black font-medium">
                Select an answer to continue
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-black font-medium drop-shadow-lg bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
              Vibe coded by Erina Suzuki <br /> INF1005H: Play-based programming for Libraries
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RiceQuiz;
