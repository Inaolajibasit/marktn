const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { test } = require("node:test");
const ts = require("typescript");

// Exercise the real action with an isolated email transport; never send test mail.
const source = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../app/contact/actions.ts"), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } },
).outputText;

function actionWith({ env = {}, response = { data: { id: "email-test-id" }, error: null }, throws = false } = {}) {
  const sent = [];
  const logs = [];
  const sandbox = {
    exports: {},
    process: { env: { RESEND_API_KEY: "test-key", ...env } },
    console: { error: (...args) => logs.push(args) },
    require: (name) => name === "resend" ? {
      Resend: class {
        emails = {
          send: async (message) => {
            sent.push(message);
            if (throws) throw new Error("Network unavailable");
            return response;
          },
        };
      },
    } : require(name),
  };
  vm.runInNewContext(source, sandbox, { filename: "contact-actions.cjs" });
  return { submit: (data) => sandbox.exports.submitContactForm({ status: "idle" }, data), sent, logs };
}

function enquiry(overrides = {}) {
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: " Visitor Name ", email: " visitor@example.com ", message: " A campaign enquiry for MARKTN. ", ...overrides })) {
    data.set(key, value);
  }
  return data;
}

test("sends trimmed enquiries to the general inbox with visitor Reply-To", async () => {
  const { submit, sent } = actionWith();
  const result = await submit(enquiry());
  assert.equal(result.status, "success");
  assert.equal(sent.length, 1);
  assert.equal(sent[0].from, "MARKTN <Info@marktn.com>");
  assert.equal(sent[0].to, "Info@marktn.com");
  assert.equal(sent[0].replyTo, "visitor@example.com");
  assert.match(sent[0].text, /^Name: Visitor Name\n/);
  assert.ok(sent[0].text.endsWith("A campaign enquiry for MARKTN."));
});

test("uses the configured sender while keeping the recipient fixed", async () => {
  const { submit, sent } = actionWith({ env: { CONTACT_FROM_EMAIL: " MARKTN <contact@marktn.com> " } });
  assert.equal((await submit(enquiry())).status, "success");
  assert.equal(sent[0].from, "MARKTN <contact@marktn.com>");
  assert.equal(sent[0].to, "Info@marktn.com");
});

test("rejects whitespace-only fields and malformed email before calling Resend", async () => {
  const { submit, sent } = actionWith();
  const result = await submit(enquiry({ name: "   ", email: "invalid", message: "          " }));
  assert.equal(result.status, "error");
  assert.ok(result.fieldErrors.name);
  assert.ok(result.fieldErrors.email);
  assert.ok(result.fieldErrors.message);
  assert.equal(sent.length, 0);
});

test("missing credentials never claim success or call the email provider", async () => {
  const { submit, sent } = actionWith({ env: { RESEND_API_KEY: "" } });
  const result = await submit(enquiry());
  assert.equal(result.status, "error");
  assert.match(result.message, /Info@marktn\.com/);
  assert.equal(sent.length, 0);
});

test("provider rejection never claims success", async () => {
  const { submit, logs } = actionWith({ response: { data: null, error: { name: "validation_error", message: "Domain is not verified" } } });
  assert.equal((await submit(enquiry())).status, "error");
  assert.equal(logs[0][1].name, "validation_error");
  assert.ok(!JSON.stringify(logs).includes("visitor@example.com"));
});

test("a response without an email ID never claims success", async () => {
  const { submit } = actionWith({ response: { data: null, error: null } });
  assert.equal((await submit(enquiry())).status, "error");
});

test("network exceptions return a retryable error", async () => {
  const { submit } = actionWith({ throws: true });
  const result = await submit(enquiry());
  assert.equal(result.status, "error");
  assert.match(result.message, /Info@marktn\.com/);
});
