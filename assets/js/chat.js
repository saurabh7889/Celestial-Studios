document.addEventListener("DOMContentLoaded", () => {
  // Select container that holds the Chat Widget elements
  const widgetContainer = document.querySelector('.fixed.bottom-6.right-6');
  if (!widgetContainer) return;

  const openBtn = widgetContainer.querySelector('button[aria-label="Open Chat"]');
  const closeBtn = widgetContainer.querySelector('button[aria-label="Close Chat"]');
  const chatWindow = closeBtn ? closeBtn.closest('div.absolute') : null;
  const promptBubble = widgetContainer.querySelector('.mb-4.mr-2');
  const dismissPromptBtn = promptBubble ? promptBubble.querySelector('button[aria-label="Dismiss prompt"]') : null;

  // Show prompt bubble after a small delay (3 seconds)
  setTimeout(() => {
    if (promptBubble && !sessionStorage.getItem('prompt_dismissed')) {
      promptBubble.classList.remove('opacity-0', 'translate-y-4', 'scale-95', 'pointer-events-none');
      promptBubble.classList.add('opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto');
    }
  }, 3000);

  // Open chat event
  if (openBtn && chatWindow) {
    openBtn.addEventListener('click', () => {
      // Hide prompt bubble
      if (promptBubble) {
        promptBubble.classList.remove('opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto');
        promptBubble.classList.add('opacity-0', 'translate-y-4', 'scale-95', 'pointer-events-none');
      }
      // Show chat window
      chatWindow.classList.remove('scale-50', 'opacity-0', 'translate-y-10', 'pointer-events-none');
      chatWindow.classList.add('scale-100', 'opacity-100', 'translate-y-0', 'pointer-events-auto');
      // Hide open button
      openBtn.classList.remove('scale-100', 'opacity-100');
      openBtn.classList.add('scale-50', 'opacity-0', 'pointer-events-none');
    });
  }

  // Close chat event
  if (closeBtn && chatWindow && openBtn) {
    closeBtn.addEventListener('click', () => {
      // Hide chat window
      chatWindow.classList.remove('scale-100', 'opacity-100', 'translate-y-0', 'pointer-events-auto');
      chatWindow.classList.add('scale-50', 'opacity-0', 'translate-y-10', 'pointer-events-none');
      // Show open button
      openBtn.classList.remove('scale-50', 'opacity-0', 'pointer-events-none');
      openBtn.classList.add('scale-100', 'opacity-100');
    });
  }

  // Dismiss prompt bubble event
  if (dismissPromptBtn && promptBubble) {
    dismissPromptBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent bubbling to the promptBubble click event
      promptBubble.classList.remove('opacity-100', 'translate-y-0', 'scale-100', 'pointer-events-auto');
      promptBubble.classList.add('opacity-0', 'translate-y-4', 'scale-95', 'pointer-events-none');
      sessionStorage.setItem('prompt_dismissed', 'true');
    });
  }

  // Let prompt bubble itself trigger open chat when clicked
  if (promptBubble && openBtn) {
    promptBubble.addEventListener('click', () => {
      openBtn.click();
    });
  }
});
