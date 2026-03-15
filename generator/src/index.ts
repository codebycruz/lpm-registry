import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

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
}

const index: IndexEntry[] = readdirSync(packagesDir)
	.filter((f) => f.endsWith(".json"))
	.map((f) => {
		const pkg: Package = JSON.parse(
			readFileSync(join(packagesDir, f), "utf8"),
		);
		const versions = Object.keys(pkg.versions ?? {});
		return {
			name: pkg.name,
			description: pkg.description ?? null,
			authors: pkg.authors ?? [],
			latest: versions.at(-1) ?? null,
			git: pkg.git,
		};
	});

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, JSON.stringify(index));
console.log(`Wrote ${index.length} packages to index.json`);
