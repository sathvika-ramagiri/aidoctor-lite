export interface Disease {
  name: string;
  symptoms: string[];
  commonSymptoms: string[];
}

export const diseaseDatabase: Disease[] = [
  {
    name: "Flu (Influenza)",
    symptoms: ["fever", "cough", "sore throat", "tiredness", "body aches", "headache", "chills", "runny nose"],
    commonSymptoms: ["fever", "cough", "sore throat", "tiredness"]
  },
  {
    name: "Migraine",
    symptoms: ["headache", "nausea", "vomiting", "light sensitivity", "sound sensitivity", "visual disturbances", "dizziness"],
    commonSymptoms: ["headache", "nausea", "light sensitivity"]
  },
  {
    name: "Type 2 Diabetes",
    symptoms: ["frequent urination", "thirst", "fatigue", "blurred vision", "slow healing", "weight loss", "tingling hands", "tingling feet"],
    commonSymptoms: ["frequent urination", "thirst", "fatigue", "blurred vision"]
  },
  {
    name: "Common Cold",
    symptoms: ["runny nose", "sneezing", "sore throat", "cough", "congestion", "mild headache", "mild fever"],
    commonSymptoms: ["runny nose", "sneezing", "sore throat", "cough"]
  },
  {
    name: "COVID-19",
    symptoms: ["fever", "dry cough", "tiredness", "loss of taste", "loss of smell", "difficulty breathing", "chest pain", "body aches"],
    commonSymptoms: ["fever", "dry cough", "tiredness", "loss of taste"]
  },
  {
    name: "Allergic Rhinitis",
    symptoms: ["sneezing", "runny nose", "itchy eyes", "nasal congestion", "postnasal drip", "cough", "fatigue"],
    commonSymptoms: ["sneezing", "runny nose", "itchy eyes", "nasal congestion"]
  },
  {
    name: "Asthma",
    symptoms: ["wheezing", "shortness of breath", "chest tightness", "cough", "difficulty breathing", "rapid breathing"],
    commonSymptoms: ["wheezing", "shortness of breath", "chest tightness", "cough"]
  },
  {
    name: "Hypertension (High Blood Pressure)",
    symptoms: ["headache", "dizziness", "blurred vision", "chest pain", "shortness of breath", "nosebleeds", "fatigue"],
    commonSymptoms: ["headache", "dizziness", "blurred vision"]
  },
  {
    name: "Gastroenteritis (Stomach Flu)",
    symptoms: ["diarrhea", "nausea", "vomiting", "stomach cramps", "fever", "dehydration", "loss of appetite"],
    commonSymptoms: ["diarrhea", "nausea", "vomiting", "stomach cramps"]
  },
  {
    name: "Urinary Tract Infection (UTI)",
    symptoms: ["burning urination", "frequent urination", "cloudy urine", "pelvic pain", "strong urge to urinate", "blood in urine"],
    commonSymptoms: ["burning urination", "frequent urination", "pelvic pain"]
  },
  {
    name: "Anxiety Disorder",
    symptoms: ["excessive worry", "restlessness", "fatigue", "difficulty concentrating", "irritability", "muscle tension", "sleep problems"],
    commonSymptoms: ["excessive worry", "restlessness", "fatigue"]
  },
  {
    name: "Depression",
    symptoms: ["persistent sadness", "loss of interest", "fatigue", "sleep problems", "appetite changes", "difficulty concentrating", "feelings of worthlessness"],
    commonSymptoms: ["persistent sadness", "loss of interest", "fatigue"]
  },
  {
    name: "Pneumonia",
    symptoms: ["cough", "fever", "chest pain", "difficulty breathing", "fatigue", "sweating", "chills", "confusion"],
    commonSymptoms: ["cough", "fever", "chest pain", "difficulty breathing"]
  },
  {
    name: "Bronchitis",
    symptoms: ["cough", "mucus production", "chest discomfort", "fatigue", "shortness of breath", "mild fever"],
    commonSymptoms: ["cough", "mucus production", "chest discomfort"]
  },
  {
    name: "Anemia",
    symptoms: ["fatigue", "weakness", "pale skin", "dizziness", "cold hands", "cold feet", "headache", "irregular heartbeat"],
    commonSymptoms: ["fatigue", "weakness", "pale skin", "dizziness"]
  },
  {
    name: "Hypothyroidism",
    symptoms: ["fatigue", "weight gain", "cold intolerance", "constipation", "dry skin", "hair loss", "depression", "muscle weakness"],
    commonSymptoms: ["fatigue", "weight gain", "cold intolerance"]
  },
  {
    name: "Hyperthyroidism",
    symptoms: ["weight loss", "rapid heartbeat", "increased appetite", "nervousness", "tremors", "sweating", "heat intolerance", "fatigue"],
    commonSymptoms: ["weight loss", "rapid heartbeat", "nervousness"]
  },
  {
    name: "Sinusitis",
    symptoms: ["facial pain", "nasal congestion", "thick nasal discharge", "reduced smell", "cough", "headache", "ear pressure"],
    commonSymptoms: ["facial pain", "nasal congestion", "headache"]
  },
  {
    name: "Strep Throat",
    symptoms: ["severe sore throat", "fever", "swollen tonsils", "white patches throat", "swollen lymph nodes", "headache", "rash"],
    commonSymptoms: ["severe sore throat", "fever", "swollen tonsils"]
  },
  {
    name: "Mononucleosis",
    symptoms: ["severe fatigue", "fever", "sore throat", "swollen lymph nodes", "swollen tonsils", "headache", "rash"],
    commonSymptoms: ["severe fatigue", "fever", "sore throat", "swollen lymph nodes"]
  }
];

export const getAllSymptoms = (): string[] => {
  const symptomsSet = new Set<string>();
  diseaseDatabase.forEach(disease => {
    disease.symptoms.forEach(symptom => symptomsSet.add(symptom));
  });
  return Array.from(symptomsSet).sort();
};
