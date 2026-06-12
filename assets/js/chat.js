/**
 * Nova AI — Celestial Studios chat assistant
 * Handles UI interactions, local knowledge base, and optional API integration.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "nova_prompt_dismissed";

  const KNOWLEDGE = [
    {
      keys: ["service", "services", "offer", "what do you do", "help with"],
      reply:
        "Celestial Studios offers Website Development, Branding & Identity, SEO, Digital Marketing, Business Consulting, and Digital Solutions. We help businesses build stronger digital presence and sustainable growth. Explore our services at services.html or contact us for a tailored plan.",
    },
    {
      keys: ["website", "web development", "web design", "site"],
      reply:
        "Our Website Development services include custom business websites, landing pages, e-commerce solutions, and ongoing Website Support & Maintenance. We focus on performance, mobile responsiveness, and conversion-driven design.",
    },
    {
      keys: ["brand", "branding", "logo", "identity"],
      reply:
        "Our Branding services help you define a memorable identity — logo design, brand guidelines, visual systems, and messaging that builds trust and recognition across every touchpoint.",
    },
    {
      keys: ["seo", "search engine", "ranking", "google"],
      reply:
        "We provide SEO services including keyword research, on-page optimization, technical SEO, local SEO, and content strategy to improve visibility and attract qualified traffic to your business.",
    },
    {
      keys: ["marketing", "digital marketing", "social media", "ads", "campaign"],
      reply:
        "Our Digital Marketing services cover social media management, content marketing, paid advertising, email campaigns, and analytics — all aligned to generate leads and measurable ROI.",
    },
    {
      keys: ["consult", "consulting", "strategy", "business"],
      reply:
        "Business Consulting at Celestial Studios includes digital strategy, growth planning, market positioning, and technology recommendations tailored to your goals and industry.",
    },
    {
      keys: ["digital solution", "automation", "ai", "nova"],
      reply:
        "Our Digital Solutions include AI-powered tools, workflow automation, chatbots like Nova, and integrated systems that streamline operations and improve customer experience.",
    },
    {
      keys: ["price", "pricing", "cost", "quote", "budget", "how much"],
      reply:
        "Pricing depends on project scope, timeline, and requirements. We'd love to understand your goals and provide a custom quote. Reach us at +91 9235827223 or visit contact.html to start a conversation.",
    },
    {
      keys: ["contact", "phone", "email", "reach", "call", "whatsapp"],
      reply:
        "You can reach Celestial Studios at +91 9235827223 (primary) or +91 6388303193 (secondary). We're based in Prayagraj, Uttar Pradesh, India, and serve clients worldwide. Visit contact.html or message us on WhatsApp for a quick response.",
    },
    {
      keys: ["location", "where", "based", "office", "address"],
      reply:
        "Celestial Studios is based in Prayagraj, Uttar Pradesh, India. We work with clients remotely across India and internationally.",
    },
    {
      keys: ["about", "who are you", "company", "celestial"],
      reply:
        "Celestial Studios is a digital agency with the tagline Click. Connect. Grow. We combine websites, branding, SEO, marketing, and innovative digital solutions to help businesses create lasting impact. Learn more at about.html.",
    },
    {
      keys: ["refund", "cancel", "money back"],
      reply:
        "Our Refund Policy outlines conditions for eligible refunds on services and retainers. Please review refund-policy.html or contact us directly to discuss your specific situation.",
    },
    {
      keys: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
      reply:
        "Hello! I'm Nova, your Celestial Studios assistant. Ask me about our services, pricing, or how to get started — I'm here to help.",
    },
  ];

  function getConfig() {
    return window.NOVA_CONFIG || {};
  }

  function normalize(text) {
    return text.toLowerCase().trim();
  }

  function getLocalReply(message) {
    const text = normalize(message);
    if (!text) return "Please type a question and I'll do my best to help.";

    for (const entry of KNOWLEDGE) {
      if (entry.keys.some((key) => text.includes(key))) {
        return entry.reply;
      }
    }

    const config = getConfig();
    return (
      "Thanks for your question! For detailed assistance about " +
      (config.companyName || "Celestial Studios") +
      " services, please contact us at " +
      (config.contact?.phonePrimary || "+91 9235827223") +
      " or visit " +
      (config.contact?.contactPage || "contact.html") +
      ". Our team can provide personalized guidance on Website Development, Branding, SEO, Digital Marketing, Business Consulting, and Digital Solutions."
    );
  }

  async function fetchApiReply(message, history) {
    const config = getConfig();
    const endpoint = config.apiEndpoint;

    if (!endpoint) {
      throw new Error("API endpoint not configured");
    }

    const headers = { "Content-Type": "application/json" };
    if (config.apiKey) {
      headers.Authorization = "Bearer " + config.apiKey;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ message, history }),
    });

    if (!response.ok) {
      throw new Error("API request failed with status " + response.status);
    }

    const data = await response.json();
    return data.reply || data.message || data.content || "";
  }

  async function getReply(message, history) {
    const config = getConfig();
    const useLocal = config.useLocalKnowledgeBase !== false || !config.apiEndpoint;

    if (!useLocal && config.apiEndpoint) {
      try {
        const apiReply = await fetchApiReply(message, history);
        if (apiReply) return apiReply;
      } catch (err) {
        console.warn("[Nova AI] API unavailable, falling back to local knowledge base:", err.message);
      }
    }

    await new Promise((r) => setTimeout(r, config.responseDelayMs || 600));
    return getLocalReply(message);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function formatReply(text) {
    return escapeHtml(text).replace(
      /(services\.html|contact\.html|about\.html|refund-policy\.html)/g,
      '<a href="$1" class="text-blue-600 underline hover:text-blue-700">$1</a>'
    );
  }

  class NovaChat {
    constructor(root) {
      this.root = root;
      this.promptBubble = root.querySelector("#nova-prompt-bubble");
      this.dismissBtn = root.querySelector("#nova-dismiss-prompt");
      this.launcherBtn = root.querySelector("#nova-launcher-btn");
      this.chatWindow = root.querySelector("#nova-chat-window");
      this.closeBtn = root.querySelector("#nova-close-btn");
      this.messagesEl = root.querySelector("#nova-messages");
      this.form = root.querySelector("#nova-chat-form");
      this.input = root.querySelector("#nova-chat-input");
      this.sendBtn = root.querySelector("#nova-send-btn");
      this.errorEl = root.querySelector("#nova-error");
      this.history = [];
      this.isOpen = false;
      this.isLoading = false;

      this.init();
    }

    init() {
      const config = getConfig();
      this.addBotMessage(config.welcomeMessage || "Hello! How can I help you today?");

      this.launcherBtn?.addEventListener("click", () => this.openChat());
      this.closeBtn?.addEventListener("click", () => this.closeChat());
      this.dismissBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        this.dismissPrompt();
      });

      this.promptBubble?.addEventListener("click", (e) => {
        if (e.target.closest("#nova-dismiss-prompt")) return;
        this.openChat();
      });

      this.promptBubble?.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.openChat();
        }
      });

      this.form?.addEventListener("submit", (e) => {
        e.preventDefault();
        this.sendMessage();
      });

      this.input?.addEventListener("input", () => {
        if (this.sendBtn) {
          this.sendBtn.disabled = !this.input.value.trim() || this.isLoading;
        }
      });

      this.input?.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen) {
          this.closeChat();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.isOpen) {
          this.closeChat();
        }
      });

      if (sessionStorage.getItem(STORAGE_KEY)) {
        this.hidePrompt();
      }
    }

    hidePrompt() {
      if (!this.promptBubble) return;
      this.promptBubble.style.display = "none";
      this.promptBubble.classList.add("opacity-0", "pointer-events-none");
    }

    dismissPrompt() {
      this.hidePrompt();
      sessionStorage.setItem(STORAGE_KEY, "true");
    }

    openChat() {
      if (!this.chatWindow || !this.launcherBtn) return;
      this.isOpen = true;
      this.hidePrompt();
      this.dismissPrompt();

      this.chatWindow.hidden = false;
      this.chatWindow.classList.remove("scale-50", "opacity-0", "translate-y-10", "pointer-events-none");
      this.chatWindow.classList.add("scale-100", "opacity-100", "translate-y-0", "pointer-events-auto");

      this.launcherBtn.classList.remove("scale-100", "opacity-100");
      this.launcherBtn.classList.add("scale-50", "opacity-0", "pointer-events-none");
      this.launcherBtn.setAttribute("aria-expanded", "true");

      setTimeout(() => this.input?.focus(), 300);
    }

    closeChat() {
      if (!this.chatWindow || !this.launcherBtn) return;
      this.isOpen = false;

      this.chatWindow.classList.remove("scale-100", "opacity-100", "translate-y-0", "pointer-events-auto");
      this.chatWindow.classList.add("scale-50", "opacity-0", "translate-y-10", "pointer-events-none");
      this.launcherBtn.classList.remove("scale-50", "opacity-0", "pointer-events-none");
      this.launcherBtn.classList.add("scale-100", "opacity-100");
      this.launcherBtn.setAttribute("aria-expanded", "false");

      setTimeout(() => {
        if (!this.isOpen) this.chatWindow.hidden = true;
      }, 300);
    }

    scrollToBottom() {
      if (this.messagesEl) {
        this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
      }
    }

    addMessage(text, role) {
      if (!this.messagesEl) return;

      const isUser = role === "user";
      const row = document.createElement("div");
      row.className = "flex " + (isUser ? "justify-end" : "justify-start");

      if (isUser) {
        row.innerHTML =
          '<div class="max-w-[75%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm bg-black text-white rounded-br-sm">' +
          escapeHtml(text) +
          "</div>";
      } else {
        row.innerHTML =
          '<div class="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mr-3 shadow-sm border border-gray-200 overflow-hidden">' +
          '<img src="' +
          (this.root.querySelector("img")?.getAttribute("src") || "assets/images/celestial-ai.svg") +
          '" alt="" class="w-full h-full object-cover" width="32" height="32">' +
          '</div><div class="max-w-[75%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm bg-white text-gray-800 border border-gray-100 rounded-bl-sm">' +
          formatReply(text) +
          "</div>";
      }

      this.messagesEl.appendChild(row);
      this.scrollToBottom();
    }

    addBotMessage(text) {
      this.addMessage(text, "bot");
    }

    showTyping() {
      if (!this.messagesEl) return null;
      const row = document.createElement("div");
      row.className = "flex justify-start nova-typing-indicator";
      row.innerHTML =
        '<div class="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 mr-3 shadow-sm border border-gray-200 overflow-hidden">' +
        '<img src="' +
        (this.root.querySelector("img")?.getAttribute("src") || "assets/images/celestial-ai.svg") +
        '" alt="" class="w-full h-full object-cover" width="32" height="32">' +
        '</div><div class="px-4 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm flex gap-1 items-center">' +
        '<span class="nova-typing-dot w-2 h-2 rounded-full bg-gray-400 inline-block"></span>' +
        '<span class="nova-typing-dot w-2 h-2 rounded-full bg-gray-400 inline-block"></span>' +
        '<span class="nova-typing-dot w-2 h-2 rounded-full bg-gray-400 inline-block"></span>' +
        "</div>";
      this.messagesEl.appendChild(row);
      this.scrollToBottom();
      return row;
    }

    hideError() {
      if (this.errorEl) {
        this.errorEl.classList.add("hidden");
        this.errorEl.textContent = "";
      }
    }

    showError(msg) {
      if (this.errorEl) {
        this.errorEl.textContent = msg;
        this.errorEl.classList.remove("hidden");
      }
    }

    async sendMessage() {
      const text = this.input?.value.trim();
      if (!text || this.isLoading) return;

      this.hideError();
      this.addMessage(text, "user");
      this.history.push({ role: "user", content: text });

      if (this.input) this.input.value = "";
      if (this.sendBtn) this.sendBtn.disabled = true;

      this.isLoading = true;
      const typingEl = this.showTyping();

      try {
        const reply = await getReply(text, this.history);
        typingEl?.remove();
        this.addBotMessage(reply);
        this.history.push({ role: "assistant", content: reply });
      } catch (err) {
        typingEl?.remove();
        this.showError("Something went wrong. Please try again or contact us directly.");
        console.error("[Nova AI]", err);
      } finally {
        this.isLoading = false;
        if (this.sendBtn) this.sendBtn.disabled = !this.input?.value.trim();
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const widget = document.getElementById("nova-widget");
    if (widget) {
      new NovaChat(widget);
    }
  });
})();
