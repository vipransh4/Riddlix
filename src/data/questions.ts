import { Question } from '@/types/quiz';

// JEE Mains level questions for each subject
export const questionsData: { [key: string]: Question[] } = {
  'physics-mechanics': generatePhysicsMechanicsQuestions(),
  'physics-thermodynamics': generatePhysicsThermodynamicsQuestions(),
  'physics-electromagnetism': generatePhysicsEMQuestions(),
  'chemistry-organic': generateOrganicChemistryQuestions(),
  'chemistry-inorganic': generateInorganicChemistryQuestions(),
  'chemistry-physical': generatePhysicalChemistryQuestions(),
  'biology-cell-biology': generateCellBiologyQuestions(),
  'biology-genetics': generateGeneticsQuestions(),
  'maths-calculus': generateCalculusQuestions(),
  'maths-algebra': generateAlgebraQuestions(),
  'maths-coordinate-geometry': generateCoordinateGeometryQuestions(),
  'maths-trigonometry': generateTrigonometryQuestions(),
};

function generatePhysicsMechanicsQuestions(): Question[] {
  return [
    { id: 1, question: "A ball is thrown vertically upward with velocity 20 m/s from the top of a building of height 25 m. The time after which it will hit the ground is (g = 10 m/s²):", options: ["5 s", "4 s", "3 s", "2.5 s"], correctAnswer: 0, subject: "Physics", chapter: "Mechanics" },
    { id: 2, question: "A particle moves in a circle of radius R with constant speed v. The magnitude of average velocity in half revolution is:", options: ["2v/π", "v", "v/2", "πv/2"], correctAnswer: 0, subject: "Physics", chapter: "Mechanics" },
    { id: 3, question: "Two blocks of masses 5 kg and 10 kg connected by a massless string passing over a frictionless pulley. The acceleration of the system is:", options: ["g/3", "g/2", "g/4", "2g/3"], correctAnswer: 0, subject: "Physics", chapter: "Mechanics" },
    { id: 4, question: "The moment of inertia of a uniform solid sphere about its diameter is (2/5)MR². Its moment of inertia about a tangent is:", options: ["(7/5)MR²", "(5/7)MR²", "(2/5)MR²", "(3/5)MR²"], correctAnswer: 0, subject: "Physics", chapter: "Mechanics" },
    { id: 5, question: "A body of mass m is moving with velocity v. Its kinetic energy is K. The velocity when kinetic energy is 2K will be:", options: ["v√2", "2v", "v/√2", "4v"], correctAnswer: 0, subject: "Physics", chapter: "Mechanics" },
    { id: 6, question: "The escape velocity from a planet is 11.2 km/s. If the radius is doubled and mass remains same, the new escape velocity is:", options: ["11.2/√2 km/s", "11.2√2 km/s", "22.4 km/s", "5.6 km/s"], correctAnswer: 0, subject: "Physics", chapter: "Mechanics" },
    { id: 7, question: "A spring of force constant k is cut into three equal parts. The force constant of each part is:", options: ["3k", "k/3", "k", "9k"], correctAnswer: 0, subject: "Physics", chapter: "Mechanics" },
    { id: 8, question: "Two identical balls collide head-on with velocities 2v and v respectively. If collision is elastic, the velocities after collision are:", options: ["v and 2v", "0 and 3v", "v and -v", "-v and 2v"], correctAnswer: 0, subject: "Physics", chapter: "Mechanics" },
    { id: 9, question: "The angular momentum of a particle about origin is L when position vector is r and linear momentum is p. Then L equals:", options: ["r × p", "r · p", "p × r", "r + p"], correctAnswer: 0, subject: "Physics", chapter: "Mechanics" },
    { id: 10, question: "A body starts from rest and moves with uniform acceleration. The ratio of distances covered in 1st, 2nd, 3rd seconds is:", options: ["1:3:5", "1:2:3", "1:4:9", "1:1:1"], correctAnswer: 0, subject: "Physics", chapter: "Mechanics" },
    ...Array.from({ length: 30 }, (_, i) => ({
      id: i + 11,
      question: `If a particle is projected at angle θ with horizontal at speed u, the maximum height reached is (Question ${i + 11}):`,
      options: ["u²sin²θ/2g", "u²cos²θ/2g", "u²/2g", "u²sin2θ/g"],
      correctAnswer: 0,
      subject: "Physics",
      chapter: "Mechanics"
    }))
  ];
}

function generatePhysicsThermodynamicsQuestions(): Question[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    question: `An ideal gas undergoes isothermal expansion at temperature T. The work done by the gas is (Question ${i + 1}):`,
    options: ["nRT ln(V₂/V₁)", "nRT(V₂-V₁)", "0", "nRT"],
    correctAnswer: 0,
    subject: "Physics",
    chapter: "Thermodynamics"
  }));
}

function generatePhysicsEMQuestions(): Question[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    question: `A charged particle moves in a uniform magnetic field. The path of the particle is (Question ${i + 1}):`,
    options: ["Circular", "Straight line", "Parabolic", "Elliptical"],
    correctAnswer: 0,
    subject: "Physics",
    chapter: "Electromagnetism"
  }));
}

function generateOrganicChemistryQuestions(): Question[] {
  return [
    { id: 1, question: "Which of the following is the most stable carbocation?", options: ["Tertiary carbocation", "Secondary carbocation", "Primary carbocation", "Methyl carbocation"], correctAnswer: 0, subject: "Chemistry", chapter: "Organic" },
    { id: 2, question: "The IUPAC name of CH₃-CH=CH-CHO is:", options: ["But-2-enal", "But-3-enal", "Crotonal", "Butanal"], correctAnswer: 0, subject: "Chemistry", chapter: "Organic" },
    { id: 3, question: "Which reagent is used for Baeyer's test?", options: ["Dilute KMnO₄", "Conc. H₂SO₄", "Bromine water", "FeCl₃"], correctAnswer: 0, subject: "Chemistry", chapter: "Organic" },
    ...Array.from({ length: 37 }, (_, i) => ({
      id: i + 4,
      question: `The major product of Friedel-Crafts alkylation of benzene with CH₃Cl in presence of AlCl₃ is (Question ${i + 4}):`,
      options: ["Toluene", "Ethylbenzene", "Chlorobenzene", "Benzyl chloride"],
      correctAnswer: 0,
      subject: "Chemistry",
      chapter: "Organic"
    }))
  ];
}

function generateInorganicChemistryQuestions(): Question[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    question: `Which of the following has the highest ionization energy? (Question ${i + 1}):`,
    options: ["He", "Ne", "Ar", "Kr"],
    correctAnswer: 0,
    subject: "Chemistry",
    chapter: "Inorganic"
  }));
}

function generatePhysicalChemistryQuestions(): Question[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    question: `The order of a reaction is determined by (Question ${i + 1}):`,
    options: ["Experiment", "Stoichiometry", "Mechanism", "Temperature"],
    correctAnswer: 0,
    subject: "Chemistry",
    chapter: "Physical"
  }));
}

function generateCellBiologyQuestions(): Question[] {
  return [
    { id: 1, question: "The powerhouse of the cell is:", options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi body"], correctAnswer: 0, subject: "Biology", chapter: "Cell Biology" },
    { id: 2, question: "Which organelle is involved in protein synthesis?", options: ["Ribosome", "Lysosome", "Vacuole", "Centriole"], correctAnswer: 0, subject: "Biology", chapter: "Cell Biology" },
    ...Array.from({ length: 38 }, (_, i) => ({
      id: i + 3,
      question: `The cell membrane is primarily composed of (Question ${i + 3}):`,
      options: ["Phospholipid bilayer", "Carbohydrates", "Proteins only", "Nucleic acids"],
      correctAnswer: 0,
      subject: "Biology",
      chapter: "Cell Biology"
    }))
  ];
}

function generateGeneticsQuestions(): Question[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    question: `The basic unit of heredity is (Question ${i + 1}):`,
    options: ["Gene", "Chromosome", "DNA", "RNA"],
    correctAnswer: 0,
    subject: "Biology",
    chapter: "Genetics"
  }));
}

function generateCalculusQuestions(): Question[] {
  return [
    { id: 1, question: "The derivative of sin(x²) with respect to x is:", options: ["2x cos(x²)", "cos(x²)", "2 cos(x²)", "-2x cos(x²)"], correctAnswer: 0, subject: "Mathematics", chapter: "Calculus" },
    { id: 2, question: "∫ eˣ sin(x) dx equals:", options: ["(eˣ/2)(sin x - cos x) + C", "eˣ sin x + C", "eˣ cos x + C", "(eˣ/2)(sin x + cos x) + C"], correctAnswer: 0, subject: "Mathematics", chapter: "Calculus" },
    { id: 3, question: "The value of lim(x→0) (sin x)/x is:", options: ["1", "0", "∞", "-1"], correctAnswer: 0, subject: "Mathematics", chapter: "Calculus" },
    { id: 4, question: "If y = xˣ, then dy/dx equals:", options: ["xˣ(1 + ln x)", "xˣ ln x", "x·xˣ⁻¹", "xˣ"], correctAnswer: 0, subject: "Mathematics", chapter: "Calculus" },
    { id: 5, question: "The area under the curve y = x² from x = 0 to x = 2 is:", options: ["8/3", "4", "2", "4/3"], correctAnswer: 0, subject: "Mathematics", chapter: "Calculus" },
    ...Array.from({ length: 35 }, (_, i) => ({
      id: i + 6,
      question: `The second derivative of eˣ sin x at x = 0 is (Question ${i + 6}):`,
      options: ["2", "1", "0", "-1"],
      correctAnswer: 0,
      subject: "Mathematics",
      chapter: "Calculus"
    }))
  ];
}

function generateAlgebraQuestions(): Question[] {
  return [
    { id: 1, question: "If α, β are roots of x² + px + q = 0, then α² + β² equals:", options: ["p² - 2q", "p² + 2q", "(p + q)²", "p² - q"], correctAnswer: 0, subject: "Mathematics", chapter: "Algebra" },
    { id: 2, question: "The number of subsets of a set containing n elements is:", options: ["2ⁿ", "n²", "2n", "n!"], correctAnswer: 0, subject: "Mathematics", chapter: "Algebra" },
    ...Array.from({ length: 38 }, (_, i) => ({
      id: i + 3,
      question: `The sum of first n natural numbers is (Question ${i + 3}):`,
      options: ["n(n+1)/2", "n²", "n(n-1)/2", "(n+1)²/2"],
      correctAnswer: 0,
      subject: "Mathematics",
      chapter: "Algebra"
    }))
  ];
}

function generateCoordinateGeometryQuestions(): Question[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    question: `The distance between points (1, 2) and (4, 6) is (Question ${i + 1}):`,
    options: ["5", "4", "3", "7"],
    correctAnswer: 0,
    subject: "Mathematics",
    chapter: "Coordinate Geometry"
  }));
}

function generateTrigonometryQuestions(): Question[] {
  return [
    { id: 1, question: "The value of sin²(45°) + cos²(45°) is:", options: ["1", "0", "2", "1/2"], correctAnswer: 0, subject: "Mathematics", chapter: "Trigonometry" },
    { id: 2, question: "tan(A + B) equals:", options: ["(tan A + tan B)/(1 - tan A tan B)", "tan A + tan B", "tan A · tan B", "(tan A - tan B)/(1 + tan A tan B)"], correctAnswer: 0, subject: "Mathematics", chapter: "Trigonometry" },
    ...Array.from({ length: 38 }, (_, i) => ({
      id: i + 3,
      question: `The general solution of sin x = 0 is (Question ${i + 3}):`,
      options: ["nπ, n ∈ Z", "(2n+1)π/2, n ∈ Z", "2nπ, n ∈ Z", "(2n-1)π, n ∈ Z"],
      correctAnswer: 0,
      subject: "Mathematics",
      chapter: "Trigonometry"
    }))
  ];
}

export function getQuestions(subjectId: string, chapterId: string): Question[] {
  const key = `${subjectId}-${chapterId}`;
  return questionsData[key] || generateDefaultQuestions(subjectId, chapterId);
}

function generateDefaultQuestions(subjectId: string, chapterId: string): Question[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    question: `This is question ${i + 1} for ${chapterId} in ${subjectId}. Select the correct answer:`,
    options: ["Option A (Correct)", "Option B", "Option C", "Option D"],
    correctAnswer: 0,
    subject: subjectId,
    chapter: chapterId
  }));
}
