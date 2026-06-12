/**
 * Nova AI configuration for Celestial Studios.
 *
 * BACKEND SETUP (required for live LLM responses):
 * 1. Deploy a server-side proxy (never expose API keys in client-side code).
 * 2. Set apiEndpoint to your proxy URL, e.g. "https://api.celestialstudios.in/nova/chat"
 * 3. The proxy should accept POST { message, history } and return { reply: string }
 * 4. Optionally set apiKey if your proxy requires an Authorization header.
 *
 * Until apiEndpoint is configured, Nova uses the built-in knowledge base below.
 */
window.NOVA_CONFIG = {
  apiEndpoint: "",
  apiKey: "",

  /** When true (default), Nova answers from the local knowledge base. Set false when API is ready. */
  useLocalKnowledgeBase: true,

  companyName: "Celestial Studios",
  tagline: "Click. Connect. Grow.",
  welcomeMessage:
    "Hi there! I'm Nova, the Celestial Studios AI assistant. I can help with our Website Development, Branding, SEO, Digital Marketing, Business Consulting, and Digital Solutions. How can I help you grow today?",

  contact: {
    phonePrimary: "+91 9235827223",
    phoneSecondary: "+91 6388303193",
    email: "azayrth1319@gmail.com",
    location: "Prayagraj, Uttar Pradesh, India",
    contactPage: "contact.html",
    whatsapp: "https://wa.me/message/GDF3NI3OCOOSN1",
    instagram: "https://www.instagram.com/celestialstudios1301/",
  },

  /** Simulated typing delay (ms) for local responses */
  responseDelayMs: 600,
};
