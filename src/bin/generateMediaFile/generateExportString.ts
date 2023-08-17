import type { Tree } from "../crawl";
import { extname } from "path";

export function generateExportString(params: { tree: Tree; acceptedFileExtensions: string[] }): string {
    const { acceptedFileExtensions, /*generatedFilePath,*/ tree } = params;

    const out = "\n\nexport const files = {\n";

    const index = ((index: number) => {
        return () => {
            return index++;
        };
    })(0);

    function appendStringRec(tree: Tree) {
        let out = "";

        if (Object.keys(tree.directories).length === 0) {
            if (tree.files.length === 0) {
                return out;
            }

            out = `"files": {\n`;

            tree.files.forEach((file, i) => {
                if (!acceptedFileExtensions.includes(extname(file))) {
                    return out;
                }

                (() => {
                    if (file.includes("miniature")) {
                        out = `${out}
                        "miniature": {
					        "url": _${index()},
					        "name": "${file.replace(/^[^-]*-/g, "").replace(/\.\w+$/g, "").replace(/_/g, ' ')}"
                        }
				    ,\n`;
                        return;
                    }
                    if (file.includes("large")) {
                        out = `${out}
                        "large": {
					        "url": _${index()},
					        "name": "${file.replace(/^[^-]*-/g, "").replace(/\.\w+$/g, "").replace(/_/g, ' ')}"
                        }
				    ,\n`;
                        return;
                    }
                    if (file.includes("medium")) {
                        out = `${out}
                        "medium": {
					        "url": _${index()},
					        "name": "${file.replace(/^[^-]*-/g, "").replace(/\.\w+$/g, "").replace(/_/g, ' ')}"
                        }
				    ,\n`;
                        return;
                    }
                    out = `${out}
                        "${file.replace(/^[^-]*-/g, "").replace(/\.\w+$/g, "").replace(/_/g, ' ')}": {
					        "url": _${index()},
					        "name": "${file.replace(/^[^-]*-/g, "").replace(/\.\w+$/g, "").replace(/_/g, ' ')}"
                        }
				    ,\n`;


                })()

            });

            out = `${out}}\n,\n`;

            return out;
        }

        const directories = tree.directories;
        out = `${out}\n "directories": {\n`;

        Object.keys(directories).forEach(key => {
            out = `${out}\n
				"${key}": {
				${appendStringRec(directories[key])}
				},\n
			`;
        });

        out = out + "},\n";
        return out;
    }

    return out + appendStringRec(tree) + "};";
}
