import { clickupCdk } from '@time-loop/clickup-projen';
const project = new clickupCdk.ClickUpCdkConstructLibrary({
  author: 'jose-clickup',
  authorAddress: 'jamoroso@clickup.com',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  devDeps: ['@time-loop/clickup-projen'],
  jsiiVersion: '~5.0.0',
  name: 'cdk-custom-metrics-monitor',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/jamoroso/cdk-custom-metrics-monitor.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
