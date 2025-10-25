import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { DiseaseMatch } from "@/lib/symptomMatcher";

interface DiseaseResultsProps {
  results: DiseaseMatch[];
  explanations: { [key: string]: string };
  loadingExplanations: boolean;
}

export const DiseaseResults = ({ results, explanations, loadingExplanations }: DiseaseResultsProps) => {
  if (results.length === 0) {
    return null;
  }

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.5) return "bg-primary/10 text-primary border-primary/20";
    if (confidence >= 0.3) return "bg-secondary/10 text-secondary-foreground border-secondary/20";
    return "bg-muted text-muted-foreground border-border";
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Top 3 Potential Conditions</h2>
        <p className="text-sm text-muted-foreground">
          Based on your reported symptoms
        </p>
      </div>

      <div className="space-y-4">
        {results.map((match, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{match.disease.name}</CardTitle>
                <Badge 
                  variant="outline" 
                  className={`${getConfidenceColor(match.confidence)} font-semibold`}
                >
                  {(match.confidence * 100).toFixed(0)}% match
                </Badge>
              </div>
              <CardDescription className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>
                  Matched {match.matchedSymptoms.length} of your symptoms
                </span>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Matched Symptoms:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {match.matchedSymptoms.map((symptom, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  AI Explanation:
                </h4>
                {loadingExplanations && !explanations[match.disease.name] ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating explanation...
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {explanations[match.disease.name] || "Explanation not available."}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
