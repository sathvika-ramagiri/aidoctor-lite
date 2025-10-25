import { Disease, diseaseDatabase } from "@/data/diseaseData";

export interface DiseaseMatch {
  disease: Disease;
  confidence: number;
  matchedSymptoms: string[];
}

/**
 * Calculate similarity between user symptoms and disease symptoms
 * Uses Jaccard similarity coefficient
 */
const calculateSimilarity = (userSymptoms: string[], diseaseSymptoms: string[]): number => {
  const userSet = new Set(userSymptoms.map(s => s.toLowerCase().trim()));
  const diseaseSet = new Set(diseaseSymptoms.map(s => s.toLowerCase().trim()));
  
  let intersection = 0;
  userSet.forEach(symptom => {
    if (diseaseSet.has(symptom)) {
      intersection++;
    }
  });
  
  const union = userSet.size + diseaseSet.size - intersection;
  
  return union === 0 ? 0 : intersection / union;
};

/**
 * Find top 3 matching diseases based on user symptoms
 */
export const findMatchingDiseases = (userSymptoms: string[]): DiseaseMatch[] => {
  if (!userSymptoms || userSymptoms.length === 0) {
    return [];
  }

  const matches: DiseaseMatch[] = diseaseDatabase.map(disease => {
    const confidence = calculateSimilarity(userSymptoms, disease.symptoms);
    const matchedSymptoms = userSymptoms.filter(userSymptom => 
      disease.symptoms.some(diseaseSymptom => 
        diseaseSymptom.toLowerCase().trim() === userSymptom.toLowerCase().trim()
      )
    );
    
    return {
      disease,
      confidence,
      matchedSymptoms
    };
  });

  // Sort by confidence and return top 3
  return matches
    .filter(match => match.confidence > 0)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
};
