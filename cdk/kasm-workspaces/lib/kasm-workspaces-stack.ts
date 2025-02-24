import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export interface KasmWorkspacesStackProps extends cdk.StackProps {
}

export class KasmWorkspacesStack extends cdk.Stack {
  public constructor(scope: cdk.App, id: string, props: KasmWorkspacesStackProps = {}) {
    super(scope, id, props);

    // Resources
    const ecrPublicRepository00kasmbloodhound00WatxL = new ecr.CfnPublicRepository(this, 'ECRPublicRepository00kasmbloodhound00WatxL', {
      repositoryName: 'kasm/bloodhound',
      repositoryCatalogData: {
        OperatingSystems: [
          'Linux',
        ],
        RepositoryDescription: 'Kasm Workspace for Bloodhound',
        Architectures: [
          'ARM 64',
          'x86-64',
        ],
      },
      tags: [
      ],
    });
    ecrPublicRepository00kasmbloodhound00WatxL.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;

    const ecrPublicRepository00kasmidea000Ka25 = new ecr.CfnPublicRepository(this, 'ECRPublicRepository00kasmidea000Ka25', {
      repositoryName: 'kasm/idea',
      repositoryCatalogData: {
        OperatingSystems: [
          'Linux',
        ],
        Architectures: [
          'ARM 64',
          'x86-64',
        ],
      },
      tags: [
      ],
    });
    ecrPublicRepository00kasmidea000Ka25.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;

    const ecrPublicRepository00kasmideace00Mfqu3 = new ecr.CfnPublicRepository(this, 'ECRPublicRepository00kasmideace00Mfqu3', {
      repositoryName: 'kasm/ideace',
      repositoryCatalogData: {
        OperatingSystems: [
          'Linux',
        ],
        Architectures: [
          'ARM 64',
          'x86-64',
        ],
      },
      tags: [
      ],
    });
    ecrPublicRepository00kasmideace00Mfqu3.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;

    const ecrPublicRepository00kasmilspy00tryYd = new ecr.CfnPublicRepository(this, 'ECRPublicRepository00kasmilspy00tryYD', {
      repositoryName: 'kasm/ilspy',
      repositoryCatalogData: {
        OperatingSystems: [
          'Linux',
        ],
        RepositoryDescription: 'Linux port of ILSpy',
        Architectures: [
          'ARM 64',
          'x86-64',
        ],
      },
      tags: [
      ],
    });
    ecrPublicRepository00kasmilspy00tryYd.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;

    const ecrPublicRepository00kasmkali00mIogK = new ecr.CfnPublicRepository(this, 'ECRPublicRepository00kasmkali00mIogK', {
      repositoryName: 'kasm/kali',
      repositoryCatalogData: {
        OperatingSystems: [
          'Linux',
        ],
        RepositoryDescription: 'kasm image with additional packages and configuration.\n\nhttps://double16.github.io/kasm-workspaces/1.1/',
        Architectures: [
          'ARM 64',
          'x86-64',
        ],
      },
      tags: [
      ],
    });
    ecrPublicRepository00kasmkali00mIogK.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;

    const ecrPublicRepository00kasmobsidian00qT2sK = new ecr.CfnPublicRepository(this, 'ECRPublicRepository00kasmobsidian00qT2sK', {
      repositoryName: 'kasm/obsidian',
      repositoryCatalogData: {
        OperatingSystems: [
          'Linux',
        ],
        Architectures: [
          'ARM 64',
          'x86-64',
        ],
      },
      tags: [
      ],
    });
    ecrPublicRepository00kasmobsidian00qT2sK.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;

    const ecrPublicRepository00kasmparrot00BeBfA = new ecr.CfnPublicRepository(this, 'ECRPublicRepository00kasmparrot00BeBfA', {
      repositoryName: 'kasm/parrot',
      repositoryCatalogData: {
        OperatingSystems: [
          'Linux',
        ],
        Architectures: [
          'ARM 64',
          'x86-64',
        ],
      },
      tags: [
      ],
    });
    ecrPublicRepository00kasmparrot00BeBfA.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;

    const ecrPublicRepository00kasmterminal007R5d7 = new ecr.CfnPublicRepository(this, 'ECRPublicRepository00kasmterminal007R5D7', {
      repositoryName: 'kasm/terminal',
      repositoryCatalogData: {
        OperatingSystems: [
          'Linux',
        ],
        Architectures: [
          'ARM 64',
          'x86-64',
        ],
      },
      tags: [
      ],
    });
    ecrPublicRepository00kasmterminal007R5d7.cfnOptions.deletionPolicy = cdk.CfnDeletionPolicy.RETAIN;
  }
}
