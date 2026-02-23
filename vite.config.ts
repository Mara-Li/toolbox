import * as fs from "node:fs";
import * as path from "node:path";
import react from "@vitejs/plugin-react";
import { JSDOM } from "jsdom";
import { defineConfig } from "vite";

function extractMetadataPlugin() {
	return {
		name: "vite-plugin-extract-metadata",
		buildStart() {
			console.log("Extraction des métadonnées...");

			const projects = ["./arknights-endfields", "./remove_bg", "."]; // Dossiers contenant les fichiers index.html

			const metadata = [];

			for (const project of projects) {
				const filePath = path.resolve(
					__dirname,
					"src",
					`${project}/index.html`,
				);
				console.log(filePath);
				if (fs.existsSync(filePath)) {
					const htmlContent = fs.readFileSync(filePath, "utf-8");

					// Fonction pour extraire les <meta> tags
					const dom = new JSDOM(htmlContent);
					const document = dom.window.document;

					// Fonction pour extraire une balise meta par propriété
					const extractMeta = (property: string): string | undefined => {
						const meta = document.querySelector(`meta[property="${property}"]`);
						return meta?.getAttribute("content") || undefined;
					};

					const title = extractMeta("og:title");
					const description = extractMeta("og:description");
					const image = extractMeta("og:image");
					const url = extractMeta("og:url");
					const icon = extractMeta("icon");
					const projectName = `/${project.replaceAll("/", "").replaceAll(".", "")}/`;
					metadata.push({
						project: projectName.replaceAll("//", "/"),
						title,
						description,
						url,
						og_image: image,
						icon,
					});
				} else {
					console.warn(`Fichier ${filePath} introuvable. Ignoré.`);
				}
			}

			// Sauvegarder les métadonnées dans un fichier JSON
			const metadataFile = path.resolve(__dirname, "./src/metadata.json");
			fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));
			console.log("Métadonnées extraites avec succès !");
		},
	};
}

export default defineConfig({
	plugins: [react(), extractMetadataPlugin()],
	root: "src",
	publicDir: "../public",
	build: {
		rollupOptions: {
			input: {
				main: "./src/index.html", // Point d'entrée principal
				remove_bg: "./src/remove_bg/index.html", // Point d'entrée secondaire
				arknights: "./src/arknights-endfields/index.html", // nouveau projet web
			},
		},
		assetsDir: "assets",
		outDir: "../dist", // Dossier de sortie
		emptyOutDir: true, // Vide le dossier de sortie avant de construire
	},
	server: {
		fs: {
			allow: ["."], // Permet d'accéder au sous-projet remove_bg
		},
	},
});
