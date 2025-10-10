export const CHATBOT_RESPONSES: Record<string, string> = {
  "who built": "The Taj Mahal was commissioned by Mughal Emperor Shah Jahan in 1632, in memory of his beloved wife Mumtaz Mahal, who died during childbirth in 1631. The monument took 22 years to complete (1632-1654) and required over 20,000 artisans, including master craftsmen from Persia, the Ottoman Empire, and Europe. The chief architect is believed to be Ustad Ahmad Lahauri.",

  "when built": "Construction of the Taj Mahal began in 1632 and was completed in 1654, taking 22 years in total. The main mausoleum was finished by 1648, but the surrounding complex, including the mosque, guest house, and outer courtyard, required an additional 6 years. The project cost approximately 32 million rupees at the time (equivalent to over $1 billion today).",

  "best photo": "The best photo spots:\n\n1. Main Gateway arch - Classic framed view (early morning light)\n2. Reflecting Pool - Mirror reflections (sunrise/sunset)\n3. Platform corners - Dramatic angles with minarets\n4. Diana Bench (near reflecting pool) - Princess Diana's iconic spot\n5. Mosque courtyard - Side profile views\n\nPhotography Tips:\n- Arrive at sunrise (6-7 AM) for golden light\n- Sunset (5-6 PM) provides warm tones\n- The marble changes color throughout the day",

  "how long": "A thorough visit typically takes 2-3 hours:\n\n- Express visit: 1-1.5 hours (main highlights only)\n- Standard visit: 2-3 hours (most locations)\n- Comprehensive visit: 3-4 hours (all areas)\n- Photography focused: 2-4 hours\n\nPlan extra time for security checks (15-30 minutes) and ticket queues (15-45 minutes).",

  "what bring": "Essential Items:\n- Valid ID and tickets\n- Camera or smartphone\n- Water bottle (small, sealed)\n- Sunscreen and hat\n- Comfortable walking shoes\n- Modest clothing (shoulders and knees covered)\n\nItems NOT Allowed:\n- Large bags, backpacks\n- Food items\n- Tobacco products\n- Tripods (require special permission)\n- Drones",

  "best time": "Best Times to Visit:\n\nBy Season:\n- October-March: Ideal weather (pleasant and cool)\n- April-June: Very hot (avoid if possible)\n- July-September: Monsoon season (fewer crowds)\n\nBy Time of Day:\n- Sunrise (6:00-8:00 AM): Best light, fewer crowds\n- Late Afternoon (4:00-6:00 PM): Golden hour light\n- Full Moon Nights: Special viewings (advance booking required)\n\nAvoid Fridays (mosque closed) and weekends (very crowded).",

  "ticket": "Ticket Information:\n\nPrices:\n- Foreign tourists: ₹1,100\n- Indian citizens: ₹50\n- Children under 15: Free\n\nBooking:\n- Online booking recommended: www.tajmahal.gov.in\n- Tickets available at gate (longer queues)\n- Valid for 3 hours from entry time\n\nEntry Gates:\n- West Gate (most popular)\n- East Gate (less crowded)\n- South Gate (for tourists from Agra Fort)\n\nClosed on Fridays. Open sunrise to sunset (6 AM - 7 PM).",

  "history": "The Taj Mahal's story begins with great love and profound loss. In 1631, Mumtaz Mahal, the beloved wife of Emperor Shah Jahan, died during the birth of their 14th child. Devastated, Shah Jahan commissioned the world's most beautiful mausoleum in her memory.\n\nConstruction began in 1632, requiring 22 years, 20,000+ artisans, and 1,000 elephants to transport materials from across Asia.\n\nIn 1983, UNESCO designated it a World Heritage Site. Today, it attracts 7-8 million visitors annually.",

  "architecture": "The Taj Mahal represents the pinnacle of Mughal architecture, blending Persian, Islamic, and Indian styles.\n\nKey Features:\n- Perfect symmetry (bilateral except for Shah Jahan's tomb)\n- Golden ratio proportions\n- White Makrana marble with 28 types of precious stones\n- Pietra dura (intricate stone inlay work)\n- Quranic calligraphy in Thuluth script\n- Four 40-meter minarets (tilted outward for earthquake protection)\n- 73-meter central dome (double-layered for acoustics)\n- Charbagh garden (Persian paradise garden)\n\nThe marble changes color with sunlight: pink at dawn, white at noon, golden at sunset.",

  "default": "I can help you explore the Taj Mahal! Ask me about:\n\n- History and construction\n- Photography tips\n- Visit planning\n- Tickets and timings\n- Architecture and design\n\nWhat would you like to know?"
};

export function getChatbotResponse(userInput: string): string {
  const input = userInput.toLowerCase();

  for (const [keyword, response] of Object.entries(CHATBOT_RESPONSES)) {
    if (keyword !== "default" && input.includes(keyword)) {
      return response;
    }
  }

  return CHATBOT_RESPONSES.default;
}
