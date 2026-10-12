export type CourseId = "programacion" | "diseno" | "hojas";
export type Course = { id: CourseId; name: string; shortName: string; mb: number; icon: string; lessons: string[]; practiceTotal: number; topic: string };
export const courses: Course[] = [
  { id: "programacion", name: "Programación Inicial", shortName: "Programación", mb: 124, icon: "</>", lessons: ["Variables y datos", "Operadores básicos", "Condicionales", "Ciclos y repeticiones", "Listas", "Funciones", "Depuración", "Mini proyecto"], practiceTotal: 5, topic: "variables" },
  { id: "diseno", name: "Diseño Web", shortName: "Diseño Web", mb: 98, icon: "▧", lessons: ["HTML básico", "Estructura de una página", "Enlaces e imágenes", "CSS y selectores", "Colores y tipografía", "Layouts responsivos"], practiceTotal: 4, topic: "HTML" },
  { id: "hojas", name: "Hojas de Cálculo", shortName: "Hojas de cálculo", mb: 76, icon: "▦", lessons: ["Celdas y rangos", "Fórmulas básicas", "SUMA y PROMEDIO", "SI y CONTAR", "Gráficos"], practiceTotal: 4, topic: "fórmulas" },
];
export const initialProgress: Record<CourseId, number> = { programacion: 4, diseno: 1, hojas: 2 };
export const practiceDone: Record<CourseId, number> = { programacion: 2, diseno: 0, hojas: 1 };
