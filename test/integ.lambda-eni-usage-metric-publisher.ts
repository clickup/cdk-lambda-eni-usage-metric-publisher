import { join } from 'path';
import { ExpectedResult, IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, Stack, StackProps, aws_lambda_nodejs, aws_ec2, Duration, aws_iam } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Namer } from 'multi-convention-namer';
import { IntegTestResources } from './utils/integ-tests-types';
import { LambdaEniUsageMetricPublisher } from '../src';

export class BaselineStack extends Stack {
  readonly lambdaFunction: LambdaEniUsageMetricPublisher;

  constructor(scope: Construct, props: StackProps) {
    const id = new Namer(['monitor', 'baseline']);
    super(scope, id.pascal, props);
    this.lambdaFunction = new LambdaEniUsageMetricPublisher(this, id, {
      publishFrequency: 1,
      regions: [IntegTestResources.AWS_REGION],
      cwNamespace: 'LambdaHyperplaneEniUsage',
    });
  }
}

export class AssertionStack extends Stack {
  constructor(scope: Construct, props: StackProps) {
    const id = new Namer(['helper', 'monitor', 'baseline']);
    super(scope, id.pascal, props);

    new aws_lambda_nodejs.NodejsFunction(this, 'DummyFunction', {
      vpc: aws_ec2.Vpc.fromLookup(this, 'ImportVPC', {
        vpcId: IntegTestResources.VPC_ID,
      }),
      entry: join(__dirname, 'utils/hello-world.ts'),
      allowPublicSubnet: true,
    });

    new aws_lambda_nodejs.NodejsFunction(this, 'GetEniIntegRunnerFunction', {
      functionName: 'GetEniIntegRunnerFunction',
      entry: join(__dirname, 'utils/get-eni-usage-metrics.ts'),
      timeout: Duration.seconds(15),
    }).addToRolePolicy(
      new aws_iam.PolicyStatement({
        actions: ['cloudwatch:GetMetricData'],
        resources: ['*'],
      }),
    );
  }
}

const app = new App();
const stack = new BaselineStack(app, {
  env: {
    account: IntegTestResources.AWS_ACCOUNT,
    region: IntegTestResources.AWS_REGION,
  },
});
const assertionStack = new AssertionStack(app, {
  env: {
    account: IntegTestResources.AWS_ACCOUNT,
    region: IntegTestResources.AWS_REGION,
  },
});

const integ = new IntegTest(app, 'integ', {
  testCases: [stack],
  enableLookups: true,
  cdkCommandOptions: {
    destroy: {
      args: {
        force: true,
      },
    },
  },
});

integ.node.addDependency(assertionStack, stack);
const lambdaFunctionTest = integ.assertions.invokeFunction({
  functionName: 'GetEniIntegRunnerFunction',
});
lambdaFunctionTest.expect(ExpectedResult.objectLike({ StatusCode: 200 }));
lambdaFunctionTest.assertAtPath('Payload.body.message', ExpectedResult.stringLikeRegexp('Metrics found'));

app.synth();
