# LambdaEniUsageMetricPublisher
A construct that creates an AWS Lambda function to publish ENI usage metrics to CloudWatch.

## Usage
To use the `LambdaEniUsageMetricPublisher` construct, simply import it into your AWS CDK stack and create a new instance of the construct:

``` ts
import { Stack } from 'aws-cdk-lib';
import { LambdaEniUsageMetricPublisher } from './lambda-eni-usage-metric-publisher';

const stack = new Stack(app, 'MyStack');

new LambdaEniUsageMetricPublisher(stack, 'MyLambdaEniUsageMetricPublisher', {
  publishFrequency: 5,
  regions: ['us-east-1', 'us-west-2'],
  cwNamespace: 'MyNamespace',
});
```

This will create a new AWS Lambda function that publishes ENI usage metrics to CloudWatch every 5 minutes for the `us-east-1` and `us-west-2` regions, using the `MyNamespace` namespace.

## API
`LambdaEniUsageMetricPublisher(scope: Construct, id: string, props: LambdaEniUsageMetricPublisherProps)`

Creates a new instance of the `LambdaEniUsageMetricPublisher` construct.

### Parameters
- `scope` - The parent construct.
- `id` - The ID of the construct.
- `props` - The properties of the construct.

### Properties
- `publishFrequency` - The time interval (in minutes) that the Lambda function will be triggered to publish metrics to CloudWatch.
- `regions` - The list of AWS regions to publish ENI usage metrics for.
- `handler` - The AWS Lambda function that publishes ENI usage metrics to CloudWatch.
- `rule` - The CloudWatch Events rule that triggers the Lambda function to publish metrics to CloudWatch.
- `cwNamespace` - The CloudWatch namespace to publish metrics to.

## License
This library is licensed under the Apache 2.0 License. See the LICENSE file.
