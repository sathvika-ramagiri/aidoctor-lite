import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { getAllSymptoms } from "@/data/diseaseData";

interface SymptomInputProps {
  onAnalyze: (symptoms: string[]) => void;
  isLoading: boolean;
}

export const SymptomInput = ({ onAnalyze, isLoading }: SymptomInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const allSymptoms = getAllSymptoms();

  const handleInputChange = (value: string) => {
    setInputValue(value);
    
    if (value.trim().length > 1) {
      const filtered = allSymptoms.filter(symptom =>
        symptom.toLowerCase().includes(value.toLowerCase()) &&
        !selectedSymptoms.includes(symptom)
      );
      setSuggestions(filtered.slice(0, 8));
    } else {
      setSuggestions([]);
    }
  };

  const addSymptom = (symptom: string) => {
    const trimmed = symptom.trim().toLowerCase();
    if (trimmed && !selectedSymptoms.includes(trimmed)) {
      setSelectedSymptoms([...selectedSymptoms, trimmed]);
      setInputValue("");
      setSuggestions([]);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSymptom(inputValue);
    }
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length > 0) {
      onAnalyze(selectedSymptoms);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <Label htmlFor="symptom-input" className="text-base">Enter your symptoms</Label>
        <div className="relative">
          <Input
            id="symptom-input"
            type="text"
            placeholder="Type symptoms (e.g., fever, cough, headache)..."
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full"
            disabled={isLoading}
          />
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
              {suggestions.map((symptom, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left hover:bg-accent transition-colors"
                  onClick={() => addSymptom(symptom)}
                >
                  {symptom}
                </button>
              ))}
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Press Enter or click a suggestion to add symptoms
        </p>
      </div>

      {selectedSymptoms.length > 0 && (
        <div className="space-y-2">
          <Label className="text-base">Selected symptoms</Label>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms.map((symptom, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-3 py-1.5">
                {symptom}
                <button
                  onClick={() => removeSymptom(symptom)}
                  className="ml-2 hover:text-destructive transition-colors"
                  aria-label={`Remove ${symptom}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={handleAnalyze}
        disabled={selectedSymptoms.length === 0 || isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? "Analyzing..." : "Analyze Symptoms"}
      </Button>
    </div>
  );
};
