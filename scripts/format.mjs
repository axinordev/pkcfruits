import { spawnSync } from "node:child_process";

function oxfmt(args) {
  return spawnSync("bunx", ["oxfmt", ...args], {
    encoding: "utf8",
    shell: process.platform === "win32",
  });
}

const listed = oxfmt(["--list-different"]);
if (listed.error) {
  console.error(listed.error.message);
  process.exit(1);
}
if (listed.stderr) process.stderr.write(listed.stderr);
if (listed.status !== 0 && listed.status !== 1) {
  process.exit(listed.status ?? 1);
}

const files = (listed.stdout ?? "")
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

if (files.length === 0) {
  console.log("All matched files are already formatted.");
} else {
  console.log(files.join("\n"));
}

const written = oxfmt([]);
if (written.stdout) process.stdout.write(written.stdout);
if (written.stderr) process.stderr.write(written.stderr);
process.exit(written.status ?? 1);
