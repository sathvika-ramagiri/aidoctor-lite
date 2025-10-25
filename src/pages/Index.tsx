import { useState } from "react";
import { Activity, RefreshCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SymptomInput } from "@/components/SymptomInput";
import { DiseaseResults } from "@/components/DiseaseResults";
import { findMatchingDiseases, DiseaseMatch } from "@/lib/symptomMatcher";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [results, setResults] = useState<DiseaseMatch[]>([]);
  const [explanations, setExplanations] = useState<{ [key: string]: string }>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingExplanations, setLoadingExplanations] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async (symptoms: string[]) => {
    setIsAnalyzing(true);
    setResults([]);
    setExplanations({});

    try {
      // Find matching diseases
      const matches = findMatchingDiseases(symptoms);
      
      if (matches.length === 0) {
        toast({
          title: "No matches found",
          description: "We couldn't find any diseases matching your symptoms. Please try different symptoms or consult a healthcare professional.",
          variant: "destructive",
        });
        setIsAnalyzing(false);
        return;
      }

      setResults(matches);
      setIsAnalyzing(false);

      // Generate AI explanations for each match
      setLoadingExplanations(true);
      const newExplanations: { [key: string]: string } = {};

      for (const match of matches) {
        try {
          const { data, error } = await supabase.functions.invoke('explain-symptoms', {
            body: {
              diseaseName: match.disease.name,
              matchedSymptoms: match.matchedSymptoms,
              userSymptoms: symptoms
            }
          });

          if (error) {
            console.error('Error getting explanation:', error);
            newExplanations[match.disease.name] = "Unable to generate explanation at this time.";
          } else {
            newExplanations[match.disease.name] = data.explanation;
          }
        } catch (err) {
          console.error('Exception getting explanation:', err);
          newExplanations[match.disease.name] = "Unable to generate explanation at this time.";
        }

        setExplanations({ ...newExplanations });
      }

      setLoadingExplanations(false);

    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      toast({
        title: "Analysis failed",
        description: "An error occurred while analyzing your symptoms. Please try again.",
        variant: "destructive",
      });
      setIsAnalyzing(false);
      setLoadingExplanations(false);
    }
  };

  const handleReset = () => {
    setResults([]);
    setExplanations({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Activity className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            AI-Powered Symptom Checker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get insights into potential conditions based on your symptoms using advanced AI technology
          </p>
        </div>

        {/* Disclaimer */}
        <Alert className="max-w-2xl mx-auto mb-8 border-destructive/50 bg-destructive/5">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Medical Disclaimer</AlertTitle>
          <AlertDescription>
            This tool is for informational purposes only and is not a substitute for professional medical advice, 
            diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider 
            with any questions you may have regarding a medical condition.
          </AlertDescription>
        </Alert>

        {/* Input Section */}
        {results.length === 0 ? (
          <SymptomInput onAnalyze={handleAnalyze} isLoading={isAnalyzing} />
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center">
              <Button onClick={handleReset} variant="outline" size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
            
            <DiseaseResults 
              results={results} 
              explanations={explanations}
              loadingExplanations={loadingExplanations}
            />
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-16 text-center text-sm text-muted-foreground max-w-xl mx-auto">
          <p>
            This symptom checker uses a database of common conditions and AI to provide preliminary guidance. 
            Results are based on symptom similarity matching and should not replace professional medical consultation.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
