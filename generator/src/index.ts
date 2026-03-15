import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { $ } from "bun";

const __dirname = dirname(fileURLToPath(import.meta.url));

const packagesDir = join(__dirname, "../../packages");
const outputDir = join(__dirname, "../dist");
const outputFile = join(outputDir, "index.json");

interface Package {
	name: string;
	description?: string;
	authors?: string[];
	git: string;
	versions?: Record<string, string>;
}

interface IndexEntry {
	name: string;
	description: string | null;
	authors: string[];
	latest: string | null;
	git: string;
	lastUpdated: string | null;
}

const files = readdirSync(packagesDir).filter((f) => f.endsWith(".json"));

const index: IndexEntry[] = await Promise.all(
	files.map(async (f) => {
		const filePath = join(packagesDir, f);
		const pkg: Package = JSON.parse(readFileSync(filePath, "utf8"));

		const versions = Object.keys(pkg.versions ?? {});
		const gitDate =
			await $`git log -1 --format=%cI -- ${filePath}`.text();
		const lastUpdated = gitDate.trim() || null;

		return {
			name: pkg.name,
			description: pkg.description ?? null,
			authors: pkg.authors ?? [],
			latest: versions.at(-1) ?? null,
			git: pkg.git,
			lastUpdated,
		};
	}),
);

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, JSON.stringify(index));
console.log(`Wrote ${index.length} packages to index.json`);
