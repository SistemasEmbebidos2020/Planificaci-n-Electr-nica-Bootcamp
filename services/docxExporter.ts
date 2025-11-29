
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
} from "docx";
import type { MonthPlan } from "../types";

export const exportToDocx = (plan: MonthPlan[]) => {
  const doc = new Document({
    creator: "Planificador de Cursos AI",
    title: "Plan de Estudios de Electrónica",
    description: "Plan de estudios generado por IA para un curso de electrónica de 3 meses.",
    styles: {
      paragraphStyles: [
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 32, // 16pt
            bold: true,
            color: "2E74B5",
          },
          paragraph: {
            spacing: { after: 240, before: 480 },
          },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          quickFormat: true,
          run: {
            size: 26, // 13pt
            bold: true,
            color: "2E74B5",
          },
          paragraph: {
            spacing: { after: 120, before: 240 },
          },
        },
      ],
    },
    sections: [
      {
        children: [
          new Paragraph({
            text: "Plan de Estudios de Electrónica",
            heading: HeadingLevel.TITLE,
            alignment: "center",
          }),
          ...plan.flatMap((month) => [
            new Paragraph({
              text: `Mes ${month.month}: ${month.title}`,
              heading: HeadingLevel.HEADING_1,
            }),
            ...month.weeks.flatMap((week) => [
              new Paragraph({
                text: `Semana ${week.week}: ${week.title}`,
                heading: HeadingLevel.HEADING_2,
              }),
              ...week.topics.map(
                (topic) =>
                  new Paragraph({
                    text: topic,
                    bullet: {
                      level: 0,
                    },
                    spacing: {
                        after: 120
                    }
                  })
              ),
               new Paragraph({ text: "" }), // Add space after topics
            ]),
          ]),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "plan-de-estudios-electronica.docx";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  });
};