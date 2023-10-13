import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Namer } from 'multi-convention-namer';

import { LambdaEniUsageMetricPublisher } from '../src';

export class BaselineStack extends Stack {
  readonly lambdaFunction: LambdaEniUsageMetricPublisher;

  constructor(scope: Construct, props: StackProps) {
    const id = new Namer(['monitor', 'baseline']);
    super(scope, id.pascal, props);
    this.lambdaFunction = new LambdaEniUsageMetricPublisher(this, id, {
      publishFrequency: 1,
      regions: ['us-west-2'],
      cwNamespace: 'LambdaHyperplaneEniUsage',
    });
  }
}

const app = new App();
const stack = new BaselineStack(app, {});

const integ = new IntegTest(app, 'integ', {
  testCases: [stack],
  cdkCommandOptions: {
    destroy: {
      args: {
        force: true,
      },
    },
  },
});

const currentTime = new Date();

// Round the current time to the nearest ceiling 5 minutes
const roundedEndTime = new Date(currentTime);
roundedEndTime.setMinutes(Math.ceil(roundedEndTime.getMinutes() / 5) * 5);
roundedEndTime.setSeconds(0);
roundedEndTime.setMilliseconds(0);

// Calculate the start time as 5 minutes ago
const fiveMinutesAgo = new Date(currentTime.getTime() - 5 * 60 * 1000);

// Round the start time to the nearest floor 5 minutes
const roundedStartTime = new Date(fiveMinutesAgo);
roundedStartTime.setMinutes(Math.floor(roundedStartTime.getMinutes() / 5) * 5);
roundedStartTime.setSeconds(0);
roundedStartTime.setMilliseconds(0);

const cloudWatchMetric = integ.assertions.awsApiCall('CloudWatch', 'GetMetricData', {
  StartTime: roundedStartTime,
  EndTime: roundedEndTime,
  MetricQueries: [
    {
      Id: 'm1',
      Label: 'Lambda ENI usage',
      MetricStat: {
        Metric: {
          Namespace: 'LambdaHyperplaneEniUsage',
          MetricName: 'NetworkInterfaceCount',
          Dimensions: [
            {
              Name: 'AwsRegion',
              Value: 'us-west-2',
            },
          ],
        },
        Period: 60,
        Stat: 'Maximum',
      },
    },
  ],
});
console.log(cloudWatchMetric.node.path);

// const lambdaArn = stack.lambdaFunction.handler.functionArn;
// const lambdaFunctionTest = integ.assertions.awsApiCall('Lambda', 'GetFunction', { FunctionName: lambdaArn });
// lambdaFunctionTest.assertAtPath('Configuration.Architectures.0', ExpectedResult.stringLikeRegexp('x86_64'));

// There is a lib IAM policy issue which generates the rule with "Action": "eventbridge:DescribeRule"
// instead  of "Action": "events:DescribeRule" resulting in an Access Denied error.
// const ruleName = stack.ruleName;
// const lambdaEvent = integ.assertions.awsApiCall('Events', 'DescribeRule', { Name: ruleName });
// lambdaEvent.assertAtPath('ScheduleExpression', ExpectedResult.exact('rate(1 minutes)'));
app.synth();
