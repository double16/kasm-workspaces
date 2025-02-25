import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { format } from "util";

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
docker run --rm -it --shm-size=512m -p 6901:6901 -e VNC_PW=password public.aws.ecr/bramblethorn/%s:1.16.1-weekly
\`\`\`

The container is now accessible via a browser : https://IP_OF_SERVER:6901

- User: kasm_user
- Password: password

Please note that some functionality, such as audio, uploads, downloads, and microphone pass-through, is only available when using Kasm Workspaces for orchestration.

`

        function newCfnPublicRepository(stack: KasmWorkspacesStack, cdkName: string, repositoryName: string, repositoryDescription: string) {
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
                    AboutText: repositoryDescription+aboutStandardText,
                    UsageText: format(standaloneUsageText, repositoryName),
                },
                tags: [],
            });
            repo.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;
            return repo;
        }

        // Resources
        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmbloodhound00WatxL',
            'kasm/bloodhound',
            'Kasm Workspace for Bloodhound');

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmidea000Ka25',
            'kasm/idea',
            'Kasm Workspace for IntelliJ IDEA Ultimate');

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmideace00Mfqu3',
            'kasm/ideace',
            'Kasm Workspace for IntelliJ IDEA Community Edition');

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmilspy00tryYD',
            'kasm/ilspy',
            'Linux port of ILSpy');

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmkali00mIogK',
            'kasm/kali',
            'kasm image with additional packages and configuration');

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmobsidian00qT2sK',
            'kasm/obsidian',
            'Kasm Workspace for Obsidian');

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmparrot00BeBfA',
            'kasm/parrot',
            'Kasm Workspace for Parrot OS');

        newCfnPublicRepository(this,
            'ECRPublicRepository00kasmterminal007R5D7',
            'kasm/terminal',
            'Kasm Workspace for a terminal using zsh and tmux');
    }
}
