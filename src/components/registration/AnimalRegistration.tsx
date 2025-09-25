import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Save, 
  RotateCcw,
  CheckCircle,
  Camera,
  MapPin,
  User,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AnimalFormData {
  animalId: string;
  species: string;
  breed: string;
  age: string;
  ageUnit: string;
  gender: string;
  ownerName: string;
  ownerPhone: string;
  ownerAddress: string;
  village: string;
  district: string;
  state: string;
  healthStatus: string;
  notes: string;
}

const cattleBreeds = [
  "Gir", "Red Sindhi", "Sahiwal", "Tharparkar", "Rathi", "Hariana", 
  "Kangayam", "Ongole", "Krishna Valley", "Deoni", "Khillari", "Malvi"
];

const buffaloBreeds = [
  "Murrah", "Nili-Ravi", "Surti", "Jaffarabadi", "Bhadawari", 
  "Nagpuri", "Toda", "Pandharpuri", "Kalahandi", "Marathwadi"
];

const initialFormData: AnimalFormData = {
  animalId: "",
  species: "",
  breed: "",
  age: "",
  ageUnit: "years",
  gender: "",
  ownerName: "",
  ownerPhone: "",
  ownerAddress: "",
  village: "",
  district: "",
  state: "",
  healthStatus: "healthy",
  notes: ""
};

export const AnimalRegistration = () => {
  const [formData, setFormData] = useState<AnimalFormData>(initialFormData);
  const [aiSuggestedBreed, setAiSuggestedBreed] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof AnimalFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setAiSuggestedBreed(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Animal Registered Successfully",
        description: `${formData.species} #${formData.animalId || 'AUTO-GEN'} has been added to the database.`,
      });
      setIsSubmitting(false);
      resetForm();
    }, 1500);
  };

  const availableBreeds = formData.species === "Cattle" ? cattleBreeds : 
                         formData.species === "Buffalo" ? buffaloBreeds : [];

  // Simulate AI breed suggestion
  const simulateAiSuggestion = () => {
    if (formData.species) {
      const breeds = formData.species === "Cattle" ? cattleBreeds : buffaloBreeds;
      const suggested = breeds[Math.floor(Math.random() * breeds.length)];
      setAiSuggestedBreed(suggested);
      handleInputChange("breed", suggested);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Animal Registration</h1>
          <p className="text-muted-foreground">Register new animals in the Bharat Pashudhan database</p>
        </div>
        <Button onClick={resetForm} variant="outline" className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset Form
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Animal Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Animal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="animalId">Animal ID (Optional)</Label>
                    <Input
                      id="animalId"
                      placeholder="Auto-generated if empty"
                      value={formData.animalId}
                      onChange={(e) => handleInputChange("animalId", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="species">Species *</Label>
                    <Select value={formData.species} onValueChange={(value) => handleInputChange("species", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select species" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cattle">Cattle</SelectItem>
                        <SelectItem value="Buffalo">Buffalo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="breed">Breed *</Label>
                    <div className="flex gap-2">
                      <Select value={formData.breed} onValueChange={(value) => handleInputChange("breed", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select breed" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableBreeds.map((breed) => (
                            <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        onClick={simulateAiSuggestion}
                        disabled={!formData.species}
                        variant="outline"
                        size="icon"
                        title="AI Breed Suggestion"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    {aiSuggestedBreed && (
                      <div className="mt-2">
                        <Badge className="bg-primary text-primary-foreground gap-1">
                          <CheckCircle className="h-3 w-3" />
                          AI Suggested: {aiSuggestedBreed}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter age"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ageUnit">Age Unit</Label>
                    <Select value={formData.ageUnit} onValueChange={(value) => handleInputChange("ageUnit", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="months">Months</SelectItem>
                        <SelectItem value="years">Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="healthStatus">Health Status</Label>
                    <Select value={formData.healthStatus} onValueChange={(value) => handleInputChange("healthStatus", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthy">Healthy</SelectItem>
                        <SelectItem value="sick">Sick</SelectItem>
                        <SelectItem value="pregnant">Pregnant</SelectItem>
                        <SelectItem value="lactating">Lactating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Owner Information */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Owner Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ownerName">Owner Name *</Label>
                    <Input
                      id="ownerName"
                      placeholder="Enter owner name"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange("ownerName", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerPhone">Phone Number *</Label>
                    <Input
                      id="ownerPhone"
                      placeholder="Enter phone number"
                      value={formData.ownerPhone}
                      onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="ownerAddress">Address</Label>
                  <Textarea
                    id="ownerAddress"
                    placeholder="Enter complete address"
                    value={formData.ownerAddress}
                    onChange={(e) => handleInputChange("ownerAddress", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="village">Village *</Label>
                    <Input
                      id="village"
                      placeholder="Enter village"
                      value={formData.village}
                      onChange={(e) => handleInputChange("village", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">District *</Label>
                    <Input
                      id="district"
                      placeholder="Enter district"
                      value={formData.district}
                      onChange={(e) => handleInputChange("district", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registration Summary & Actions */}
          <div className="space-y-6">
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle>Registration Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Species:</span>
                    <span className="font-medium">{formData.species || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Breed:</span>
                    <span className="font-medium">{formData.breed || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age:</span>
                    <span className="font-medium">
                      {formData.age ? `${formData.age} ${formData.ageUnit}` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gender:</span>
                    <span className="font-medium">{formData.gender || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner:</span>
                    <span className="font-medium">{formData.ownerName || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium text-right">
                      {formData.village ? `${formData.village}, ${formData.district}` : "-"}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    type="submit" 
                    className="w-full gap-2"
                    disabled={isSubmitting || !formData.species || !formData.breed || !formData.ownerName}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Register Animal
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="card-shadow">
              <CardHeader>
                <CardTitle className="text-base">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Use AI breed suggestion for accurate identification</li>
                  <li>• Ensure phone number is valid for farmer contact</li>
                  <li>• Complete address helps with location-based insights</li>
                  <li>• Health status is important for tracking</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Notes */}
        <Card className="mt-6 card-shadow">
          <CardHeader>
            <CardTitle>Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Any additional information about the animal (medical history, special characteristics, etc.)"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              rows={3}
            />
          </CardContent>
        </Card>
      </form>
    </div>
  );
};