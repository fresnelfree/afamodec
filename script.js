(function () {
  const whatsappPhone = "237693943164";

  function initHeroSlider() {
    const track = document.querySelector(".hero-track");

    if (!track) {
      return;
    }

    const slides = Array.from(track.querySelectorAll(".hero-slide:not([data-clone])"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (slides.length <= 1 || reduceMotion) {
      return;
    }

    const firstClone = slides[0].cloneNode(true);
    firstClone.dataset.clone = "true";
    firstClone.setAttribute("aria-hidden", "true");
    track.appendChild(firstClone);

    const slideDelay = 5000;
    const transitionFallbackDelay = 850;
    let currentIndex = 0;
    let slideTimeoutId;
    let transitionTimeoutId;
    let isMoving = false;

    function moveToCurrentSlide(withTransition) {
      track.style.transition = withTransition ? "" : "none";
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function scheduleNextSlide() {
      window.clearTimeout(slideTimeoutId);
      slideTimeoutId = window.setTimeout(showNextSlide, slideDelay);
    }

    function completeMove() {
      window.clearTimeout(transitionTimeoutId);

      if (currentIndex >= slides.length) {
        currentIndex = 0;
        moveToCurrentSlide(false);
        track.offsetWidth;
        track.style.transition = "";
      }

      isMoving = false;
      scheduleNextSlide();
    }

    function showNextSlide() {
      if (isMoving) {
        return;
      }

      if (currentIndex >= slides.length) {
        currentIndex = 0;
        moveToCurrentSlide(false);
        track.offsetWidth;
        track.style.transition = "";
      }

      isMoving = true;
      currentIndex += 1;
      moveToCurrentSlide(true);

      transitionTimeoutId = window.setTimeout(completeMove, transitionFallbackDelay);
    }

    function recoverSlider() {
      if (currentIndex >= slides.length) {
        currentIndex = 0;
        moveToCurrentSlide(false);
        track.offsetWidth;
        track.style.transition = "";
      }

      scheduleNextSlide();
    }

    moveToCurrentSlide(false);
    scheduleNextSlide();

    track.addEventListener("transitionend", function (event) {
      if (event.propertyName === "transform") {
        completeMove();
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        recoverSlider();
      }
    });
  }

  initHeroSlider();

  function initImpactCounters() {
    const counters = Array.from(document.querySelectorAll(".counter-number"));

    if (!counters.length) {
      return;
    }

    function formatCounterValue(value, minDigits) {
      return String(value).padStart(minDigits, "0");
    }

    function animateCounter(counter) {
      if (counter.dataset.counterDone === "true") {
        return;
      }

      counter.dataset.counterDone = "true";

      const target = Number(counter.dataset.countTo || 0);
      const minDigits = Number(counter.dataset.minDigits || 0);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion || target <= 0) {
        counter.textContent = formatCounterValue(target, minDigits);
        return;
      }

      const duration = 1400;
      const startTime = performance.now();

      function updateCounter(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(target * easedProgress);

        counter.textContent = formatCounterValue(currentValue, minDigits);

        if (progress < 1) {
          window.requestAnimationFrame(updateCounter);
        }
      }

      window.requestAnimationFrame(updateCounter);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }

          animateCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  let currentLanguage = "fr";

  const englishText = {
    "Accueil": "Home",
    "À propos": "About",
    "Programmes": "Programs",
    "Publications": "Publications",
    "S'engager": "Get involved",
    "Le facilitateur pour une communauté prospère": "The facilitator for a thriving community",
    "L’Association des Faclilitateurs pour la Mobilisation et le Développement Communautaire (AFAMODEC) est une organisation à but non lucratif ayant acquis la personnalité juridique le 22 Octobre 2020 selon le récépissé de déclaration d’aassociation N° 00001637/RDA/J06/A2/SAAJP/BAPP.": "The Association of Facilitators for Mobilization and Community Development (AFAMODEC) is a non-profit organization that obtained legal personality on October 22, 2020, under association declaration receipt No. 00001637/RDA/J06/A2/SAAJP/BAPP.",
    "Découvrir nos programmes": "Explore our programs",
    "Ensemble pour le progrès régional": "Together for regional progress",
    "AFAMODEC œuvre pour l'autonomisation durable des communautés au cœur du Cameroun par l'innovation sociale.": "AFAMODEC works for the sustainable empowerment of communities in the heart of Cameroon through social innovation.",
    "Faire un don": "Make a donation",
    "Villages": "Villages",
    "Bénéficiaires": "Beneficiaries",
    "Plus de": "More than",
    "Projets réalisés": "completed projects",
    "Personnes touchées": "people reached",
    "Localités couvertes": "covered localities",
    "L’AFAMODEC poursuit sur le territoire Camerounais sa mission de mobilisation communautaire et d’aide au développement. Elle bâtit, avec des partenaires locaux et internationaux, un environnement favorable au bien-être des communautés. Les volontaires de l’AFAMODEC ont developpé des compétences reconnues dans la recherche, le renforcement des capacités, l’innovation et la protections des acquis. Les domaines d’interventions majeurs sont : la sécurité alimentaire/nutrition, la santé, l’éducation et la protection de l’enfance, les moyens d’existence et l’autonomisation de la femme, la biodiversité et la gestion des ressources naturelles.": "AFAMODEC carries out its mission of community mobilization and development support across Cameroon. With local and international partners, it builds an environment that supports community well-being. AFAMODEC volunteers have developed recognized expertise in research, capacity building, innovation and the protection of achievements. Its main areas of intervention are food security and nutrition, health, education and child protection, livelihoods and women's empowerment, biodiversity and natural resource management.",
    "Vision": "Vision",
    "Construire des communautés résilientes, solidaires et inclusives où chaque citoyen participe activement au développement durable et au bien-être collectif. Cela passe par le développement des partenariats avec les autorités locales et les organismes internationaux pour aligner nos actions sur les objectifs de développement durable (ODD).": "Build resilient, supportive and inclusive communities where every citizen actively contributes to sustainable development and collective well-being. This includes developing partnerships with local authorities and international organizations to align our actions with the Sustainable Development Goals (SDGs).",
    "Finalité": "Purpose",
    "Favoriser un environnement équitable et durable qui améliore la qualité de vie des communautés camerounaises, tout en protégeant la biodiversité et en consolidant les acquis sociaux et économiques pour les générations futures.": "Promote a fair and sustainable environment that improves the quality of life of Cameroonian communities while protecting biodiversity and consolidating social and economic gains for future generations.",
    "Nos programmes d'intervention": "Our intervention programs",
    "Des axes stratégiques pour un impact durable sur le terrain.": "Strategic areas for lasting impact in the field.",
    "Agriculture": "Agriculture",
    "Sécurité alimentaire et nutrition": "Food security and nutrition",
    "Ce programme sectoriel repose sur l’agriculture sensible à la nutrition. Il vise à accroître la disponibilité et l’accessibilité des aliments au sein des ménages et promouvoir la consommation d'aliments nutritifs et sains.": "This sector program is based on nutrition-sensitive agriculture. It aims to increase the availability and accessibility of food within households and promote the consumption of nutritious and healthy foods.",
    "Santé": "Health",
    "Santé communautaire": "Community health",
    "Ce programme vise à encourager l’empowerment des communautés via une approche de santé publique au niveau local, impliquant la participation des habitants pour identifier les problèmes auxquels ils sont confrontés et y trouver des solutions, avec l’aide d’animateurs ou de professionnels que sont les facilitateurs. Il inclut principalement les activités non curatives c’est-à-dire les activités de prévention et d’éducation.": "This program encourages community empowerment through a local public health approach, involving residents in identifying the problems they face and finding solutions with the support of facilitators and professionals. It mainly includes non-curative activities, namely prevention and education.",
    "Autonomisation": "Empowerment",
    "Moyens d'existence et autonomisation": "Livelihoods and empowerment",
    "Ce programme repose sur l'accès équitable aux ressources, à la liberté de décision et à la reconnaissance de leur rôle central dans la société. Les femmes doivent avoir accès aux ressources économiques et financières, être capables de faire des choix pour sa propre vie et son foyer, avoir accès à des emplois décents et développer des activités génératrices de revenus.": "This program is based on fair access to resources, freedom of decision-making and recognition of women's central role in society. Women must have access to economic and financial resources, be able to make choices for their own lives and households, access decent jobs and develop income-generating activities.",
    "Éducation": "Education",
    "Éducation et protection de l'enfance": "Education and child protection",
    "Ce programme intégré favorise l’accès des enfants à une scolarisation de qualité, tout en créant un environnement sûr et inclusif. Cela inclut la sensibilisation des familles et communautés aux droits de l’enfant, la lutte contre le travail des mineurs et les violences basées sur le genre, la mise en place d’activités éducatives et culturelles adaptées, ainsi que l’accompagnement psychosocial des enfants vulnérables.": "This integrated program promotes children's access to quality schooling while creating a safe and inclusive environment. It includes raising awareness among families and communities about children's rights, fighting child labor and gender-based violence, setting up adapted educational and cultural activities, and providing psychosocial support to vulnerable children.",
    "Environnement": "Environment",
    "Biodiversité et gestion des ressources": "Biodiversity and resource management",
    "Ce programme repose sur un ensemble d’actions visant à préserver les écosystèmes forestiers tout en assurant leur utilisation durable par les communautés locales. Les produits forestiers non ligneux (PFNL) et les plantes médicinales sont les cibles majoritaires et le programme vise à promouvoir des pratiques de gestion durable, renforcer les capacités locales en conservation des ressources naturelles.": "This program is based on actions that preserve forest ecosystems while ensuring their sustainable use by local communities. Non-timber forest products (NTFPs) and medicinal plants are priority targets, and the program promotes sustainable management practices while strengthening local capacities in natural resource conservation.",
    "Nos Programmes": "Our Programs",
    "Leaders de demain": "Tomorrow's leaders",
    "Soutien scolaire et infrastructures éducatives pour garantir l'avenir de la jeunesse rurale.": "Academic support and educational infrastructure to secure the future of rural youth.",
    "En savoir plus": "Learn more",
    "Santé publique": "Public health",
    "Soins de proximité": "Local care",
    "Amélioration de l'accès aux soins de santé primaires et sensibilisation communautaire.": "Improving access to primary healthcare and community awareness.",
    "Sécurité Alimentaire": "Food Security",
    "Techniques agricoles durables pour une autosuffisance alimentaire régionale résiliente.": "Sustainable farming techniques for resilient regional food self-sufficiency.",
    "Soutien aux Femmes": "Support for Women",
    "Micro-crédits et formations artisanales pour renforcer l'économie locale féminine.": "Microcredit and craft training to strengthen the local women's economy.",
    "Notre équipe": "Our team",
    "Le Bureau Exécutif et l’Assemblée Générale sont les principaux organes de l’AFAMODEC. L’expertise multisectorielle de ses membres concoure à la rédaction, à la mise en œuvre et au suivi-évaluation des projets.": "The Executive Board and the General Assembly are AFAMODEC's main bodies. The multisectoral expertise of its members contributes to project design, implementation, monitoring and evaluation.",
    "Président": "President",
    "Vice-Présidente": "Vice-President",
    "Secrétaire Général": "Secretary General",
    "Trésorier": "Treasurer",
    "Trésorière adjointe": "Deputy Treasurer",
    "Commissaire aux comptes": "Auditor",
    "Chargé des projets": "Project Officer",
    "Communication & logistique": "Communication & Logistics",
    "Tout voir": "View all",
    "Projets en cours": "Current projects",
    "Juin 2024": "June 2024",
    "Système d'irrigation solaire à Simbock": "Solar irrigation system in Simbock",
    "Lire plus": "Read more",
    "Projets terminés": "Completed projects",
    "Mars 2024": "March 2024",
    "Campagne de vaccination mobile - Zone Sud": "Mobile vaccination campaign - Southern Zone",
    "Rapports annuels": "Annual reports",
    "Rapport": "Report",
    "Rapport d'impact 2023 - Vision Durable": "2023 Impact Report - Sustainable Vision",
    "S'engager avec nous": "Get involved with us",
    "Devenir volontaire": "Become a volunteer",
    "Nous avons besoin de volontaires pour soutenir plusieurs projets de l’AFAMODEC. Vous devez avoir l’envie de transmettre et développer un savoir, un savoir-être et un savoir-faire aux communautés. Si vous êtes intéressé(e), s’il vous plait contactez-nous": "We need volunteers to support several AFAMODEC projects. You should be willing to share and develop knowledge, attitudes and practical skills with communities. If you are interested, please contact us.",
    "Postuler": "Apply",
    "Expertise technique": "Technical expertise",
    "Des experts dans nos programmes d’intervation seront toujours la bienvenue. Si vous êtes intéressé(e), s’il vous plait contactez-nous.": "Experts in our intervention programs are always welcome. If you are interested, please contact us.",
    "Collaborer": "Collaborate",
    "Grâce à vos dons, des milliers de personnes vulnérables améliorent leurs conditions de vie et construisent un avenir meilleur pour eux-mêmes et leur communauté ! Votre générosité permet à l’AFAMODEC d’inscrire dans la durée ses projets. Les personnes bénéficiaires vous remercient de votre soutien! Nous contacter directement s’il vous plait.": "Thanks to your donations, thousands of vulnerable people improve their living conditions and build a better future for themselves and their community. Your generosity helps AFAMODEC sustain its projects over time. Beneficiaries thank you for your support. Please contact us directly.",
    "Envie de contribuer ?": "Want to contribute?",
    "Chaque geste compte pour transformer la vie de milliers de personnes.": "Every gesture counts in transforming the lives of thousands of people.",
    "Devenir Bénévole": "Become a Volunteer",
    "Nous Contacter": "Contact Us",
    "Ressources": "Resources",
    "Nos rapports et guides techniques en accès libre.": "Our reports and technical guides are freely available.",
    "Rapport Annuel 2023": "2023 Annual Report",
    "Guide Agricole Durable": "Sustainable Agriculture Guide",
    "Contactez-nous": "Contact us",
    "Nous sommes à votre écoute pour toute collaboration ou demande d'information.": "We are available for any collaboration or information request.",
    "Adresse": "Address",
    "Téléphone": "Phone",
    "Nom complet": "Full name",
    "Sujet": "Subject",
    "Message": "Message",
    "Nos partenaires": "Our partners",
    "Ils nous accompagnent dans nos actions de terrain.": "They support our field actions.",
    "Envoyer via WhatsApp": "Send via WhatsApp",
    "Faciliter la mobilisation et l'engagement pour des communautés camerounaises plus fortes et autonomes.": "Facilitating mobilization and engagement for stronger, more self-reliant Cameroonian communities.",
    "Liens rapides": "Quick links",
    "Restez informé de nos dernières actions.": "Stay informed about our latest actions.",
    "S'inscrire": "Subscribe",
    "© 2024 AFAMODEC. Tous droits réservés.": "© 2024 AFAMODEC. All rights reserved.",
  };

  const englishPlaceholders = {
    "Votre nom": "Your name",
    "votre@email.com": "your@email.com",
    "Objet de votre message": "Subject of your message",
    "Comment pouvons-nous vous aider ?": "How can we help you?",
    "Votre email": "Your email",
  };

  const whatsappCopy = {
    fr: {
      greeting: "Bonjour, je vous contacte depuis votre site web.",
      name: "Nom complet",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      thanks: "Merci.",
    },
    en: {
      greeting: "Hello, I am contacting you from your website.",
      name: "Full name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      thanks: "Thank you.",
    },
  };

  function normalizeText(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  function setDirectLabelText(label, text) {
    const textNode = Array.from(label.childNodes).find(
      (node) => node.nodeType === Node.TEXT_NODE && normalizeText(node.textContent)
    );

    if (textNode) {
      textNode.textContent = `\n                ${text}\n                `;
    }
  }

  function applyLanguage(language) {
    currentLanguage = language === "en" ? "en" : "fr";
    document.documentElement.lang = currentLanguage;
    document.title =
      currentLanguage === "en"
        ? "AFAMODEC - Community development"
        : "AFAMODEC - Développement communautaire";

    document.querySelectorAll("a, h1, h2, h3, p, strong, span, button").forEach((element) => {
      if (element.children.length > 0 || element.matches("[data-lang-switch], .counter-number")) {
        return;
      }

      if (!element.dataset.i18nFr) {
        element.dataset.i18nFr = normalizeText(element.textContent);
      }

      const frenchText = element.dataset.i18nFr;
      element.textContent =
        currentLanguage === "en" && englishText[frenchText] ? englishText[frenchText] : frenchText;
    });

    document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((field) => {
      if (!field.dataset.i18nPlaceholderFr) {
        field.dataset.i18nPlaceholderFr = field.getAttribute("placeholder");
      }

      const frenchPlaceholder = field.dataset.i18nPlaceholderFr;
      field.setAttribute(
        "placeholder",
        currentLanguage === "en" && englishPlaceholders[frenchPlaceholder]
          ? englishPlaceholders[frenchPlaceholder]
          : frenchPlaceholder
      );
    });

    document.querySelectorAll(".contact-form label").forEach((label) => {
      if (!label.dataset.i18nLabelFr) {
        label.dataset.i18nLabelFr = normalizeText(label.textContent);
      }

      const frenchLabel = label.dataset.i18nLabelFr;
      setDirectLabelText(
        label,
        currentLanguage === "en" && englishText[frenchLabel] ? englishText[frenchLabel] : frenchLabel
      );
    });

    const menuOpen = document.querySelector(".menu-open");
    const menuClose = document.querySelector(".menu-close");
    const nav = document.querySelector(".site-nav");
    const languageSwitchers = document.querySelectorAll(".language-switcher");
    const brandLinks = document.querySelectorAll(".brand, .footer-logo");

    if (menuOpen) {
      menuOpen.setAttribute("aria-label", currentLanguage === "en" ? "Open menu" : "Ouvrir le menu");
    }

    if (menuClose) {
      menuClose.setAttribute("aria-label", currentLanguage === "en" ? "Close menu" : "Fermer le menu");
    }

    if (nav) {
      nav.setAttribute("aria-label", currentLanguage === "en" ? "Main navigation" : "Navigation principale");
    }

    languageSwitchers.forEach((languageSwitcher) => {
      languageSwitcher.setAttribute("aria-label", currentLanguage === "en" ? "Language selection" : "Choix de langue");
    });

    brandLinks.forEach((link) => {
      link.setAttribute("aria-label", currentLanguage === "en" ? "AFAMODEC - Home" : "AFAMODEC - Accueil");
    });

    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      button.classList.toggle("active", button.dataset.langSwitch === currentLanguage);
      button.setAttribute("aria-pressed", String(button.dataset.langSwitch === currentLanguage));
    });

    window.localStorage.setItem("afamodec-language", currentLanguage);
  }

  function initLanguageSwitcher() {
    const preferredLanguage = window.localStorage.getItem("afamodec-language") === "en" ? "en" : "fr";

    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      button.addEventListener("click", function () {
        applyLanguage(button.dataset.langSwitch);
      });
    });

    applyLanguage(preferredLanguage);
  }

  initLanguageSwitcher();
  initImpactCounters();

  const form = document.querySelector("[data-whatsapp-contact]");

  if (!form) {
    return;
  }

  form.dataset.whatsappReady = "true";
  form.dataset.whatsappPhone = whatsappPhone;

  function valueOf(fieldName) {
    const field = form.elements[fieldName];
    return field ? field.value.trim() : "";
  }

  function buildWhatsAppMessage(data) {
    const copy = whatsappCopy[currentLanguage] || whatsappCopy.fr;

    return [
      copy.greeting,
      "",
      `${copy.name} : ${data.name}`,
      `${copy.email} : ${data.email}`,
      `${copy.subject} : ${data.subject}`,
      "",
      `${copy.message} :`,
      data.message,
      "",
      copy.thanks,
    ].join("\n");
  }

  function buildWhatsAppUrl(message) {
    return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const message = buildWhatsAppMessage({
      name: valueOf("name"),
      email: valueOf("email"),
      subject: valueOf("subject"),
      message: valueOf("message"),
    });

    window.open(buildWhatsAppUrl(message), "_blank", "noopener");
  });

  window.afamodecContact = {
    buildWhatsAppMessage,
    buildWhatsAppUrl,
  };
})();
