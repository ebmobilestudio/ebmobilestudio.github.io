// Read the preference before rendering; a first visit always uses English.
let siteLanguage = 'en';
try {
  const savedLanguage = localStorage.getItem('ebmobile-language');
  if (savedLanguage === 'tr' || savedLanguage === 'en') siteLanguage = savedLanguage;
} catch { /* Switching also works when browser storage is unavailable. */ }
document.documentElement.lang = siteLanguage;

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('[data-language]');
  function setLanguage(language, moveFocus = false) {
    document.documentElement.lang = language;
    sections.forEach((section) => {
      section.hidden = section.dataset.language !== language;
      if (!section.hidden) {
        document.title = section.dataset.title;
        document.querySelector('meta[name="description"]').content = section.dataset.description;
        if (moveFocus) section.querySelector(`[data-set-language="${language}"]`).focus({ preventScroll: true });
      }
    });
    document.querySelectorAll('[data-set-language]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.setLanguage === language));
    });
  }
  document.querySelectorAll('.language-switch').forEach((navigation) => { navigation.hidden = false; });
  document.querySelectorAll('[data-set-language]').forEach((button) => {
    button.addEventListener('click', () => {
      const language = button.dataset.setLanguage;
      setLanguage(language, true);
      try { localStorage.setItem('ebmobile-language', language); } catch { /* Storage is optional. */ }
    });
  });
  setLanguage(siteLanguage);
});
