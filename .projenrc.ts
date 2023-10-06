import { clickupCdk } from '@time-loop/clickup-projen';
const project = new clickupCdk.ClickUpCdkConstructLibrary({
  author: 'jose-clickup',
  authorAddress: 'jamoroso@clickup.com',
  cdkVersion: '2.99.0',
  defaultReleaseBranch: 'main',
  devDeps: ['@time-loop/clickup-projen', '@aws-cdk/integ-tests-alpha', 'aws-sdk-mock'],
  jsiiVersion: '~5.0.0',
  name: 'cdk-lambda-eni-usage-metric-publisher',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/time-loop/cdk-lambda-eni-usage-metric-publisher.git',
  gitignore: ['.vscode/**'],
  bundledDeps: ['aws-sdk'],
  peerDeps: ['multi-convention-namer'],
  // deps: [] /* Runtime dependencies of this module. */,
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();
