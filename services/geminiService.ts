
import { GoogleGenAI, Type } from "@google/genai";
import type { MonthPlan } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateCoursePlan(): Promise<MonthPlan[]> {
  const prompt = `
    Actúa como un instructor experto en electrónica y diseñador de planes de estudio.
    Tu tarea es crear un plan de estudios completo y detallado para un curso de 3 meses (12 semanas) de duración.
    El curso debe comenzar con electrónica analógica básica, progresar a electrónica digital y finalizar con la programación de un microcontrolador ESP32 utilizando el entorno de programación en bloques EasyCoding.
    El público objetivo son principiantes absolutos sin experiencia previa.
    La estructura debe ser lógica y progresiva.
    Genera la respuesta exclusivamente en formato JSON, siguiendo el esquema proporcionado.
  `;

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        month: {
          type: Type.INTEGER,
          description: "Número del mes (1, 2, o 3)",
        },
        title: {
          type: Type.STRING,
          description: "Tema principal o enfoque del mes. Por ejemplo: 'Fundamentos de Electrónica Analógica'",
        },
        weeks: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              week: {
                type: Type.INTEGER,
                description: "Número de la semana en el plan general (1 a 12)",
              },
              title: {
                type: Type.STRING,
                description: "Título conciso para el enfoque de la semana. Por ejemplo: 'Introducción a Circuitos y Ley de Ohm'",
              },
              topics: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: "Lista detallada de temas, conceptos y actividades prácticas para la semana.",
              },
            },
            required: ["week", "title", "topics"],
          },
        },
      },
      required: ["month", "title", "weeks"],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      throw new Error("La API de Gemini devolvió una respuesta vacía.");
    }
    
    const parsedPlan: MonthPlan[] = JSON.parse(jsonText);
    return parsedPlan;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to generate course plan: ${error.message}`);
    }
    throw new Error("An unknown error occurred while communicating with the Gemini API.");
  }
}
