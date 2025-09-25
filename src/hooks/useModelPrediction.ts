import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface BreedPrediction {
  breed: string;
  confidence: number;
  species: 'Cattle' | 'Buffalo';
  region: string;
  characteristics: string[];
}

interface PredictionResponse {
  predictions: BreedPrediction[];
}

export const useModelPrediction = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const predictBreed = async (imageFile: string): Promise<BreedPrediction[] | null> => {
    setIsAnalyzing(true);
    
    try {
      // Option 1: Call your FastAPI backend
      const response = await fetch(imageFile);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('file', blob, 'image.jpg');
      
      const apiResponse = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
      });
      
      if (!apiResponse.ok) {
        throw new Error('Prediction failed');
      }
      
      const data: PredictionResponse = await apiResponse.json();
      
      toast({
        title: "Analysis Complete",
        description: "AI has identified potential breeds for your animal.",
      });
      
      return data.predictions;
      
    } catch (error) {
      console.error('Prediction error:', error);
      
      // Fallback to mock data for demo
      toast({
        title: "Using Demo Data",
        description: "Connect your model API for live predictions.",
        variant: "default",
      });
      
      // Return mock predictions for demo
      return [
        {
          breed: "Gir",
          confidence: 96.8,
          species: "Cattle",
          region: "Gujarat, Rajasthan",
          characteristics: ["Distinctive hump", "Drooping ears", "Heat resistant", "Good milk producer"]
        },
        {
          breed: "Red Sindhi",
          confidence: 89.2,
          species: "Cattle", 
          region: "Sindh, Punjab",
          characteristics: ["Red coat color", "Medium sized", "Dual purpose", "Hardy breed"]
        },
        {
          breed: "Sahiwal",
          confidence: 76.4,
          species: "Cattle",
          region: "Punjab, Haryana",
          characteristics: ["Reddish brown", "Good milker", "Heat tolerant", "Docile temperament"]
        }
      ];
      
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    predictBreed,
    isAnalyzing
  };
};