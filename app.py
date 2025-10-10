"""
Taj Mahal Virtual Tourist Guide
A comprehensive Streamlit application for exploring the Taj Mahal
"""

import streamlit as st
import folium
from streamlit_folium import folium_static
from datetime import datetime

# Page configuration
st.set_page_config(
    page_title="Taj Mahal Virtual Tourist Guide",
    page_icon="🕌",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
    <style>
    .main-header {
        font-size: 2.5rem;
        color: #8B4513;
        text-align: center;
        padding: 1rem 0;
        border-bottom: 3px solid #DAA520;
        margin-bottom: 1rem;
    }
    .location-title {
        font-size: 2rem;
        color: #8B4513;
        margin-bottom: 1rem;
    }
    .progress-indicator {
        background-color: #f0f2f6;
        padding: 1rem;
        border-radius: 0.5rem;
        text-align: center;
        margin-bottom: 1rem;
        font-size: 1.2rem;
        color: #8B4513;
    }
    .info-section {
        background-color: #FFF8DC;
        padding: 1.5rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        border-left: 4px solid #DAA520;
    }
    .navigation-section {
        background-color: #E6F3FF;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        border-left: 4px solid #4682B4;
    }
    .chatbot-message {
        padding: 0.8rem;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
    }
    .user-message {
        background-color: #E3F2FD;
        text-align: right;
    }
    .bot-message {
        background-color: #F5F5F5;
    }
    .stButton>button {
        width: 100%;
        background-color: #8B4513;
        color: white;
        font-weight: bold;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
    }
    .stButton>button:hover {
        background-color: #A0522D;
    }
    </style>
""", unsafe_allow_html=True)

# Location data structure
LOCATIONS = {
    "west_gate": {
        "name": "West Gate (Entry Point)",
        "coordinates": [27.1738, 78.0405],
        "description": "Your journey begins at the West Gate, one of the three main entrances to the Taj Mahal complex. This red sandstone gateway was constructed in the 1630s as part of Shah Jahan's grand vision. The gate features intricate Islamic calligraphy and geometric patterns that set the tone for the architectural marvels ahead.",
        "historical_significance": "The West Gate served as a principal entrance for dignitaries and royal visitors during the Mughal era. Its design reflects the transition from defensive architecture to ornamental gateways, symbolizing the shift from military to cultural dominance of the Mughal Empire. The gate's inscriptions include verses from the Quran, welcoming visitors to this earthly paradise.",
        "architectural_features": [
            "Constructed from locally quarried red sandstone",
            "Features 22 small domes representing the 22 years of construction",
            "Octagonal towers on each corner reaching 30 feet in height",
            "Decorated with floral motifs and Arabic calligraphy",
            "Original wooden doors with brass fittings still intact"
        ],
        "visitor_tips": [
            "Arrive early morning (6-7 AM) to avoid crowds",
            "Security check required - avoid bringing large bags",
            "Photography is permitted at this location",
            "Ticket counters are located adjacent to this gate"
        ],
        "next_directions": "Walk straight ahead through the entrance corridor. The Main Gateway will be visible approximately 150 meters ahead.",
        "walking_time": "2-3 minutes",
        "walking_distance": "150 meters",
        "best_photo_spot": "Frame the entrance arch with the pathway leading inward"
    },
    "main_gateway": {
        "name": "Main Gateway (Darwaza-i-rauza)",
        "coordinates": [27.1744, 78.0418],
        "description": "The magnificent Main Gateway, known as Darwaza-i-rauza, stands 30 meters tall and serves as the ceremonial entrance to the inner complex. Built entirely of red sandstone with white marble inlays, this monumental structure was completed in 1648. The gateway frames your first breathtaking view of the Taj Mahal's white marble dome.",
        "historical_significance": "The Main Gateway represents the threshold between the earthly realm and the paradise garden beyond. Shah Jahan commissioned this structure to create anticipation and wonder, with its central arch precisely framing the Taj Mahal when viewed from the entrance. The inscriptions above the archways are verses from the Quran inviting the faithful to enter paradise, drawing parallels between the garden complex and Islamic concepts of heaven.",
        "architectural_features": [
            "Central iwan (vaulted hall) stands 30 meters high",
            "Decorated with intricate pietra dura (stone inlay work)",
            "Features 11 white marble chhatris (domed pavilions) on the roof",
            "Quranic verses inlaid in black marble using Thuluth script",
            "Four octagonal towers at corners, each topped with a chhatri",
            "Interior ceiling decorated with geometric patterns and floral designs"
        ],
        "visitor_tips": [
            "This is the most iconic first-view spot for photography",
            "Morning light provides the best illumination of the Taj Mahal through the arch",
            "Take time to examine the detailed inlay work up close",
            "Notice how the gateway perfectly frames the mausoleum"
        ],
        "next_directions": "Pass through the central archway and descend the steps into the Charbagh Gardens. Follow the central marble pathway straight ahead.",
        "walking_time": "3-4 minutes",
        "walking_distance": "250 meters",
        "best_photo_spot": "Stand centered under the main arch for the classic framed view of the Taj Mahal"
    },
    "charbagh_gardens": {
        "name": "Charbagh Gardens",
        "coordinates": [27.1748, 78.0418],
        "description": "The Charbagh Gardens exemplify the Persian concept of paradise on earth, divided into four quadrants by water channels representing the four rivers of paradise mentioned in the Quran. Originally planted with fruit trees, roses, and narcissus, the 300-meter long garden was designed to symbolize abundance and the beauty of creation. The meticulous symmetry reflects Mughal ideals of harmony and order.",
        "historical_significance": "The term 'Charbagh' literally means 'four gardens' in Persian, a design principle that the Mughals brought from Central Asia. This layout represents the Islamic concept of paradise described in the Quran, with four rivers flowing through eternal gardens. Emperor Babur, founder of the Mughal dynasty, first introduced this garden style to India in the early 16th century, and Shah Jahan perfected it at the Taj Mahal. The gardens were maintained by over 40 gardeners during the Mughal period.",
        "architectural_features": [
            "Covers approximately 300 square meters",
            "Divided into 16 sunken parterres (flower beds)",
            "Central water channel with fountains (originally 100 fountains)",
            "Raised pathways made of red sandstone",
            "Four main water channels intersecting at a raised lotus pool",
            "Originally featured cypress trees symbolizing death and fruit trees symbolizing life",
            "Underground water system still functional after 370 years"
        ],
        "visitor_tips": [
            "Walk along the side pathways for varied photo perspectives",
            "The fountains operate during specific hours - check schedule",
            "Early morning provides the best light for garden photography",
            "Benches along the pathways offer rest spots with excellent views"
        ],
        "next_directions": "Continue along the central marble pathway toward the Reflecting Pool, which lies approximately 100 meters ahead at the garden's center.",
        "walking_time": "2 minutes",
        "walking_distance": "100 meters",
        "best_photo_spot": "From the raised pathways on either side for symmetrical garden views"
    },
    "reflecting_pool": {
        "name": "Reflecting Pool",
        "coordinates": [27.1751, 78.0421],
        "description": "The Reflecting Pool (Hauz-al-Kawthar) serves as the focal point of the Charbagh Gardens, creating a perfect mirror image of the Taj Mahal on calm days. This 60-meter long pool was designed to reflect the sky and the mausoleum, doubling the visual impact of the monument. The pool's name references the Tank of Abundance in Islamic paradise.",
        "historical_significance": "Named after the celestial pool of abundance described in Islamic texts, this reflecting pool serves both aesthetic and symbolic purposes. In Mughal architecture, water represented life, purity, and the reflection of divine beauty. The pool's reflection creates an illusion of the Taj Mahal floating between heaven and earth. During Shah Jahan's time, the pool was adorned with floating lotus flowers and rose petals during special ceremonies, and moonlight viewing parties were held here for the royal court.",
        "architectural_features": [
            "Measures 60 meters in length and 7 meters in width",
            "Depth of approximately 1.5 meters",
            "Constructed with red sandstone lining",
            "Fed by underground water channels from the Yamuna River",
            "Originally had a raised marble platform at its center",
            "Perfectly aligned with the central axis of the Taj Mahal",
            "Surrounded by sandstone pathways for viewing"
        ],
        "visitor_tips": [
            "Best viewed early morning or late afternoon for clearest reflections",
            "Avoid windy days if you want perfect mirror reflections",
            "This is one of the most photographed spots - arrive early",
            "The reflection is most dramatic during sunrise and sunset",
            "Moonlight viewings (check schedule) offer ethereal reflections"
        ],
        "next_directions": "Continue straight along the central pathway, ascending the marble steps to reach the raised platform (plinth) of the Main Tomb, located 150 meters ahead.",
        "walking_time": "3-4 minutes",
        "walking_distance": "150 meters",
        "best_photo_spot": "Low angle from the northern edge to capture the reflection with the Taj Mahal"
    },
    "main_tomb": {
        "name": "Main Tomb (Rauza)",
        "coordinates": [27.1751, 78.0421],
        "description": "The heart of the Taj Mahal complex, the Main Tomb (Rauza) is a masterpiece of Mughal architecture that took 22 years to complete (1632-1654). Standing 73 meters tall, the white marble mausoleum houses the cenotaphs of Mumtaz Mahal and Shah Jahan. Over 20,000 artisans, including calligraphers from Persia, sculptors from Bukhara, and inlay specialists from Delhi worked on this eternal monument to love.",
        "historical_significance": "Emperor Shah Jahan commissioned this mausoleum following the death of his beloved wife, Mumtaz Mahal, who died in 1631 during childbirth of their 14th child. The name 'Taj Mahal' is believed to derive from her full name 'Mumtaz Mahal' meaning 'Crown of the Palace.' Construction required materials from across Asia: white marble from Rajasthan, jade and crystal from China, turquoise from Tibet, lapis lazuli from Afghanistan, and sapphires from Sri Lanka. The tomb represents the pinnacle of Mughal architecture, combining elements from Persian, Islamic, and Indian architectural traditions. Shah Jahan himself was later interred here beside his wife after his death in 1666.",
        "architectural_features": [
            "Central dome reaches 73 meters (240 feet) in height and 17 meters in diameter",
            "Constructed from translucent white Makrana marble that changes color with sunlight",
            "Features 28 types of precious and semi-precious stones in pietra dura inlay work",
            "Four minarets, each 40 meters tall, positioned at corners (deliberately tilted outward for earthquake protection)",
            "Octagonal base structure measuring 95 meters on each side",
            "Interior ceiling decorated with sun motif symbolizing God",
            "Intricate jali (lattice) screens surrounding the cenotaphs",
            "Exterior verses from the Quran inscribed in black marble",
            "Double dome construction: outer ornamental dome and inner acoustic dome",
            "Symmetrical design with four iwans (arched entrances) on each facade"
        ],
        "visitor_tips": [
            "Remove shoes before entering the mausoleum (shoe covers provided)",
            "Photography prohibited inside the tomb chamber",
            "Speak softly inside - the acoustics amplify sound",
            "The marble changes color: pinkish in morning, milky white in afternoon, golden at sunset",
            "Actual graves are in a crypt below; the interior houses cenotaphs (decorative markers)",
            "Examine the pietra dura work closely - some flowers contain 64 individual stone pieces",
            "Circumambulate the tomb to see it from all angles"
        ],
        "next_directions": "Exit the tomb and walk to your left (west) side. The Red Sandstone Mosque is located approximately 80 meters away on the western side of the platform.",
        "walking_time": "2 minutes",
        "walking_distance": "80 meters",
        "best_photo_spot": "From the corners of the platform for dramatic angle shots, or from the steps for classic frontal views"
    },
    "mosque": {
        "name": "Red Sandstone Mosque",
        "coordinates": [27.1749, 78.0415],
        "description": "The Red Sandstone Mosque, located on the western side of the Taj Mahal complex, serves as a fully functional place of worship. Built in 1648, this three-domed mosque is constructed from red sandstone with marble accents. The mosque exemplifies traditional Mughal mosque architecture and provides architectural balance to the complex by mirroring the Guest House on the eastern side.",
        "historical_significance": "In Islamic tradition, mosques are always oriented toward Mecca (facing west), which is why this mosque occupies the western position in the complex. Shah Jahan commissioned this mosque not only for religious purposes but also to sanctify the entire complex as a holy site. The mosque continues to serve worshippers today, making the Taj Mahal more than just a monument - it remains a living religious space. During the Mughal era, prayers were conducted here five times daily, with special gatherings on Fridays. The mosque's placement also served to fulfill Islamic requirements for proper burial of the faithful within sight of a place of worship.",
        "architectural_features": [
            "Three marble domes with finials pointing toward the sky",
            "Constructed primarily from red sandstone with white marble detailing",
            "Prayer hall measures approximately 60 meters in length",
            "Features three arched entrances (iwans) on the eastern facade",
            "Interior has traditional mihrab (prayer niche) pointing toward Mecca",
            "Minbar (pulpit) for delivering sermons on Fridays",
            "Floor covered with 569 prayer mats outlined in black marble",
            "Walls decorated with Quranic inscriptions",
            "Two small minarets flanking the main structure"
        ],
        "visitor_tips": [
            "Non-Muslims may view from the entrance but should respect prayer times",
            "Remove shoes before entering the mosque premises",
            "Dress modestly - shoulders and knees should be covered",
            "During prayer times (check schedule), maintain silence nearby",
            "The mosque offers excellent views of the Taj Mahal from its courtyard",
            "Morning light beautifully illuminates the red sandstone"
        ],
        "next_directions": "Walk back across the platform, passing in front of the Main Tomb, to reach the Guest House (Mihman Khana) on the eastern side, approximately 160 meters away.",
        "walking_time": "3-4 minutes",
        "walking_distance": "160 meters",
        "best_photo_spot": "From the mosque's courtyard for side views of the Taj Mahal"
    },
    "guest_house": {
        "name": "Guest House (Mihman Khana)",
        "coordinates": [27.1749, 78.0427],
        "description": "The Guest House (Mihman Khana) architecturally mirrors the mosque on the opposite side, maintaining the complex's perfect symmetry. Constructed from the same red sandstone with marble accents, this building served as a gathering place for pilgrims and visitors. While identical in appearance to the mosque, it faces east and served secular rather than religious purposes.",
        "historical_significance": "The Guest House exemplifies the Mughal principle of architectural balance and symmetry. Built simultaneously with the mosque between 1643-1648, it was designed to serve multiple purposes: accommodating pilgrims visiting Mumtaz Mahal's tomb, hosting visitors to the complex, and providing a resting place for travelers. The building also served as a jawab (answer) to the mosque, creating perfect bilateral symmetry essential to Mughal architectural philosophy. During the Mughal period, the guest house hosted poetry readings, musical performances, and gatherings of scholars and artists, making it a center of cultural activity.",
        "architectural_features": [
            "Identical dimensions to the mosque: approximately 60 meters in length",
            "Three domes matching the mosque's design",
            "Constructed from red sandstone with white marble inlay work",
            "Three arched entrances mirroring the mosque's facade",
            "Interior features decorative niches and chambers",
            "Original purpose was for assembly rather than prayer",
            "No mihrab or Islamic prayer elements in the interior",
            "Ventilation system designed to keep interior cool"
        ],
        "visitor_tips": [
            "Provides excellent photographic angles of the Taj Mahal",
            "Less crowded than the mosque, offering peaceful viewing",
            "Interior is usually open for exploration",
            "Compare the symmetry between this building and the mosque",
            "Late afternoon light beautifully illuminates the red sandstone",
            "Good spot for resting with shade and seating areas"
        ],
        "next_directions": "Walk down the steps from the main platform and follow the eastern pathway through the gardens toward the East Gate, located approximately 350 meters ahead.",
        "walking_time": "5-6 minutes",
        "walking_distance": "350 meters",
        "best_photo_spot": "From the Guest House courtyard for eastern perspective views of the Taj Mahal"
    },
    "east_gate": {
        "name": "East Gate (Exit Point)",
        "coordinates": [27.1756, 78.0433],
        "description": "The East Gate serves as the primary exit for the Taj Mahal complex, though it can also be used as an entrance. This red sandstone gateway, similar in style to the West Gate, provides a contemplative conclusion to your visit. The gate opens onto the Yamuna River bank, offering final views of the mausoleum's riverside profile.",
        "historical_significance": "The East Gate was primarily used by the royal family and special dignitaries arriving by boat via the Yamuna River. During the Mughal era, the river served as a major transportation route, and elaborate boat processions would arrive at this gate. The gate also provided access to the moonlight garden (Mahtab Bagh) across the river, where Shah Jahan would view the Taj Mahal's reflection in the moonlight. Historical accounts suggest that Shah Jahan planned to build a black marble replica of the Taj Mahal for himself across the river, though this project never materialized.",
        "architectural_features": [
            "Constructed from red sandstone matching other gates",
            "Features ornamental domes and chhatris",
            "Inscriptions include verses welcoming departed souls to paradise",
            "Octagonal towers at corners",
            "Originally had wooden doors with brass decorations",
            "Steps leading down to the river bank (restricted area now)"
        ],
        "visitor_tips": [
            "Shops and facilities available outside this gate",
            "Provides access to restrooms and refreshments",
            "Look back for a final view of the Taj Mahal before exiting",
            "River view offers a different perspective (from outside the walls)",
            "Auto-rickshaws and transportation readily available",
            "Consider visiting Mahtab Bagh across the river for sunset views"
        ],
        "next_directions": "Your tour is complete. Thank you for visiting the Taj Mahal virtually. For actual visits, transportation and facilities are available outside this gate.",
        "walking_time": "N/A",
        "walking_distance": "N/A",
        "best_photo_spot": "Final farewell shot looking back at the Taj Mahal from the exit pathway"
    }
}

# Define tour modes
TOUR_MODES = {
    "complete": {
        "name": "Complete Tour",
        "duration": "60 minutes",
        "locations": ["west_gate", "main_gateway", "charbagh_gardens", "reflecting_pool", "main_tomb", "mosque", "guest_house", "east_gate"],
        "description": "Experience all 8 locations with comprehensive historical information and architectural details."
    },
    "express": {
        "name": "Express Tour",
        "duration": "25 minutes",
        "locations": ["west_gate", "main_gateway", "main_tomb", "east_gate"],
        "description": "Visit the 4 essential locations focusing on the main highlights of the Taj Mahal."
    },
    "photography": {
        "name": "Photography Tour",
        "duration": "40 minutes",
        "locations": ["west_gate", "main_gateway", "reflecting_pool", "main_tomb", "east_gate"],
        "description": "Focus on the 5 best photo spots with camera tips and composition guidance."
    }
}

# Chatbot knowledge base
CHATBOT_RESPONSES = {
    "who built": "The Taj Mahal was commissioned by Mughal Emperor Shah Jahan in 1632, in memory of his beloved wife Mumtaz Mahal, who died during childbirth in 1631. The monument took 22 years to complete (1632-1654) and required over 20,000 artisans, including master craftsmen from Persia, the Ottoman Empire, and Europe. The chief architect is believed to be Ustad Ahmad Lahauri, though multiple architects contributed to the design.",

    "when built": "Construction of the Taj Mahal began in 1632 and was completed in 1654, taking 22 years in total. The main mausoleum was finished by 1648, but the surrounding complex, including the mosque, guest house, and outer courtyard, required an additional 6 years. Shah Jahan spared no expense, and the project cost approximately 32 million rupees at the time (equivalent to over $1 billion today).",

    "best photo": "The best photo spots at the Taj Mahal are:\n1. **Main Gateway arch** - Classic framed view (early morning light)\n2. **Reflecting Pool** - Mirror reflections (sunrise/sunset)\n3. **Platform corners** - Dramatic angles with minarets\n4. **Diana Bench** (near reflecting pool) - Princess Diana's iconic spot\n5. **Mosque courtyard** - Side profile views\n\n**Photography Tips:**\n- Arrive at sunrise (6-7 AM) for golden light and fewer crowds\n- Sunset (5-6 PM) provides warm tones\n- Full moon nights offer special viewing (check schedule)\n- Use wide-angle lens for architecture, telephoto for details\n- The marble changes color: pinkish (dawn), white (noon), golden (sunset)",

    "how long": "A thorough visit typically takes 2-3 hours. Here's a breakdown:\n- **Express visit**: 1-1.5 hours (main highlights only)\n- **Standard visit**: 2-3 hours (most locations with moderate pace)\n- **Comprehensive visit**: 3-4 hours (all areas with detailed exploration)\n- **Photography focused**: 2-4 hours (depending on light conditions)\n\nPlan extra time for:\n- Security checks (15-30 minutes)\n- Ticket queues (15-45 minutes, longer on weekends)\n- Travel to/from your accommodation",

    "what bring": "**Essential Items to Bring:**\n- Valid ID and tickets (printed or digital)\n- Camera or smartphone\n- Water bottle (small, sealed)\n- Sunscreen and hat\n- Comfortable walking shoes\n- Modest clothing (shoulders and knees covered)\n\n**Items NOT Allowed:**\n- Large bags, backpacks\n- Food items (except small sealed water)\n- Tobacco products\n- Tripods (require special permission)\n- Drones\n- Any sharp objects\n\n**Useful Tips:**\n- Carry minimal items to speed through security\n- Shoe covers provided for mausoleum entry\n- Lockers available for prohibited items\n- ATMs and facilities available outside",

    "best time": "**Best Times to Visit:**\n\n**By Season:**\n- **October-March**: Ideal weather (pleasant and cool)\n- **April-June**: Very hot (avoid if possible)\n- **July-September**: Monsoon season (fewer crowds, lush gardens)\n\n**By Time of Day:**\n- **Sunrise (6:00-8:00 AM)**: Best light, fewer crowds, marble glows pinkish\n- **Late Afternoon (4:00-6:00 PM)**: Golden hour light, cooler temperatures\n- **Full Moon Nights**: Special viewings (limited capacity, advance booking required)\n\n**Days to Avoid:**\n- Fridays (mosque closed for prayers)\n- Weekends and Indian holidays (very crowded)\n- Summer midday (extreme heat and harsh light)",

    "ticket": "**Ticket Information:**\n\n**Prices:**\n- Foreign tourists: ₹1,100 (includes all areas)\n- Indian citizens: ₹50\n- Children under 15: Free\n\n**Booking:**\n- Online booking recommended: www.tajmahal.gov.in\n- Tickets available at gate (longer queues)\n- Valid for 3 hours from entry time\n\n**Entry Gates:**\n- West Gate (most popular)\n- East Gate (less crowded)\n- South Gate (for tourists from Agra Fort)\n\n**Important:**\n- Closed on Fridays\n- Open sunrise to sunset (6 AM - 7 PM)\n- Special night viewing on full moon (±2 days)",

    "history": "The Taj Mahal's story begins with a great love and profound loss. In 1631, Mumtaz Mahal, the beloved wife of Emperor Shah Jahan, died during the birth of their 14th child. Devastated, Shah Jahan commissioned the construction of the world's most beautiful mausoleum in her memory.\n\nConstruction began in 1632, requiring:\n- 22 years to complete\n- 20,000+ artisans and craftsmen\n- 1,000 elephants to transport materials\n- Materials from across Asia and the Middle East\n\nThe Taj Mahal survived:\n- British colonial rule (19th century)\n- World War II (scaffolding camouflaged it)\n- Indo-Pakistani wars (protective measures)\n\nIn 1983, UNESCO designated it a World Heritage Site. Today, it attracts 7-8 million visitors annually and stands as a symbol of eternal love.",

    "architecture": "The Taj Mahal represents the pinnacle of Mughal architecture, blending Persian, Islamic, and Indian styles.\n\n**Key Architectural Features:**\n- **Perfect symmetry**: Bilateral symmetry except for Shah Jahan's tomb (added later)\n- **Golden ratio**: Proportions follow mathematical perfection\n- **Materials**: White Makrana marble embedded with 28 types of precious stones\n- **Pietra dura**: Intricate stone inlay work featuring floral designs\n- **Calligraphy**: Quranic verses in Thuluth script\n- **Four minarets**: 40 meters tall, tilted outward for earthquake protection\n- **Central dome**: 73 meters high, double-layered for acoustics\n- **Charbagh garden**: Persian paradise garden concept\n\n**Innovative Features:**\n- Changes color with sunlight (pink at dawn, white at noon, golden at sunset)\n- Minarets designed to fall away from tomb in case of collapse\n- Translucent marble allows light to illuminate interior",

    "default": "I'm here to help you explore the Taj Mahal! I can answer questions about:\n- History and construction (\"Who built it?\" \"When was it built?\")\n- Photography tips (\"Best photo spots?\")\n- Visit planning (\"How long does a tour take?\" \"What should I bring?\")\n- Tickets and timings (\"When should I visit?\" \"How much are tickets?\")\n- Architecture and design (\"Tell me about the architecture\")\n\nWhat would you like to know?"
}

def get_chatbot_response(user_input):
    """Generate chatbot response based on user input"""
    user_input_lower = user_input.lower()

    for keyword, response in CHATBOT_RESPONSES.items():
        if keyword in user_input_lower:
            return response

    return CHATBOT_RESPONSES["default"]

def create_map(current_location, tour_locations):
    """Create an interactive Folium map with all tour locations"""
    # Center map on Taj Mahal
    m = folium.Map(
        location=[27.1751, 78.0421],
        zoom_start=17,
        tiles='OpenStreetMap'
    )

    # Add markers for each location in the tour
    for idx, location_key in enumerate(tour_locations, 1):
        location = LOCATIONS[location_key]

        # Determine marker color based on current location
        if location_key == current_location:
            color = 'red'
            icon = 'star'
        elif tour_locations.index(location_key) < tour_locations.index(current_location):
            color = 'green'
            icon = 'check'
        else:
            color = 'blue'
            icon = 'info-sign'

        # Create popup content
        popup_html = f"""
        <div style="width: 250px;">
            <h4 style="color: #8B4513; margin-bottom: 10px;">{location['name']}</h4>
            <p style="font-size: 12px;"><strong>Stop {idx} of {len(tour_locations)}</strong></p>
            <p style="font-size: 11px;">{location['description'][:150]}...</p>
            <hr style="margin: 8px 0;">
            <p style="font-size: 11px;"><strong>Next:</strong> {location.get('next_directions', 'Tour complete')[:100]}</p>
            <p style="font-size: 11px;"><strong>Walking time:</strong> {location.get('walking_time', 'N/A')}</p>
        </div>
        """

        folium.Marker(
            location=location['coordinates'],
            popup=folium.Popup(popup_html, max_width=300),
            tooltip=location['name'],
            icon=folium.Icon(color=color, icon=icon)
        ).add_to(m)

    return m

def initialize_session_state():
    """Initialize session state variables"""
    if 'tour_index' not in st.session_state:
        st.session_state.tour_index = 0
    if 'tour_mode' not in st.session_state:
        st.session_state.tour_mode = 'complete'
    if 'chat_history' not in st.session_state:
        st.session_state.chat_history = []
    if 'user_input' not in st.session_state:
        st.session_state.user_input = ''

def display_location_info(location_key, is_photo_tour=False):
    """Display detailed information about a location"""
    location = LOCATIONS[location_key]

    st.markdown(f'<h2 class="location-title">{location["name"]}</h2>', unsafe_allow_html=True)

    # Description section
    st.markdown('<div class="info-section">', unsafe_allow_html=True)
    st.markdown("### Overview")
    st.write(location['description'])
    st.markdown('</div>', unsafe_allow_html=True)

    # Historical significance
    st.markdown('<div class="info-section">', unsafe_allow_html=True)
    st.markdown("### Historical Significance")
    st.write(location['historical_significance'])
    st.markdown('</div>', unsafe_allow_html=True)

    # Architectural features
    if 'architectural_features' in location:
        st.markdown('<div class="info-section">', unsafe_allow_html=True)
        st.markdown("### Architectural Features")
        for feature in location['architectural_features']:
            st.markdown(f"- {feature}")
        st.markdown('</div>', unsafe_allow_html=True)

    # Photography tips for photo tour
    if is_photo_tour and 'best_photo_spot' in location:
        st.markdown('<div class="info-section" style="border-left: 4px solid #DAA520; background-color: #FFFACD;">', unsafe_allow_html=True)
        st.markdown("### 📸 Photography Tips")
        st.markdown(f"**Best Spot:** {location['best_photo_spot']}")
        if location_key == 'main_tomb':
            st.markdown("""
            **Camera Settings:**
            - Use a wide aperture (f/8-f/11) for sharp architectural details
            - ISO 100-400 for daylight shots
            - Tripod recommended for long exposures (if permitted)
            - HDR mode can help with contrast
            """)
        st.markdown('</div>', unsafe_allow_html=True)

    # Visitor tips
    if 'visitor_tips' in location:
        st.markdown('<div class="info-section">', unsafe_allow_html=True)
        st.markdown("### Visitor Tips")
        for tip in location['visitor_tips']:
            st.markdown(f"- {tip}")
        st.markdown('</div>', unsafe_allow_html=True)

    # Navigation to next location
    if location.get('next_directions') != 'N/A' and location.get('walking_time') != 'N/A':
        st.markdown('<div class="navigation-section">', unsafe_allow_html=True)
        st.markdown("### 🚶 Navigation to Next Stop")
        st.markdown(f"**Directions:** {location['next_directions']}")
        st.markdown(f"**Walking Distance:** {location['walking_distance']}")
        st.markdown(f"**Estimated Time:** {location['walking_time']}")
        st.markdown('</div>', unsafe_allow_html=True)

    # Placeholder for image
    st.markdown('<div class="info-section">', unsafe_allow_html=True)
    st.markdown("### 📷 Location View")
    st.info(f"[Image Placeholder: 400x300px view of {location['name']}]")
    st.caption(f"Visual representation of {location['name']} would be displayed here")
    st.markdown('</div>', unsafe_allow_html=True)

def main():
    """Main application function"""
    initialize_session_state()

    # Header
    st.markdown('<h1 class="main-header">🕌 Taj Mahal Virtual Tourist Guide</h1>', unsafe_allow_html=True)

    # Sidebar
    with st.sidebar:
        st.markdown("## 🎯 Tour Options")

        # Tour mode selection
        selected_mode = st.radio(
            "Select Tour Mode:",
            options=list(TOUR_MODES.keys()),
            format_func=lambda x: TOUR_MODES[x]['name'],
            key='tour_mode_radio'
        )

        # Update tour mode if changed
        if selected_mode != st.session_state.tour_mode:
            st.session_state.tour_mode = selected_mode
            st.session_state.tour_index = 0
            st.rerun()

        # Display tour info
        current_tour = TOUR_MODES[st.session_state.tour_mode]
        st.info(f"**Duration:** {current_tour['duration']}\n\n**Stops:** {len(current_tour['locations'])}\n\n{current_tour['description']}")

        st.markdown("---")

        # Tour controls
        st.markdown("## 🎮 Tour Controls")
        if st.button("🔄 Reset Tour", use_container_width=True):
            st.session_state.tour_index = 0
            st.session_state.chat_history = []
            st.rerun()

        st.markdown("---")

        # Chatbot section
        st.markdown("## 💬 AI Tour Assistant")
        st.caption("Ask me anything about the Taj Mahal!")

        # Chat history display
        chat_container = st.container()
        with chat_container:
            for message in st.session_state.chat_history[-5:]:  # Show last 5 messages
                if message['role'] == 'user':
                    st.markdown(f'<div class="chatbot-message user-message">👤 {message["content"]}</div>', unsafe_allow_html=True)
                else:
                    st.markdown(f'<div class="chatbot-message bot-message">🤖 {message["content"]}</div>', unsafe_allow_html=True)

        # Chat input
        user_question = st.text_input("Ask a question:", key='chat_input', placeholder="e.g., Who built the Taj Mahal?")
        if st.button("Send", use_container_width=True) and user_question:
            # Add user message
            st.session_state.chat_history.append({'role': 'user', 'content': user_question})

            # Get bot response
            bot_response = get_chatbot_response(user_question)
            st.session_state.chat_history.append({'role': 'bot', 'content': bot_response})

            st.rerun()

        # Quick question buttons
        st.markdown("### Quick Questions:")
        if st.button("🏛️ Who built it?", use_container_width=True):
            st.session_state.chat_history.append({'role': 'user', 'content': 'Who built the Taj Mahal?'})
            st.session_state.chat_history.append({'role': 'bot', 'content': CHATBOT_RESPONSES['who built']})
            st.rerun()

        if st.button("📸 Best photo spots?", use_container_width=True):
            st.session_state.chat_history.append({'role': 'user', 'content': 'Best photo spots?'})
            st.session_state.chat_history.append({'role': 'bot', 'content': CHATBOT_RESPONSES['best photo']})
            st.rerun()

        if st.button("⏱️ How long to visit?", use_container_width=True):
            st.session_state.chat_history.append({'role': 'user', 'content': 'How long does a tour take?'})
            st.session_state.chat_history.append({'role': 'bot', 'content': CHATBOT_RESPONSES['how long']})
            st.rerun()

    # Main content area
    current_tour = TOUR_MODES[st.session_state.tour_mode]
    tour_locations = current_tour['locations']
    current_location_key = tour_locations[st.session_state.tour_index]

    # Progress indicator
    progress_text = f"Stop {st.session_state.tour_index + 1} of {len(tour_locations)} | {current_tour['name']}"
    st.markdown(f'<div class="progress-indicator">{progress_text}</div>', unsafe_allow_html=True)

    # Progress bar
    progress_percentage = (st.session_state.tour_index + 1) / len(tour_locations)
    st.progress(progress_percentage)

    # Create columns for map and info
    col1, col2 = st.columns([3, 2])

    with col1:
        st.markdown("### 🗺️ Interactive Map")
        # Create and display map
        tour_map = create_map(current_location_key, tour_locations)
        folium_static(tour_map, width=700, height=500)

        # Legend
        st.markdown("""
        **Map Legend:**
        - 🔴 Red Star: Current Location
        - 🟢 Green Check: Completed Locations
        - 🔵 Blue Info: Upcoming Locations
        """)

    with col2:
        st.markdown("### 📍 Location Details")
        # Scrollable info panel
        info_container = st.container()
        with info_container:
            display_location_info(
                current_location_key,
                is_photo_tour=(st.session_state.tour_mode == 'photography')
            )

    # Navigation buttons
    st.markdown("---")
    col_prev, col_center, col_next = st.columns([1, 2, 1])

    with col_prev:
        if st.button("⬅️ Previous", disabled=(st.session_state.tour_index == 0), use_container_width=True):
            st.session_state.tour_index -= 1
            st.rerun()

    with col_center:
        if st.session_state.tour_index == len(tour_locations) - 1:
            st.success("🎉 Tour Complete! Thank you for visiting the Taj Mahal virtually.")
        else:
            next_location = LOCATIONS[tour_locations[st.session_state.tour_index + 1]]
            st.info(f"Next Stop: {next_location['name']}")

    with col_next:
        if st.button("Next ➡️", disabled=(st.session_state.tour_index == len(tour_locations) - 1), use_container_width=True):
            st.session_state.tour_index += 1
            st.rerun()

    # Footer
    st.markdown("---")
    st.markdown("""
    <div style="text-align: center; color: #666; padding: 1rem;">
        <p>Taj Mahal Virtual Tourist Guide | UNESCO World Heritage Site since 1983</p>
        <p style="font-size: 0.9rem;">This virtual tour is designed to complement your actual visit to the Taj Mahal</p>
        <p style="font-size: 0.8rem;">⏰ Open: Sunrise to Sunset (Closed Fridays) | 📍 Agra, Uttar Pradesh, India</p>
    </div>
    """, unsafe_allow_html=True)

if __name__ == "__main__":
    main()
