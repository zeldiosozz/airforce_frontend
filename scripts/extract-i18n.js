const fs = require("fs");
const path = require("path");

const ROOT = path.join(process.cwd(), "app");
const OUTPUT = path.join(process.cwd(), "messages", "en.json");

const SKIP_DIRS = new Set([
  "api",
  "[locale]",
  "hooks",
  "lib",
]);

const IGNORE_EXACT = new Set([
  "AIRFORCE",
  "Home",
  "Search",
  "Menu",
  "Close",
  "100%",
  "EGP",
  "COD",
]);

const IGNORE_PATTERNS = [
  /^https?:\/\//i,
  /^\+?\d[\d\s\-().]{6,}$/,
  /^\d+([.,]\d+)?%?$/,
  /^[0-9.,]+$/,
  /^#?[0-9a-f]{3,8}$/i,
];

function getFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) return files;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...getFiles(fullPath));
    } else if (entry.isFile() && /\.(tsx|jsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

function cleanText(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function isUsefulText(text) {
  if (!text) return false;

  if (text.length < 2) return false;

  if (IGNORE_EXACT.has(text)) return false;

  if (IGNORE_PATTERNS.some((pattern) => pattern.test(text))) {
    return false;
  }

  // Tailwind / code-like strings
  if (
    text.includes("className") ||
    text.includes("=>") ||
    text.includes("&&") ||
    text.includes("||") ||
    text.includes("px-") ||
    text.includes("text-") ||
    text.includes("bg-") ||
    text.includes("flex-") ||
    text.includes("grid-")
  ) {
    return false;
  }

  return true;
}

function extractText(content) {
  const results = new Set();

  let match;

  // JSX text:
  // <h1>Hello World</h1>
  const jsxTextRegex = />([^<>{}\n]+)</g;

  while ((match = jsxTextRegex.exec(content)) !== null) {
    const text = cleanText(match[1]);

    if (isUsefulText(text)) {
      results.add(text);
    }
  }

  // placeholder="..."
  const placeholderRegex =
    /placeholder\s*=\s*["'`]([^"'`]+)["'`]/g;

  while ((match = placeholderRegex.exec(content)) !== null) {
    const text = cleanText(match[1]);

    if (isUsefulText(text)) {
      results.add(text);
    }
  }

  // title="..."
  const titleRegex =
    /\btitle\s*=\s*["'`]([^"'`]+)["'`]/g;

  while ((match = titleRegex.exec(content)) !== null) {
    const text = cleanText(match[1]);

    if (isUsefulText(text)) {
      results.add(text);
    }
  }

  // aria-label="..."
  const ariaRegex =
    /aria-label\s*=\s*["'`]([^"'`]+)["'`]/g;

  while ((match = ariaRegex.exec(content)) !== null) {
    const text = cleanText(match[1]);

    if (isUsefulText(text)) {
      results.add(text);
    }
  }

  return [...results];
}

function makeKey(text) {
  const words = text
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) {
    return "text";
  }

  return words
    .map((word, index) => {
      const clean = word.toLowerCase();

      if (index === 0) {
        return clean;
      }

      return clean.charAt(0).toUpperCase() + clean.slice(1);
    })
    .join("");
}
function makeUniqueKey(obj, baseKey) {
  if (!obj[baseKey]) {
    return baseKey;
  }

  let counter = 2;

  while (obj[`${baseKey}${counter}`]) {
    counter++;
  }

  return `${baseKey}${counter}`;
}

const files = getFiles(ROOT);

let existing = {};

if (fs.existsSync(OUTPUT)) {
  try {
    existing = JSON.parse(
      fs.readFileSync(OUTPUT, "utf8")
    );
  } catch {
    console.log(
      "⚠ Existing en.json is invalid. Starting with empty translations."
    );
  }
}

const extracted = {};

let totalTexts = 0;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const texts = extractText(content);

  if (!texts.length) continue;

  const componentName = path
    .basename(file)
    .replace(/\.(tsx|jsx)$/, "");

  extracted[componentName] = {};

  for (const text of texts) {
    const baseKey = makeKey(text);

    const key = makeUniqueKey(
      extracted[componentName],
      baseKey
    );

    extracted[componentName][key] = text;

    totalTexts++;
  }

  console.log(
    `✓ ${path.relative(ROOT, file)} → ${texts.length} texts`
  );
}

const merged = {
  ...existing,
};

for (const [component, values] of Object.entries(extracted)) {
  merged[component] = {
    ...(existing[component] || {}),
    ...values,
  };
}

fs.mkdirSync(path.dirname(OUTPUT), {
  recursive: true,
});

fs.writeFileSync(
  OUTPUT,
  JSON.stringify(merged, null, 2),
  "utf8"
);

console.log("\n--------------------------------");
console.log(`✓ Scanned ${files.length} TSX files`);
console.log(`✓ Found ${totalTexts} texts`);
console.log(`✓ Updated: messages/en.json`);
console.log("--------------------------------\n");