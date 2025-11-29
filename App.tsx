
import React, { useState } from 'react';
import { generateCoursePlan } from './services/geminiService';
import { exportToDocx } from './services/docxExporter';
import type { MonthPlan } from './types';
import PlanDisplay from './components/PlanDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { BrainCircuit, FileDown } from 'lucide-react';

const App: React.FC = () => {
  const [plan, setPlan] = useState<MonthPlan[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    setError(null);
    setPlan(null);
    try {
      const result = await generateCoursePlan();
      setPlan(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error al generar el plan: ${err.message}`);
      } else {
        setError('Ocurrió un error desconocido.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (plan) {
      exportToDocx(plan);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-4 mb-4">
            <BrainCircuit size={48} className="text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
              Planificador de Cursos de Electrónica
            </h1>
          </div>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg">
            Genera un plan de estudios detallado de 3 meses para un curso de electrónica, cubriendo desde los fundamentos analógicos hasta la programación del ESP32 con EasyCoding, todo con el poder de la IA.
          </p>
        </header>

        <div className="flex justify-center mb-12">
          <button
            onClick={handleGeneratePlan}
            disabled={isLoading}
            className="px-8 py-4 bg-cyan-600 text-white font-bold text-lg rounded-full hover:bg-cyan-500 disabled:bg-slate-700 disabled:cursor-not-allowed transition-all duration-300 ease-in-out shadow-lg shadow-cyan-500/20 transform hover:scale-105"
          >
            {isLoading ? 'Generando Plan...' : '¡Crear Plan de Estudios!'}
          </button>
        </div>

        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        
        {plan && (
          <div className="animate-fade-in space-y-8">
            <div className="text-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-500 transition-colors duration-300 ease-in-out shadow-lg shadow-teal-500/20 transform hover:scale-105"
              >
                <FileDown size={20} />
                Descargar como Word (.docx)
              </button>
            </div>
            <PlanDisplay plan={plan} />
          </div>
        )}

        {!isLoading && !error && !plan && (
          <div className="text-center p-8 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-400">Tu plan de estudios personalizado aparecerá aquí.</p>
          </div>
        )}
      </main>
      <footer className="text-center py-6 text-slate-500">
        <p>Generado con React, Tailwind CSS y la API de Gemini.</p>
      </footer>
    </div>
  );
};

// Import lucide-react dynamically
const script = document.createElement("script");
script.src = "https://unpkg.com/lucide-react@0.292.0/dist/umd/lucide-react.min.js";
document.head.appendChild(script);

export default App;