// import fs from 'fs/promises';
// import path from 'path';
// import { pathToFileURL } from 'url';

// async function collectModuleAssetsPaths(paths, modulesPath) {
//   modulesPath = path.join(__dirname, modulesPath);

//   const moduleStatusesPath = path.join(__dirname, 'modules_statuses.json');

//   try {
//     // Read module_statuses.json
//     const moduleStatusesContent = await fs.readFile(moduleStatusesPath, 'utf-8');
//     const moduleStatuses = JSON.parse(moduleStatusesContent);

//     // Read module directories
//     const moduleDirectories = await fs.readdir(modulesPath);

//     for (const moduleDir of moduleDirectories) {
//       if (moduleDir === '.DS_Store') {
//         // Skip .DS_Store directory
//         continue;
//       }

//       // Check if the module is enabled (status is true)
//       if (moduleStatuses[moduleDir] === true) {
//         const viteConfigPath = path.join(modulesPath, moduleDir, 'vite.config.ts');

//         try {
//           await fs.access(viteConfigPath);
//           // Convert to a file URL for Windows compatibility
//           const moduleConfigURL = pathToFileURL(viteConfigPath);

//           // Import the module-specific Vite configuration
//           const moduleConfig = await import(moduleConfigURL.href);

//           if (moduleConfig.paths && Array.isArray(moduleConfig.paths)) {
//             paths.push(...moduleConfig.paths);
//           }
//         } catch (error) {
//           // vite.config.js does not exist, skip this module
//         }
//       }
//     }
//   } catch (error) {
//     console.error(`Error reading module statuses or module configurations: ${error}`);
//   }

//   return paths;
// }

// export default collectModuleAssetsPaths;


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
