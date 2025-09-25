import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter,
  MapPin,
  Star,
  Milk,
  TrendingUp,
  Shield,
  Info
} from "lucide-react";

interface Breed {
  id: string;
  name: string;
  species: 'Cattle' | 'Buffalo';
  origin: string;
  description: string;
  characteristics: string[];
  milkYield: string;
  purpose: string;
  adaptability: string;
  imageUrl: string;
  popularity: number;
}

const mockBreeds: Breed[] = [
  {
    id: "1",
    name: "Gir",
    species: "Cattle",
    origin: "Gujarat, Rajasthan",
    description: "One of the most important zebu breeds of India, known for its distinctive curved horns and excellent milk production.",
    characteristics: ["Distinctive hump", "Drooping ears", "Heat resistant", "Good mothering ability"],
    milkYield: "10-12 liters/day",
    purpose: "Dual purpose (Milk & Draft)",
    adaptability: "High heat tolerance",
    imageUrl: "/placeholder-cattle.jpg",
    popularity: 95
  },
  {
    id: "2", 
    name: "Murrah",
    species: "Buffalo",
    origin: "Haryana, Punjab",
    description: "World's best dairy buffalo breed with highest milk production and excellent quality.",
    characteristics: ["Black coat", "Curved horns", "High milk fat", "Hardy constitution"],
    milkYield: "12-18 liters/day",
    purpose: "Dairy",
    adaptability: "Good adaptation to various climates",
    imageUrl: "/placeholder-buffalo.jpg",
    popularity: 98
  },
  {
    id: "3",
    name: "Red Sindhi",
    species: "Cattle", 
    origin: "Sindh, Punjab",
    description: "Medium-sized dual-purpose breed known for good milk production and heat tolerance.",
    characteristics: ["Red coat color", "Medium sized", "Heat tolerant", "Good fertility"],
    milkYield: "8-10 liters/day",
    purpose: "Dual purpose",
    adaptability: "Excellent heat tolerance",
    imageUrl: "/placeholder-cattle.jpg",
    popularity: 87
  },
  {
    id: "4",
    name: "Sahiwal",
    species: "Cattle",
    origin: "Punjab, Haryana",
    description: "Famous for high milk yield and excellent heat tolerance, one of the best dairy breeds.",
    characteristics: ["Reddish brown", "Good milker", "Docile temperament", "Disease resistant"],
    milkYield: "12-15 liters/day", 
    purpose: "Dairy",
    adaptability: "Very good heat tolerance",
    imageUrl: "/placeholder-cattle.jpg",
    popularity: 92
  },
  {
    id: "5",
    name: "Nili-Ravi",
    species: "Buffalo",
    origin: "Punjab (India & Pakistan)",
    description: "High milk yielding buffalo breed with excellent genetic potential.",
    characteristics: ["Wall eyes", "Long face", "High milk yield", "Good fertility"],
    milkYield: "14-16 liters/day",
    purpose: "Dairy",
    adaptability: "Good adaptation",
    imageUrl: "/placeholder-buffalo.jpg",
    popularity: 89
  },
  {
    id: "6",
    name: "Tharparkar",
    species: "Cattle",
    origin: "Rajasthan, Gujarat",
    description: "Dual-purpose breed well adapted to arid conditions with good milk production.",
    characteristics: ["White/grey color", "Drought resistant", "Hardy", "Good milk quality"],
    milkYield: "8-12 liters/day",
    purpose: "Dual purpose",
    adaptability: "Excellent drought tolerance",
    imageUrl: "/placeholder-cattle.jpg", 
    popularity: 78
  }
  
];

export const BreedDatabase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<string>("all");
  const [selectedPurpose, setSelectedPurpose] = useState<string>("all");
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);

  const filteredBreeds = mockBreeds.filter(breed => {
    const matchesSearch = breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         breed.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecies = selectedSpecies === "all" || breed.species === selectedSpecies;
    const matchesPurpose = selectedPurpose === "all" || breed.purpose.toLowerCase().includes(selectedPurpose.toLowerCase());
    
    return matchesSearch && matchesSpecies && matchesPurpose;
  });

  const cattleBreeds = filteredBreeds.filter(breed => breed.species === "Cattle");
  const buffaloBreeds = filteredBreeds.filter(breed => breed.species === "Buffalo");

  const BreedCard = ({ breed }: { breed: Breed }) => (
    <Card 
      className="cursor-pointer hover:scale-[1.02] transition-transform card-shadow"
      onClick={() => setSelectedBreed(breed)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg">{breed.name}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {breed.origin}
            </p>
          </div>
          <div className="text-right">
            <Badge className={breed.species === "Cattle" ? "bg-primary" : "bg-secondary"}>
              {breed.species}
            </Badge>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 text-warning fill-warning" />
              <span className="text-xs">{breed.popularity}%</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {breed.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Milk className="h-4 w-4 text-secondary" />
            <span className="text-muted-foreground">Milk Yield:</span>
            <span className="font-medium">{breed.milkYield}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">Purpose:</span>
            <span className="font-medium">{breed.purpose}</span>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {breed.characteristics.slice(0, 2).map((char, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {char}
              </Badge>
            ))}
            {breed.characteristics.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{breed.characteristics.length - 2} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Breed Database</h1>
          <p className="text-muted-foreground">Explore cattle and buffalo breeds across India</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{filteredBreeds.length} breeds found</Badge>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="card-shadow">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search breeds by name or region..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Species</SelectItem>
                  <SelectItem value="Cattle">Cattle</SelectItem>
                  <SelectItem value="Buffalo">Buffalo</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPurpose} onValueChange={setSelectedPurpose}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Purpose</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="dual">Dual Purpose</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breed Listings */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Breeds ({filteredBreeds.length})</TabsTrigger>
          <TabsTrigger value="cattle">Cattle ({cattleBreeds.length})</TabsTrigger>
          <TabsTrigger value="buffalo">Buffalo ({buffaloBreeds.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBreeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cattle" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cattleBreeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="buffalo" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buffaloBreeds.map((breed) => (
              <BreedCard key={breed.id} breed={breed} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredBreeds.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No breeds found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters
            </p>
          </CardContent>
        </Card>
      )}

      {/* Breed Detail Modal/Sheet would go here */}
      {selectedBreed && (
        <Card className="fixed inset-4 z-50 bg-card/95 backdrop-blur-sm border-2 overflow-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {selectedBreed.name}
                <Badge className={selectedBreed.species === "Cattle" ? "bg-primary" : "bg-secondary"}>
                  {selectedBreed.species}
                </Badge>
              </CardTitle>
              <p className="text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {selectedBreed.origin}
              </p>
            </div>
            <Button 
              onClick={() => setSelectedBreed(null)}
              variant="outline"
              size="sm"
            >
              Close
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">{selectedBreed.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Milk className="h-4 w-4" />
                    Production Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Milk Yield:</span>
                      <span className="font-medium">{selectedBreed.milkYield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Purpose:</span>
                      <span className="font-medium">{selectedBreed.purpose}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Popularity:</span>
                      <span className="font-medium">{selectedBreed.popularity}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Adaptability
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedBreed.adaptability}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Key Characteristics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBreed.characteristics.map((char, index) => (
                    <Badge key={index} variant="secondary">
                      {char}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};