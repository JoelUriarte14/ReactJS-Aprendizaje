import React, { useState, useEffect, useRef } from 'react';

// --- Palabras para el test ---
const WORDS = [
  "react", "javascript", "componente", "estado", "propiedad", "efecto", "contexto", "reductor",
  "enrutador", "promesa", "asincrono", "funcion", "variable", "constante", "clase", "objeto",
  "arreglo", "metodo", "parametro", "argumento", "retorno", "depuracion", "consola", "terminal",
  "repositorio", "version", "control", "desarrollo", "produccion", "servidor", "cliente",
  "interfaz", "experiencia", "usuario", "diseño", "adaptable", "marco", "libreria", "paquete",
  "dependencia", "modulo", "exportar", "importar", "compilar", "transpilar", "empaquetar"
];

const TEST_DURATION = 60; // 60 segundos

// --- Componente de resultados ---
const Results = ({ stats, onReset }) => {
  const { correct, incorrect, wpm, accuracy } = stats;
  return (
    <div className="text-center bg-slate-800 p-8 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-cyan-400 mb-4">¡Tiempo!</h2>
      <div className="grid grid-cols-2 gap-4 text-lg">
        <div className="p-4 bg-slate-700 rounded-md">
          <p className="text-slate-400">PPM</p>
          <p className="text-white font-bold text-4xl">{wpm}</p>
        </div>
        <div className="p-4 bg-slate-700 rounded-md">
          <p className="text-slate-400">Precisión</p>
          <p className="text-white font-bold text-4xl">{accuracy}%</p>
        </div>
        <div className="p-4 bg-slate-700 rounded-md">
          <p className="text-slate-400">Correctas</p>
          <p className="text-green-400 font-bold text-4xl">{correct}</p>
        </div>
        <div className="p-4 bg-slate-700 rounded-md">
          <p className="text-slate-400">Errores</p>
          <p className="text-red-400 font-bold text-4xl">{incorrect}</p>
        </div>
      </div>
      <button
        onClick={onReset}
        className="mt-8 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-200 hover:scale-105"
      >
        Intentar de Nuevo
      </button>
    </div>
  );
};

// --- Componente principal de la aplicación ---
export default function App() {
  const [words, setWords] = useState([]);
  const [timer, setTimer] = useState(TEST_DURATION);
  const [status, setStatus] = useState('waiting'); // waiting, running, finished
  const [userInput, setUserInput] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, wpm: 0, accuracy: 0 });
  const inputRef = useRef(null);

  const generateWords = () => {
    return [...WORDS].sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 50);
  };

  useEffect(() => {
    setWords(generateWords());
  }, []);

  useEffect(() => {
    if (status === 'running' && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setStatus('finished');
      calculateResults();
    }
  }, [status, timer]);

  const startTest = () => {
    if (status !== 'running') {
      setStatus('running');
      setUserInput('');
      setCurrentWordIndex(0);
      setTimer(TEST_DURATION);
      setStats({ correct: 0, incorrect: 0, wpm: 0, accuracy: 0 });
      inputRef.current.focus();
    }
  };

  const resetTest = () => {
    setStatus('waiting');
    setWords(generateWords());
    startTest();
  };
  
  const calculateResults = () => {
      setStats(prev => {
          const totalChars = prev.correct + prev.incorrect;
          if (totalChars === 0) return prev;
          const accuracy = Math.round((prev.correct / totalChars) * 100);
          // WPM se calcula como (caracteres correctos / 5) / minutos.
          const wpm = Math.round(prev.correct / 5 / (TEST_DURATION / 60));
          return {...prev, wpm, accuracy};
      });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (status === 'waiting') startTest();
    if (value.endsWith(' ')) {
      // Mover a la siguiente palabra
      const currentWord = words[currentWordIndex];
      const typedWord = userInput.trim();

      setStats(prev => ({
          ...prev,
          correct: prev.correct + typedWord.split('').filter((char, i) => char === currentWord[i]).length,
          incorrect: prev.incorrect + typedWord.split('').filter((char, i) => char !== currentWord[i]).length + Math.abs(currentWord.length - typedWord.length),
      }));
      
      setCurrentWordIndex(prev => prev + 1);
      setUserInput('');
    } else {
      setUserInput(value);
    }
  };

  const getCharClass = (wordIdx, charIdx, char) => {
    if (wordIdx === currentWordIndex) {
      const typedChar = userInput[charIdx];
      if (typedChar === undefined) {
        return "text-slate-400"; // No escrito aún
      }
      return typedChar === char ? "text-green-400" : "text-red-400";
    }
    return "text-slate-500"; // Palabras ya pasadas o futuras
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 text-white font-sans flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-cyan-400 mb-4">Test de Velocidad de Escritura</h1>
      
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-around items-center bg-slate-800 p-4 rounded-t-lg">
          <div className="text-center">
            <p className="text-slate-400">Tiempo</p>
            <p className="text-cyan-400 text-3xl font-bold">{timer}</p>
          </div>
          <div className="text-center">
            <p className="text-slate-400">PPM</p>
            <p className="text-white text-3xl font-bold">{stats.wpm}</p>
          </div>
           <div className="text-center">
            <p className="text-slate-400">Precisión</p>
            <p className="text-white text-3xl font-bold">{stats.accuracy}%</p>
          </div>
        </div>

        {status !== 'finished' ? (
          <div className="relative" onClick={() => inputRef.current.focus()}>
            <div className="text-2xl leading-relaxed tracking-wider p-8 bg-slate-900/50 rounded-b-lg h-48 overflow-hidden text-justify">
              {words.map((word, i) => (
                <span key={i} className={`
                  ${i === currentWordIndex ? 'font-bold' : ''}
                  ${i < currentWordIndex ? 'text-slate-500' : ''}
                `}>
                  {word.split('').map((char, j) => (
                    <span key={j} className={getCharClass(i, j, char)}>
                      {i === currentWordIndex && j === userInput.length ? 
                        <span className="animate-ping absolute">|</span> : ''
                      }
                      {char}
                    </span>
                  ))}
                  <span> </span>
                </span>
              ))}
            </div>
            {status === 'waiting' &&
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <p className="text-xl">Empieza a escribir para iniciar la prueba</p>
              </div>
            }
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-text"
              disabled={status === 'finished'}
            />
          </div>
        ) : (
          <Results stats={stats} onReset={resetTest} />
        )}

        {status !== 'running' && status !== 'waiting' &&
           <button
            onClick={resetTest}
            className="mt-8 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-200 hover:scale-105"
          >
            Intentar de Nuevo
          </button>
        }
      </div>
    </div>
  );
}

