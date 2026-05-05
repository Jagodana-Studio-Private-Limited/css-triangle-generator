export const siteConfig = {
  name: "CSS Triangle Generator",
  title: "CSS Triangle Generator — Pure CSS Triangles, Instant Code",
  description:
    "Generate pure CSS triangles in seconds. Choose direction, size, and color — get clean CSS code using the classic border trick or modern clip-path. No images, no SVG needed.",
  url: "https://css-triangle-generator.tools.jagodana.com",
  ogImage: "/opengraph-image",

  // Header
  headerIcon: "Triangle",
  brandAccentColor: "#6366f1",

  // SEO
  keywords: [
    "css triangle generator",
    "css triangle",
    "css border triangle",
    "css clip-path triangle",
    "pure css shapes",
    "css triangle code",
    "css arrow generator",
    "css polygon generator",
    "border trick css",
    "css triangle online",
  ],
  applicationCategory: "DeveloperApplication",

  // Theme
  themeColor: "#3b82f6",

  // Branding
  creator: "Jagodana",
  creatorUrl: "https://jagodana.com",
  twitterHandle: "@jagodana",

  // Social Profiles (for Organization schema sameAs)
  socialProfiles: [
    "https://twitter.com/jagodana",
  ],

  // Links
  links: {
    github: "https://github.com/Jagodana-Studio-Private-Limited/css-triangle-generator",
    website: "https://jagodana.com",
  },

  // Footer
  footer: {
    about:
      "CSS Triangle Generator is a free browser tool for generating pure CSS triangle shapes. No sign-up, no limits — just copy and use.",
    featuresTitle: "Features",
    features: [
      "8 triangle directions",
      "Border-trick & clip-path methods",
      "Live preview",
      "One-click CSS copy",
    ],
  },

  // Hero Section
  hero: {
    badge: "Pure CSS — No Images Required",
    titleLine1: "Generate CSS Triangles",
    titleGradient: "Instantly",
    subtitle:
      "Pick a direction, size, and color — get clean CSS code for the classic border trick or modern clip-path. Works in every browser. 100% free.",
  },

  // Feature Cards
  featureCards: [
    {
      icon: "🎯",
      title: "8 Directions",
      description:
        "Generate triangles pointing up, down, left, right, or any corner — all from the same tool.",
    },
    {
      icon: "⚡",
      title: "Two CSS Methods",
      description:
        "Classic border trick for zero-size boxes, or modern clip-path that works with backgrounds and gradients.",
    },
    {
      icon: "📋",
      title: "Copy-Ready Code",
      description:
        "Clean, production-ready CSS output. Click once to copy — paste directly into your stylesheet.",
    },
  ],

  // Related Tools
  relatedTools: [
    {
      name: "Border Radius Generator",
      url: "https://border-radius-generator.tools.jagodana.com",
      icon: "⬛",
      description: "Visually build CSS border-radius values with live preview.",
    },
    {
      name: "Box Shadow Generator",
      url: "https://box-shadow-generator.tools.jagodana.com",
      icon: "🌑",
      description: "Create layered CSS box-shadow effects interactively.",
    },
    {
      name: "Clip Path Generator",
      url: "https://clip-path-generator.tools.jagodana.com",
      icon: "✂️",
      description: "Build CSS clip-path polygons with a drag-and-drop editor.",
    },
    {
      name: "CSS Gradient Generator",
      url: "https://css-gradient-generator.tools.jagodana.com",
      icon: "🌈",
      description: "Create beautiful CSS gradients with a visual editor.",
    },
    {
      name: "CSS Animation Generator",
      url: "https://css-animation-generator.tools.jagodana.com",
      icon: "🎞️",
      description: "Build CSS @keyframe animations without writing a line of code.",
    },
    {
      name: "CSS Filter Generator",
      url: "https://css-filter-generator.tools.jagodana.com",
      icon: "🔮",
      description: "Compose CSS filter effects (blur, contrast, hue) visually.",
    },
  ],

  // HowTo Steps
  howToSteps: [
    {
      name: "Choose a direction",
      text: "Click one of the 8 direction buttons to set which way your triangle points.",
      url: "",
    },
    {
      name: "Select a method",
      text: "Pick 'Border Trick' for a zero-size element or 'Clip-path' for a filled box with a clipped shape.",
      url: "",
    },
    {
      name: "Set size and color",
      text: "Drag the size slider and pick a color using the color picker or by typing a hex value.",
      url: "",
    },
    {
      name: "Copy the CSS",
      text: "Click 'Copy CSS' to copy the generated code and paste it directly into your stylesheet.",
      url: "",
    },
  ],
  howToTotalTime: "PT1M",

  // FAQ
  faq: [
    {
      question: "How do CSS triangles work with borders?",
      answer:
        "CSS triangles use the border trick: set an element's width and height to 0, then set three borders — two transparent and one colored. The browser renders the colored border as a triangle because that's how border corners collapse when there is no visible box area.",
    },
    {
      question: "What is the difference between the border trick and clip-path?",
      answer:
        "The border trick works by collapsing borders on a zero-size element — it's supported in every browser including IE8+. The clip-path method clips a normal element (with width, height, and background) into a triangle shape — it's more flexible (works with images and gradients) but requires a modern browser.",
    },
    {
      question: "Can I use a CSS triangle as a tooltip arrow?",
      answer:
        "Yes! The border-trick triangle is perfect for tooltip arrows and speech-bubble tails. Position it with ::before or ::after pseudo-elements using position: absolute so it sits flush against your tooltip container.",
    },
    {
      question: "Why does the diagonal triangle look like a right triangle?",
      answer:
        "Diagonal triangles (top-left, top-right, etc.) are right isoceles triangles formed by setting two adjacent borders — one colored and one transparent — to equal sizes. This creates a 90-degree corner at the box corner and a hypotenuse across the diagonal.",
    },
    {
      question: "Is this tool free to use?",
      answer:
        "Yes, completely free. All processing happens in your browser — nothing is sent to a server. No account required.",
    },
  ],

  // Pages registry
  pages: {
    "/": {
      title:
        "CSS Triangle Generator — Pure CSS Triangles, Instant Code",
      description:
        "Generate pure CSS triangles in seconds. Choose direction, size, and color — get clean CSS code using the classic border trick or modern clip-path. No images, no SVG needed.",
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
