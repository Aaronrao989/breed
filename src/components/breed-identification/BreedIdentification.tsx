import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Camera, 
  Upload, 
  RotateCcw, 
  CheckCircle,
  Info,
  Image as ImageIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface BreedPrediction {
  breed: string;
  confidence: number;
  species: 'Cattle' | 'Buffalo';
  region: string;
  characteristics: string[];
}

const mockPredictions: BreedPrediction[] = [
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

export const BreedIdentification = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<BreedPrediction[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [confirmedBreed, setConfirmedBreed] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setPredictions(null);
        setConfirmedBreed(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    toast({
      title: "Camera Feature",
      description: "Camera integration would be implemented here for mobile devices.",
    });
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("file", blob, "image.jpg");

      // Call Render Flask API
      const res = await axios.post(
        "https://breed-5oyq9vgj1.onrender.com/predict",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const data = res.data;

      // Map API response to BreedPrediction[]
      const formattedPredictions: BreedPrediction[] = data.top3_prob.map(
        (prob: number, idx: number) => ({
          breed: data.top3_indices[idx], // Replace with actual breed name mapping if needed
          confidence: prob,
          species: "Cattle",
          region: "",
          characteristics: [],
        })
      );

      setPredictions(formattedPredictions);

      toast({
        title: "Analysis Complete",
        description: "AI has identified potential breeds for your animal.",
      });

    } catch (error) {
      console.log("Using mock predictions:", error);
      setTimeout(() => {
        setPredictions(mockPredictions);
        toast({
          title: "Demo Mode",
          description: "Using mock predictions. Connect your API for live results.",
        });
      }, 1500);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const confirmBreed = (breed: string) => {
    setConfirmedBreed(breed);
    toast({
      title: "Breed Confirmed",
      description: `${breed} has been confirmed as the breed for this animal.`,
    });
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setPredictions(null);
    setConfirmedBreed(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return "bg-success text-success-foreground";
    if (confidence >= 75) return "bg-warning text-warning-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Breed Identification</h1>
          <p className="text-muted-foreground">Upload or capture animal photos for AI-powered breed recognition</p>
        </div>
        <div className="flex gap-2">
          {selectedImage && (
            <Button onClick={resetAnalysis} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Start Over
            </Button>
          )}
        </div>
      </div>

      {/* Notice about Streamlit live demo */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle>Live AI Demo (Streamlit)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The live AI demo using Streamlit cannot be embedded on Vercel. You can view it directly:
            <a href="https://breed-5oyq9vgj1.onrender.com" target="_blank" className="text-primary ml-1">
              Open Streamlit Demo
            </a>
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Upload Section */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Upload Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!selectedImage ? (
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <div className="space-y-4">
                  <div className="flex justify-center gap-4">
                    <Button onClick={() => fileInputRef.current?.click()} className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </Button>
                    <Button onClick={handleCameraCapture} variant="secondary" className="gap-2">
                      <Camera className="h-4 w-4" />
                      Take Photo
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload a clear photo of the animal for best results
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={selectedImage} 
                    alt="Uploaded animal" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  {confirmedBreed && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-success text-success-foreground gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Confirmed
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={analyzeImage} 
                    disabled={isAnalyzing || !!predictions}
                    className="flex-1 gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4" />
                        Identify Breed
                      </>
                    )}
                  </Button>
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>AI Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4 animate-spin" />
                <p className="text-muted-foreground">Analyzing image...</p>
              </div>
            ) : predictions ? (
              <div className="space-y-4">
                {predictions.map((prediction, index) => (
                  <Card key={index} className={`border-2 ${index === 0 ? 'border-primary/50 bg-primary/5' : 'border-border'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{prediction.breed}</h3>
                          <p className="text-sm text-muted-foreground">{prediction.species} • {prediction.region}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getConfidenceBadge(prediction.confidence)}>
                            {prediction.confidence.toFixed(1)}%
                          </Badge>
                        </div>
                      </div>
                      
                      <Progress value={prediction.confidence} className="mb-3" />
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Key Characteristics:</p>
                        <div className="flex flex-wrap gap-1">
                          {prediction.characteristics.map((char, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {char}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button 
                          onClick={() => confirmBreed(prediction.breed)}
                          disabled={!!confirmedBreed}
                          size="sm"
                          variant={index === 0 ? "default" : "outline"}
                          className="gap-1"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Confirm
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Info className="h-3 w-3" />
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Camera className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Upload an image to get AI breed predictions</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
