

import fs from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

interface ViteModuleConfig {
    paths?: string[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function collectModuleAssetsPaths(
    paths: string[],
    modulesPath: string
): Promise<string[]> {
    modulesPath = path.join(__dirname, modulesPath);

    const moduleStatusesPath = path.join(__dirname, "modules_statuses.json");

    try {
        const moduleStatusesContent = await fs.readFile(
            moduleStatusesPath,
            "utf-8"
        );
        const moduleStatuses = JSON.parse(moduleStatusesContent) as Record<
            string,
            boolean
        >;

        const moduleDirectories = await fs.readdir(modulesPath);

        for (const moduleDir of moduleDirectories) {
            if (moduleDir === ".DS_Store") continue;

            if (moduleStatuses[moduleDir] === true) {
                const viteConfigPath = path.join(
                    modulesPath,
                    moduleDir,
                    "vite.config.ts"
                );

                try {
                    await fs.access(viteConfigPath);
                    const moduleConfigURL = pathToFileURL(viteConfigPath);
                    const moduleConfig = (await import(
                        moduleConfigURL.href
                    )) as { default?: ViteModuleConfig } | ViteModuleConfig;

                    const config =
                        "default" in moduleConfig
                            ? moduleConfig.default
                            : moduleConfig;

                    if (Array.isArray(config.paths)) {
                        paths.push(...config.paths);
                    }
                } catch (error) {
                    // Optional: log missing configs if needed
                    // console.warn(`Skipping module ${moduleDir}:`, error);
                }
            }
        }
    } catch (error) {
        console.error(
            `Error reading module statuses or configurations: ${error}`
        );
    }

    return paths;
}
