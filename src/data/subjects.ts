import { Subject } from '@/types/quiz';

export const subjects: Subject[] = [
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚛️',
    color: 'physics',
    chapters: [
      { id: 'mechanics', name: 'Mechanics', questionCount: 40 },
      { id: 'thermodynamics', name: 'Thermodynamics', questionCount: 40 },
      { id: 'electromagnetism', name: 'Electromagnetism', questionCount: 40 },
      { id: 'optics', name: 'Optics', questionCount: 40 },
      { id: 'modern-physics', name: 'Modern Physics', questionCount: 40 },
      { id: 'waves', name: 'Waves & Oscillations', questionCount: 40 },
    ],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '🧪',
    color: 'chemistry',
    chapters: [
      { id: 'organic', name: 'Organic Chemistry', questionCount: 40 },
      { id: 'inorganic', name: 'Inorganic Chemistry', questionCount: 40 },
      { id: 'physical', name: 'Physical Chemistry', questionCount: 40 },
      { id: 'coordination', name: 'Coordination Compounds', questionCount: 40 },
      { id: 'electrochemistry', name: 'Electrochemistry', questionCount: 40 },
      { id: 'polymers', name: 'Polymers & Biomolecules', questionCount: 40 },
    ],
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    color: 'biology',
    chapters: [
      { id: 'cell-biology', name: 'Cell Biology', questionCount: 40 },
      { id: 'genetics', name: 'Genetics', questionCount: 40 },
      { id: 'ecology', name: 'Ecology', questionCount: 40 },
      { id: 'human-physiology', name: 'Human Physiology', questionCount: 40 },
      { id: 'plant-physiology', name: 'Plant Physiology', questionCount: 40 },
      { id: 'evolution', name: 'Evolution', questionCount: 40 },
    ],
  },
  {
    id: 'maths',
    name: 'Mathematics',
    icon: '📐',
    color: 'maths',
    chapters: [
      { id: 'calculus', name: 'Calculus', questionCount: 40 },
      { id: 'algebra', name: 'Algebra', questionCount: 40 },
      { id: 'coordinate-geometry', name: 'Coordinate Geometry', questionCount: 40 },
      { id: 'trigonometry', name: 'Trigonometry', questionCount: 40 },
      { id: 'vectors', name: 'Vectors & 3D Geometry', questionCount: 40 },
      { id: 'probability', name: 'Probability & Statistics', questionCount: 40 },
    ],
  },
];
