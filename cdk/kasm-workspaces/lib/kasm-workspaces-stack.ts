import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import {format} from "util";
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as sharp from 'sharp';
import * as path from 'path';

/**
 * Converts an image file to PNG, resizes if needed, and encodes it to Base64.
 * @param {string} filename - Path to the image file.
 * @returns {Promise<string | null>} - Base64 encoded PNG string or null if validation fails.
 */
async function encodeImageToPngBase64(filename: string): Promise<string | null> {
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.svg'];
    const ext = path.extname(filename).toLowerCase();

    if (!allowedExtensions.includes(ext)) {
        console.error('Unsupported file format. Only PNG, JPG, and SVG are allowed.');
        return null;
    }

    try {
        let pngBuffer: Buffer;

        if (ext === '.png') {
            pngBuffer = await fse.readFile(filename);
        } else {
            let image = sharp(filename);

            if (ext === '.svg') {
                // Convert SVG to PNG at a reasonable default resolution
                image = image.resize(300, 300, { fit: 'inside' });
            }

            // Convert non-PNG formats to PNG
            pngBuffer = await image.toFormat('png').toBuffer();
        }

        // Ensure image is within size limits
        const metadata = await sharp(pngBuffer).metadata();
        if ((metadata.width && metadata.width > 2048) || (metadata.height && metadata.height > 2048)) {
            pngBuffer = await sharp(pngBuffer)
                .resize(2048, 2048, { fit: 'inside' })
                .toBuffer();
        }

        // Check file size (limit: 500KB)
        if (pngBuffer.length > 500 * 1024) {
            console.error('File size exceeds 500KB after conversion.');
            return null;
        }

        // Convert to Base64
        return pngBuffer.toString('base64');
    } catch (error) {
        console.error(`Error processing file: ${(error as Error).message}`);
        return null;
    }
}

class CompatibilityEntry {
    version: string;
    image: string;
    uncompressed_size_mb: number;
    available_tags: string[];

    constructor(version: string, image: string, uncompressed_size_mb: number, available_tags: string[]) {
        this.version = version;
        this.image = image;
        this.uncompressed_size_mb = uncompressed_size_mb;
        this.available_tags = available_tags;
    }
}

class WorkspaceDef {
    description: string;
    notes: string;
    compatibility: CompatibilityEntry[];
    image_src: string;
}

export interface KasmWorkspacesStackProps extends cdk.StackProps {
}

export class KasmWorkspacesStack extends cdk.Stack {
    public constructor(scope: cdk.App, id: string, props: KasmWorkspacesStackProps = {}) {
        super(scope, id, props);

        const aboutStandardText = `

## Source Code

[https://github.com/double16/pentest-tools/tree/master/attackhost](https://github.com/double16/pentest-tools/tree/master/attackhost)

## Reporting Issues

[https://github.com/double16/pentest-tools/issues](https://github.com/double16/pentest-tools/issues)
`

        const standaloneUsageText = `
## Workspaces

This image was designed to run natively within [Kasm Workspaces](https://kasmweb.com). The easiest way to use it with Workspaces is by installing the registry at [https://double16.github.io/kasm-workspaces/](https://double16.github.io/kasm-workspaces/).

- [Workspaces](https://www.kasmweb.com/docs/latest/install.html): Instructions for installing and configuring Kasm Workspaces.
- [Third-Party Registries](https://www.kasmweb.com/docs/latest/guide/workspace_registry.html#rd-party-registry): Instructions for installing a third-party registry.

## Standalone

The image can also be deployed stand-alone and accessed through a web browser.

\`\`\`shell
docker run --rm -it --shm-size=512m -p 6901:6901 -e VNC_PW=password %s
\`\`\`

The container is now accessible via a browser : https://IP_OF_SERVER:6901. (Use a non-local IP address, i.e. 127.0.0.1:6901 will not work.)

- User: kasm_user
- Password: password

Please note that some functionality, such as audio, uploads, downloads, and microphone pass-through, is only available when using Kasm Workspaces for orchestration.

`

        function newCfnPublicRepository(stack: KasmWorkspacesStack, cdkName: string, repositoryName: string, workspaceFile: string) {
            const workspaceDir = path.dirname(workspaceFile);
            const workspace = JSON.parse(fs.readFileSync(workspaceFile, 'utf8')) as WorkspaceDef;
            const repositoryDescription: string = workspace.description || '';
            const logoFile: string = workspace.image_src ? path.join(workspaceDir, workspace.image_src) : '';
            const notes: string = workspace.notes || '';
            const defaultImage = workspace.compatibility[0].image || 'public.ecr.aws/bramblethorn/'+repositoryName;
            const repo = new ecr.CfnPublicRepository(stack, cdkName, {
                repositoryName: repositoryName,
                repositoryCatalogData: {
                    OperatingSystems: [
                        'Linux',
                    ],
                    RepositoryDescription: repositoryDescription,
                    Architectures: [
                        'ARM 64',
                        'x86-64',
                    ],
                    AboutText: (notes || repositoryDescription) + aboutStandardText,
                    UsageText: format(standaloneUsageText, defaultImage),
                },
                tags: [],
            });
            repo.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;

            /* TODO: uncomment when logoImageBlob is available
            if (logoFile) {
                encodeImageToPngBase64(logoFile).then((encoded : string | null) => {
                    if (encoded) {
                        repo.repositoryCatalogData.LogoImageBlob = encoded;
                    }
                });
            }
            */

            return repo;
        }

        // Resources
        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmbloodhound00WatxL',
            'kasm/bloodhound',
            '../../workspaces/Bloodhound/workspace.json',
        );

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmidea000Ka25',
            'kasm/idea',
            '../../workspaces/IDEA/workspace.json',
        );

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmideace00Mfqu3',
            'kasm/ideace',
            '../../workspaces/IDEACE/workspace.json',
        );

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmkali00mIogK',
            'kasm/kali',
            '../../workspaces/Kali/workspace.json',
        );

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmobsidian00qT2sK',
            'kasm/obsidian',
            '../../workspaces/Obsidian/workspace.json',
        );

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmparrot00BeBfA',
            'kasm/parrot',
            '../../workspaces/Parrot/workspace.json',
        );

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmterminal007R5D7',
            'kasm/terminal',
            '../../workspaces/Terminal/workspace.json',
        );

        newCfnPublicRepository(this,
            'ECRPublicRepository_graphql-voyager',
            'kasm/graphql-voyager',
            '../../workspaces/GraphQL-Voyager/workspace.json',
        );
    }
}
