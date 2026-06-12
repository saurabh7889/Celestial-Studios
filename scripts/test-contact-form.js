/**
 * Local validation tests for contact form logic (no network calls).
 * Run: node scripts/test-contact-form.js
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateFields(data) {
  if (!data.name) return "Please enter your name.";
  if (!data.email) return "Please enter your email address.";
  if (!EMAIL_REGEX.test(data.email)) return "Please enter a valid email address.";
  if (!data.phone) return "Please enter your phone number.";
  if (!data.services || data.services.length === 0) {
    return "Please select at least one service.";
  }
  if (!data.message) return "Please enter a message.";
  return null;
}

function buildPayload(data) {
  return {
    _subject: "New Contact Form Submission - Celestial Studios",
    _template: "table",
    _captcha: "false",
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    website: data.website.trim() || "Not provided",
    services: data.services.join(", "),
    message: data.message.trim(),
    submitted_at: data.submitted_at || new Date().toISOString(),
  };
}

const tests = [
  {
    name: "rejects empty submission",
    input: { name: "", email: "", phone: "", services: [], message: "" },
    expectError: true,
  },
  {
    name: "rejects invalid email",
    input: {
      name: "Jane Doe",
      email: "not-an-email",
      phone: "555-0100",
      services: ["Website Development"],
      message: "Hello",
    },
    expectError: true,
  },
  {
    name: "accepts valid submission",
    input: {
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "555-0100",
      website: "jane.com",
      services: ["Website Development", "Branding & Identity"],
      message: "Project inquiry",
    },
    expectError: false,
  },
];

let passed = 0;
let failed = 0;

for (const test of tests) {
  const error = validateFields(test.input);
  const ok = test.expectError ? Boolean(error) : !error;

  if (ok) {
    passed += 1;
    console.log("PASS:", test.name);
  } else {
    failed += 1;
    console.error("FAIL:", test.name, error || "expected validation to fail");
  }
}

const payload = buildPayload(tests[2].input);
const requiredFields = ["name", "email", "phone", "website", "services", "message", "submitted_at"];

for (const field of requiredFields) {
  if (!(field in payload)) {
    failed += 1;
    console.error("FAIL: payload missing field:", field);
  }
}

if (payload.submitted_at && !Number.isNaN(Date.parse(payload.submitted_at))) {
  passed += 1;
  console.log("PASS: payload includes ISO timestamp");
} else {
  failed += 1;
  console.error("FAIL: submitted_at is not a valid ISO timestamp");
}

console.log("\nResults:", passed, "passed,", failed, "failed");
process.exit(failed > 0 ? 1 : 0);
