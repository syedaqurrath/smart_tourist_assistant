export interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  description: string;
  historicalSignificance: string;
  architecturalFeatures: string[];
  visitorTips: string[];
  nextDirections: string;
  walkingTime: string;
  walkingDistance: string;
  bestPhotoSpot: string;
  imageUrl: string;
  voiceInstruction: string;
}

export const LOCATIONS: Record<string, Location> = {
  west_gate: {
    id: "west_gate",
    name: "West Gate (Entry Point)",
    coordinates: [27.1738, 78.0405],
    description: "Your journey begins at the West Gate, one of the three main entrances to the Taj Mahal complex. This red sandstone gateway was constructed in the 1630s as part of Shah Jahan's grand vision. The gate features intricate Islamic calligraphy and geometric patterns that set the tone for the architectural marvels ahead.",
    historicalSignificance: "The West Gate served as a principal entrance for dignitaries and royal visitors during the Mughal era. Its design reflects the transition from defensive architecture to ornamental gateways, symbolizing the shift from military to cultural dominance of the Mughal Empire. The gate's inscriptions include verses from the Quran, welcoming visitors to this earthly paradise.",
    architecturalFeatures: [
      "Constructed from locally quarried red sandstone",
      "Features 22 small domes representing the 22 years of construction",
      "Octagonal towers on each corner reaching 30 feet in height",
      "Decorated with floral motifs and Arabic calligraphy",
      "Original wooden doors with brass fittings still intact"
    ],
    visitorTips: [
      "Arrive early morning (6-7 AM) to avoid crowds",
      "Security check required - avoid bringing large bags",
      "Photography is permitted at this location",
      "Ticket counters are located adjacent to this gate"
    ],
    nextDirections: "Walk straight ahead through the entrance corridor. The Main Gateway will be visible approximately 150 meters ahead.",
    walkingTime: "2-3 minutes",
    walkingDistance: "150 meters",
    bestPhotoSpot: "Frame the entrance arch with the pathway leading inward",
    imageUrl: "https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=800",
    voiceInstruction: "Welcome to the West Gate, your starting point for this magnificent journey. Notice the red sandstone construction and intricate Islamic calligraphy. This gate features 22 small domes, representing the 22 years it took to build the Taj Mahal. Take a moment to admire the octagonal towers at each corner before proceeding forward."
  },
  main_gateway: {
    id: "main_gateway",
    name: "Main Gateway (Darwaza-i-rauza)",
    coordinates: [27.1744, 78.0418],
    description: "The magnificent Main Gateway, known as Darwaza-i-rauza, stands 30 meters tall and serves as the ceremonial entrance to the inner complex. Built entirely of red sandstone with white marble inlays, this monumental structure was completed in 1648. The gateway frames your first breathtaking view of the Taj Mahal's white marble dome.",
    historicalSignificance: "The Main Gateway represents the threshold between the earthly realm and the paradise garden beyond. Shah Jahan commissioned this structure to create anticipation and wonder, with its central arch precisely framing the Taj Mahal when viewed from the entrance. The inscriptions above the archways are verses from the Quran inviting the faithful to enter paradise.",
    architecturalFeatures: [
      "Central iwan (vaulted hall) stands 30 meters high",
      "Decorated with intricate pietra dura (stone inlay work)",
      "Features 11 white marble chhatris (domed pavilions) on the roof",
      "Quranic verses inlaid in black marble using Thuluth script",
      "Four octagonal towers at corners, each topped with a chhatri",
      "Interior ceiling decorated with geometric patterns and floral designs"
    ],
    visitorTips: [
      "This is the most iconic first-view spot for photography",
      "Morning light provides the best illumination of the Taj Mahal through the arch",
      "Take time to examine the detailed inlay work up close",
      "Notice how the gateway perfectly frames the mausoleum"
    ],
    nextDirections: "Pass through the central archway and descend the steps into the Charbagh Gardens. Follow the central marble pathway straight ahead.",
    walkingTime: "3-4 minutes",
    walkingDistance: "250 meters",
    bestPhotoSpot: "Stand centered under the main arch for the classic framed view of the Taj Mahal",
    imageUrl: "https://images.pexels.com/photos/2413613/pexels-photo-2413613.jpeg?auto=compress&cs=tinysrgb&w=800",
    voiceInstruction: "You've reached the Main Gateway, standing 30 meters tall. Look up to see the eleven white marble domes on the roof. Position yourself in the center of the archway for the iconic first view of the Taj Mahal. Notice how the gateway perfectly frames the mausoleum, creating one of the world's most photographed perspectives."
  },
  charbagh_gardens: {
    id: "charbagh_gardens",
    name: "Charbagh Gardens",
    coordinates: [27.1748, 78.0418],
    description: "The Charbagh Gardens exemplify the Persian concept of paradise on earth, divided into four quadrants by water channels representing the four rivers of paradise mentioned in the Quran. Originally planted with fruit trees, roses, and narcissus, the 300-meter long garden was designed to symbolize abundance and the beauty of creation.",
    historicalSignificance: "The term 'Charbagh' literally means 'four gardens' in Persian, a design principle that the Mughals brought from Central Asia. This layout represents the Islamic concept of paradise described in the Quran, with four rivers flowing through eternal gardens. Emperor Babur, founder of the Mughal dynasty, first introduced this garden style to India in the early 16th century.",
    architecturalFeatures: [
      "Covers approximately 300 square meters",
      "Divided into 16 sunken parterres (flower beds)",
      "Central water channel with fountains (originally 100 fountains)",
      "Raised pathways made of red sandstone",
      "Four main water channels intersecting at a raised lotus pool",
      "Originally featured cypress trees symbolizing death and fruit trees symbolizing life"
    ],
    visitorTips: [
      "Walk along the side pathways for varied photo perspectives",
      "The fountains operate during specific hours - check schedule",
      "Early morning provides the best light for garden photography",
      "Benches along the pathways offer rest spots with excellent views"
    ],
    nextDirections: "Continue along the central marble pathway toward the Reflecting Pool, which lies approximately 100 meters ahead at the garden's center.",
    walkingTime: "2 minutes",
    walkingDistance: "100 meters",
    bestPhotoSpot: "From the raised pathways on either side for symmetrical garden views",
    imageUrl: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800",
    voiceInstruction: "Welcome to the Charbagh Gardens, representing paradise on earth. This Persian-style garden is divided into four quadrants by water channels, symbolizing the four rivers of paradise. Originally, these gardens featured fruit trees and roses. Walk along the raised pathways for the best views of the symmetrical layout."
  },
  reflecting_pool: {
    id: "reflecting_pool",
    name: "Reflecting Pool",
    coordinates: [27.1751, 78.0421],
    description: "The Reflecting Pool (Hauz-al-Kawthar) serves as the focal point of the Charbagh Gardens, creating a perfect mirror image of the Taj Mahal on calm days. This 60-meter long pool was designed to reflect the sky and the mausoleum, doubling the visual impact of the monument.",
    historicalSignificance: "Named after the celestial pool of abundance described in Islamic texts, this reflecting pool serves both aesthetic and symbolic purposes. In Mughal architecture, water represented life, purity, and the reflection of divine beauty. During Shah Jahan's time, the pool was adorned with floating lotus flowers and rose petals during special ceremonies.",
    architecturalFeatures: [
      "Measures 60 meters in length and 7 meters in width",
      "Depth of approximately 1.5 meters",
      "Constructed with red sandstone lining",
      "Fed by underground water channels from the Yamuna River",
      "Originally had a raised marble platform at its center",
      "Perfectly aligned with the central axis of the Taj Mahal"
    ],
    visitorTips: [
      "Best viewed early morning or late afternoon for clearest reflections",
      "Avoid windy days if you want perfect mirror reflections",
      "This is one of the most photographed spots - arrive early",
      "The reflection is most dramatic during sunrise and sunset"
    ],
    nextDirections: "Continue straight along the central pathway, ascending the marble steps to reach the raised platform (plinth) of the Main Tomb, located 150 meters ahead.",
    walkingTime: "3-4 minutes",
    walkingDistance: "150 meters",
    bestPhotoSpot: "Low angle from the northern edge to capture the reflection with the Taj Mahal",
    imageUrl: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800",
    voiceInstruction: "You're now at the Reflecting Pool, the garden's centerpiece. On calm days, the water creates a perfect mirror image of the Taj Mahal. This 60-meter pool was designed to reflect both the monument and the sky, doubling its visual impact. Look for the best photography angle from the northern edge."
  },
  main_tomb: {
    id: "main_tomb",
    name: "Main Tomb (Rauza)",
    coordinates: [27.1751, 78.0421],
    description: "The heart of the Taj Mahal complex, the Main Tomb (Rauza) is a masterpiece of Mughal architecture that took 22 years to complete (1632-1654). Standing 73 meters tall, the white marble mausoleum houses the cenotaphs of Mumtaz Mahal and Shah Jahan. Over 20,000 artisans worked on this eternal monument to love.",
    historicalSignificance: "Emperor Shah Jahan commissioned this mausoleum following the death of his beloved wife, Mumtaz Mahal, who died in 1631 during childbirth of their 14th child. The name 'Taj Mahal' is believed to derive from her full name 'Mumtaz Mahal' meaning 'Crown of the Palace.' Construction required materials from across Asia: white marble from Rajasthan, jade from China, turquoise from Tibet, and sapphires from Sri Lanka.",
    architecturalFeatures: [
      "Central dome reaches 73 meters (240 feet) in height",
      "Constructed from translucent white Makrana marble",
      "Features 28 types of precious and semi-precious stones in pietra dura inlay work",
      "Four minarets, each 40 meters tall, positioned at corners",
      "Octagonal base structure measuring 95 meters on each side",
      "Interior ceiling decorated with sun motif symbolizing God",
      "Intricate jali (lattice) screens surrounding the cenotaphs",
      "Double dome construction: outer ornamental dome and inner acoustic dome"
    ],
    visitorTips: [
      "Remove shoes before entering the mausoleum",
      "Photography prohibited inside the tomb chamber",
      "Speak softly inside - the acoustics amplify sound",
      "The marble changes color throughout the day",
      "Actual graves are in a crypt below",
      "Examine the pietra dura work closely"
    ],
    nextDirections: "Exit the tomb and walk to your left (west) side. The Red Sandstone Mosque is located approximately 80 meters away on the western side of the platform.",
    walkingTime: "2 minutes",
    walkingDistance: "80 meters",
    bestPhotoSpot: "From the corners of the platform for dramatic angle shots",
    imageUrl: "https://images.pexels.com/photos/2413613/pexels-photo-2413613.jpeg?auto=compress&cs=tinysrgb&w=800",
    voiceInstruction: "Behold the Main Tomb, the heart of the Taj Mahal. This masterpiece took 22 years and over 20,000 artisans to complete. The white Makrana marble changes color throughout the day - pink at dawn, white at noon, and golden at sunset. Notice the 28 types of precious stones inlaid in intricate patterns. The central dome reaches 73 meters high. Remember to remove your shoes before entering."
  },
  mosque: {
    id: "mosque",
    name: "Red Sandstone Mosque",
    coordinates: [27.1749, 78.0415],
    description: "The Red Sandstone Mosque, located on the western side of the Taj Mahal complex, serves as a fully functional place of worship. Built in 1648, this three-domed mosque is constructed from red sandstone with marble accents. The mosque exemplifies traditional Mughal mosque architecture.",
    historicalSignificance: "In Islamic tradition, mosques are always oriented toward Mecca (facing west), which is why this mosque occupies the western position in the complex. Shah Jahan commissioned this mosque not only for religious purposes but also to sanctify the entire complex as a holy site. The mosque continues to serve worshippers today.",
    architecturalFeatures: [
      "Three marble domes with finials pointing toward the sky",
      "Constructed primarily from red sandstone with white marble detailing",
      "Prayer hall measures approximately 60 meters in length",
      "Features three arched entrances (iwans) on the eastern facade",
      "Interior has traditional mihrab (prayer niche) pointing toward Mecca",
      "Floor covered with 569 prayer mats outlined in black marble"
    ],
    visitorTips: [
      "Non-Muslims may view from the entrance but should respect prayer times",
      "Remove shoes before entering the mosque premises",
      "Dress modestly - shoulders and knees should be covered",
      "During prayer times, maintain silence nearby",
      "The mosque offers excellent views of the Taj Mahal from its courtyard"
    ],
    nextDirections: "Walk back across the platform, passing in front of the Main Tomb, to reach the Guest House (Mihman Khana) on the eastern side, approximately 160 meters away.",
    walkingTime: "3-4 minutes",
    walkingDistance: "160 meters",
    bestPhotoSpot: "From the mosque's courtyard for side views of the Taj Mahal",
    imageUrl: "https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800",
    voiceInstruction: "You're now at the Red Sandstone Mosque, positioned on the western side facing Mecca. Built in 1648, this functional mosque features three marble domes and traditional prayer halls. Notice the floor markings outlining 569 prayer spaces. The mosque is still used for worship today, so please maintain respectful silence and dress modestly."
  },
  guest_house: {
    id: "guest_house",
    name: "Guest House (Mihman Khana)",
    coordinates: [27.1749, 78.0427],
    description: "The Guest House (Mihman Khana) architecturally mirrors the mosque on the opposite side, maintaining the complex's perfect symmetry. Constructed from the same red sandstone with marble accents, this building served as a gathering place for pilgrims and visitors.",
    historicalSignificance: "The Guest House exemplifies the Mughal principle of architectural balance and symmetry. Built simultaneously with the mosque between 1643-1648, it was designed to serve multiple purposes: accommodating pilgrims visiting Mumtaz Mahal's tomb, hosting visitors to the complex, and providing a resting place for travelers.",
    architecturalFeatures: [
      "Identical dimensions to the mosque: approximately 60 meters in length",
      "Three domes matching the mosque's design",
      "Constructed from red sandstone with white marble inlay work",
      "Three arched entrances mirroring the mosque's facade",
      "Interior features decorative niches and chambers",
      "Original purpose was for assembly rather than prayer"
    ],
    visitorTips: [
      "Provides excellent photographic angles of the Taj Mahal",
      "Less crowded than the mosque, offering peaceful viewing",
      "Interior is usually open for exploration",
      "Compare the symmetry between this building and the mosque",
      "Late afternoon light beautifully illuminates the red sandstone"
    ],
    nextDirections: "Walk down the steps from the main platform and follow the eastern pathway through the gardens toward the East Gate, located approximately 350 meters ahead.",
    walkingTime: "5-6 minutes",
    walkingDistance: "350 meters",
    bestPhotoSpot: "From the Guest House courtyard for eastern perspective views",
    imageUrl: "https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=800",
    voiceInstruction: "Welcome to the Guest House, or Mihman Khana. This building mirrors the mosque on the opposite side, maintaining perfect architectural symmetry. Built simultaneously with the mosque, it served as a gathering place for pilgrims visiting Mumtaz Mahal's tomb. The red sandstone construction matches the other auxiliary buildings in the complex."
  },
  east_gate: {
    id: "east_gate",
    name: "East Gate (Exit Point)",
    coordinates: [27.1756, 78.0433],
    description: "The East Gate serves as the primary exit for the Taj Mahal complex, though it can also be used as an entrance. This red sandstone gateway, similar in style to the West Gate, provides a contemplative conclusion to your visit.",
    historicalSignificance: "The East Gate was primarily used by the royal family and special dignitaries arriving by boat via the Yamuna River. During the Mughal era, the river served as a major transportation route, and elaborate boat processions would arrive at this gate.",
    architecturalFeatures: [
      "Constructed from red sandstone matching other gates",
      "Features ornamental domes and chhatris",
      "Inscriptions include verses welcoming departed souls to paradise",
      "Octagonal towers at corners",
      "Originally had wooden doors with brass decorations"
    ],
    visitorTips: [
      "Shops and facilities available outside this gate",
      "Provides access to restrooms and refreshments",
      "Look back for a final view of the Taj Mahal before exiting",
      "Auto-rickshaws and transportation readily available"
    ],
    nextDirections: "Your tour is complete. Thank you for visiting!",
    walkingTime: "N/A",
    walkingDistance: "N/A",
    bestPhotoSpot: "Final farewell shot looking back at the Taj Mahal",
    imageUrl: "https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=800",
    voiceInstruction: "You've reached the East Gate, concluding your virtual tour of the Taj Mahal. This gate was primarily used by royal families arriving by boat via the Yamuna River. Before you leave, take one last look back at this magnificent monument to eternal love. Thank you for joining us on this journey through history."
  }
};

export interface TourMode {
  id: string;
  name: string;
  duration: string;
  locations: string[];
  description: string;
}

export const TOUR_MODES: Record<string, TourMode> = {
  complete: {
    id: "complete",
    name: "Complete Tour",
    duration: "60 minutes",
    locations: ["west_gate", "main_gateway", "charbagh_gardens", "reflecting_pool", "main_tomb", "mosque", "guest_house", "east_gate"],
    description: "Experience all 8 locations with comprehensive historical information and architectural details."
  },
  express: {
    id: "express",
    name: "Express Tour",
    duration: "25 minutes",
    locations: ["west_gate", "main_gateway", "main_tomb", "east_gate"],
    description: "Visit the 4 essential locations focusing on the main highlights."
  },
  photography: {
    id: "photography",
    name: "Photography Tour",
    duration: "40 minutes",
    locations: ["west_gate", "main_gateway", "reflecting_pool", "main_tomb", "east_gate"],
    description: "Focus on the 5 best photo spots with camera tips and composition guidance."
  }
};
