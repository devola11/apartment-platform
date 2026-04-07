// src/lib/neighborhoodData.js
// Realistic neighborhood data keyed by city.
// Walk scores are higher for dense/downtown cities, lower for suburban areas.

const CITY_DATA = {
  "Los Angeles": {
    walkScore: 72, walkLabel: "Very Walkable",
    schools: ["UCLA Lab School", "LAUSD Magnet Academy", "Westside Preparatory"],
    transit: ["Metro B Line (0.3 mi)", "Rapid 720 Bus (0.1 mi)"],
    dining: ["Farm-to-Table Cafés", "Korean BBQ", "Taco Trucks"],
  },
  "San Francisco": {
    walkScore: 89, walkLabel: "Walker's Paradise",
    schools: ["Lowell High School", "SF Day School", "Chinese Immersion School"],
    transit: ["BART Station (0.2 mi)", "Muni F Line (0.1 mi)"],
    dining: ["Dim Sum Houses", "Sourdough Bakeries", "Seafood on the Wharf"],
  },
  "San Diego": {
    walkScore: 68, walkLabel: "Somewhat Walkable",
    schools: ["San Diego High", "The Bishop's School", "Del Mar Heights Elementary"],
    transit: ["Trolley Blue Line (0.4 mi)", "MTS Route 7 (0.2 mi)"],
    dining: ["Fish Taco Spots", "Craft Brewpubs", "Beachside Grills"],
  },
  "Sacramento": {
    walkScore: 65, walkLabel: "Somewhat Walkable",
    schools: ["C.K. McClatchy High", "Sacramento Waldorf", "Capital Christian Academy"],
    transit: ["SacRT Blue Line (0.3 mi)", "Yolobus Route 42 (0.2 mi)"],
    dining: ["Farm-to-Fork Bistros", "Vietnamese Pho", "Midtown Coffee Roasters"],
  },
  "Oakland": {
    walkScore: 78, walkLabel: "Very Walkable",
    schools: ["Oakland Tech High", "Head-Royce School", "Redwood Day School"],
    transit: ["BART 12th St Station (0.2 mi)", "AC Transit 51A (0.1 mi)"],
    dining: ["Ethiopian Restaurants", "BBQ Joints", "Third-Wave Coffee"],
  },
  "Fresno": {
    walkScore: 60, walkLabel: "Somewhat Walkable",
    schools: ["Fresno High School", "San Joaquin Memorial", "Clovis Unified"],
    transit: ["FAX Route 9 (0.3 mi)", "BRT Route 1 (0.5 mi)"],
    dining: ["Mexican Taquerias", "Armenian Bakeries", "Central Valley Grills"],
  },
  "Irvine": {
    walkScore: 62, walkLabel: "Somewhat Walkable",
    schools: ["University High", "Irvine Montessori", "Turtle Rock Elementary"],
    transit: ["OCTA Route 79 (0.2 mi)", "Metrolink Irvine Station (1.2 mi)"],
    dining: ["Asian Fusion", "Mediterranean Grills", "Spectrum Mall Dining"],
  },
  "Santa Monica": {
    walkScore: 86, walkLabel: "Very Walkable",
    schools: ["Santa Monica High", "Crossroads School", "Franklin Elementary"],
    transit: ["Metro E Line (0.3 mi)", "Big Blue Bus 1 (0.1 mi)"],
    dining: ["Oceanfront Seafood", "Third Street Promenade Cafés", "Organic Juice Bars"],
  },
  "Long Beach": {
    walkScore: 70, walkLabel: "Very Walkable",
    schools: ["Poly High School", "Long Beach Prep", "Lowell Elementary"],
    transit: ["Metro A Line (0.3 mi)", "LBT Route 1 (0.1 mi)"],
    dining: ["Cambodian Cuisine", "Waterfront Grills", "Retro Diners"],
  },
  "Pasadena": {
    walkScore: 73, walkLabel: "Very Walkable",
    schools: ["John Muir High", "Polytechnic School", "Westridge School"],
    transit: ["Metro L Line (0.2 mi)", "Pasadena Transit 10 (0.1 mi)"],
    dining: ["Old Town Bistros", "Craft Cocktail Bars", "Rose Bowl Area Cafés"],
  },
  "Anaheim": {
    walkScore: 63, walkLabel: "Somewhat Walkable",
    schools: ["Anaheim High School", "Servite High", "Palm Lane Elementary"],
    transit: ["OCTA Route 50 (0.2 mi)", "Metrolink Anaheim (0.8 mi)"],
    dining: ["Packing District Food Hall", "Mexican Restaurants", "Theme Park Dining"],
  },
  "Beverly Hills": {
    walkScore: 80, walkLabel: "Very Walkable",
    schools: ["Beverly Hills High", "Good Shepherd School", "Hawthorne Elementary"],
    transit: ["Metro D Line (0.3 mi)", "Beverly Hills Trolley (0.1 mi)"],
    dining: ["Rodeo Drive Cafés", "Celebrity Chef Restaurants", "Deli & Bakeries"],
  },
  "Miami": {
    walkScore: 76, walkLabel: "Very Walkable",
    schools: ["Miami Senior High", "Ransom Everglades", "Coral Way K-8"],
    transit: ["Metrorail Green Line (0.3 mi)", "Metrobus 8 (0.1 mi)"],
    dining: ["Cuban Cafés", "Ceviche Bars", "Art District Bistros"],
  },
  "Orlando": {
    walkScore: 64, walkLabel: "Somewhat Walkable",
    schools: ["Boone High School", "Lake Highland Prep", "College Park Middle"],
    transit: ["SunRail (0.5 mi)", "Lynx Route 21 (0.2 mi)"],
    dining: ["Mills 50 Vietnamese", "Church Street Gastropubs", "BBQ Smokehouse"],
  },
  "Tampa": {
    walkScore: 66, walkLabel: "Somewhat Walkable",
    schools: ["Plant High School", "Berkeley Preparatory", "Mitchell Elementary"],
    transit: ["TECO Streetcar (0.3 mi)", "HART Route 5 (0.1 mi)"],
    dining: ["Ybor City Cuban", "SoHo Brunch Spots", "Channelside Seafood"],
  },
  "Jacksonville": {
    walkScore: 61, walkLabel: "Somewhat Walkable",
    schools: ["Stanton College Prep", "Bolles School", "San Jose Episcopal Day"],
    transit: ["JTA Skyway (0.4 mi)", "JTA Route 3 (0.2 mi)"],
    dining: ["Southern BBQ", "Riverside Brunch", "Beaches Seafood Shacks"],
  },
  "Fort Lauderdale": {
    walkScore: 69, walkLabel: "Somewhat Walkable",
    schools: ["Fort Lauderdale High", "Pine Crest School", "Bayview Elementary"],
    transit: ["Brightline (0.3 mi)", "Broward Transit 1 (0.1 mi)"],
    dining: ["Las Olas Cafés", "Beachside Grills", "Caribbean Fusion"],
  },
  "St. Petersburg": {
    walkScore: 67, walkLabel: "Somewhat Walkable",
    schools: ["St. Petersburg High", "Canterbury School", "Shorecrest Prep"],
    transit: ["SunRunner BRT (0.2 mi)", "PSTA Route 4 (0.1 mi)"],
    dining: ["Grand Central District Cafés", "Waterfront Oyster Bars", "EDGE District Gastropubs"],
  },
  "Boca Raton": {
    walkScore: 63, walkLabel: "Somewhat Walkable",
    schools: ["Boca Raton High", "Saint Andrew's School", "Addison Mizner Elementary"],
    transit: ["Tri-Rail Boca (0.8 mi)", "Palm Tran Route 1 (0.3 mi)"],
    dining: ["Mizner Park Dining", "Atlantic Ave Cafés", "Japanese Izakayas"],
  },
  "Clearwater": {
    walkScore: 62, walkLabel: "Somewhat Walkable",
    schools: ["Clearwater High", "Calvary Christian", "Belleair Elementary"],
    transit: ["PSTA Route 52 (0.2 mi)", "Jolley Trolley (0.4 mi)"],
    dining: ["Clearwater Beach Grills", "Greek Restaurants", "Craft Pizza"],
  },
  "Gainesville": {
    walkScore: 71, walkLabel: "Very Walkable",
    schools: ["Gainesville High", "Oak Hall School", "Westwood Middle"],
    transit: ["RTS Route 5 (0.1 mi)", "UF Campus Shuttle (0.3 mi)"],
    dining: ["College Town Burgers", "Midtown Sushi", "University Ave Cafés"],
  },
  "Sarasota": {
    walkScore: 64, walkLabel: "Somewhat Walkable",
    schools: ["Sarasota High", "Out-of-Door Academy", "Riverview High"],
    transit: ["SCAT Route 17 (0.3 mi)", "Siesta Key Breeze (0.5 mi)"],
    dining: ["St. Armands Circle Dining", "Waterfront Seafood", "Gulf Gate Tacos"],
  },
};

// Deterministic fallback for any unlisted city
const DEFAULT = {
  walkScore: 65, walkLabel: "Somewhat Walkable",
  schools: ["Neighborhood Elementary", "City High School", "Regional Academy"],
  transit: ["Bus Stop (0.3 mi)", "Transit Center (0.8 mi)"],
  dining: ["Local Cafés", "Pizza & Pasta", "Fast Casual Grills"],
};

export function getNeighborhoodData(city) {
  return CITY_DATA[city] || DEFAULT;
}

export function getWalkScoreColor(score) {
  if (score >= 70) return { bg: "#E8F5E9", ring: "#4CAF50", text: "#2E7D32" };
  if (score >= 50) return { bg: "#FFF8E1", ring: "#FFC107", text: "#F57F17" };
  return { bg: "#FFEBEE", ring: "#F44336", text: "#C62828" };
}
