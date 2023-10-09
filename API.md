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

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### LambdaEniUsageMetricPublisher <a name="LambdaEniUsageMetricPublisher" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher"></a>

A construct that creates an AWS Lambda function to publish ENI usage metrics to CloudWatch.

#### Initializers <a name="Initializers" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.Initializer"></a>

```typescript
import { LambdaEniUsageMetricPublisher } from '@time-loop/cdk-lambda-eni-usage-metric-publisher'

new LambdaEniUsageMetricPublisher(scope: Construct, id: Namer, props: LambdaEniUsageMetricPublisherProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The parent construct. |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.Initializer.parameter.id">id</a></code> | <code>multi-convention-namer.Namer</code> | The ID of the construct. |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.Initializer.parameter.props">props</a></code> | <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisherProps">LambdaEniUsageMetricPublisherProps</a></code> | The properties of the construct. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The parent construct.

---

##### `id`<sup>Required</sup> <a name="id" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.Initializer.parameter.id"></a>

- *Type:* multi-convention-namer.Namer

The ID of the construct.

---

##### `props`<sup>Required</sup> <a name="props" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.Initializer.parameter.props"></a>

- *Type:* <a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisherProps">LambdaEniUsageMetricPublisherProps</a>

The properties of the construct.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.isConstruct"></a>

```typescript
import { LambdaEniUsageMetricPublisher } from '@time-loop/cdk-lambda-eni-usage-metric-publisher'

LambdaEniUsageMetricPublisher.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.property.cwNamespace">cwNamespace</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.property.handler">handler</a></code> | <code>aws-cdk-lib.aws_lambda_nodejs.NodejsFunction</code> | *No description.* |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.property.publishFrequency">publishFrequency</a></code> | <code>number</code> | *No description.* |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.property.regions">regions</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.property.rule">rule</a></code> | <code>aws-cdk-lib.aws_events.Rule</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cwNamespace`<sup>Required</sup> <a name="cwNamespace" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.property.cwNamespace"></a>

```typescript
public readonly cwNamespace: string;
```

- *Type:* string

---

##### `handler`<sup>Required</sup> <a name="handler" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.property.handler"></a>

```typescript
public readonly handler: NodejsFunction;
```

- *Type:* aws-cdk-lib.aws_lambda_nodejs.NodejsFunction

---

##### `publishFrequency`<sup>Required</sup> <a name="publishFrequency" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.property.publishFrequency"></a>

```typescript
public readonly publishFrequency: number;
```

- *Type:* number

---

##### `regions`<sup>Required</sup> <a name="regions" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.property.regions"></a>

```typescript
public readonly regions: string[];
```

- *Type:* string[]

---

##### `rule`<sup>Required</sup> <a name="rule" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisher.property.rule"></a>

```typescript
public readonly rule: Rule;
```

- *Type:* aws-cdk-lib.aws_events.Rule

---


## Structs <a name="Structs" id="Structs"></a>

### LambdaEniUsageMetricPublisherProps <a name="LambdaEniUsageMetricPublisherProps" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisherProps"></a>

#### Initializer <a name="Initializer" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisherProps.Initializer"></a>

```typescript
import { LambdaEniUsageMetricPublisherProps } from '@time-loop/cdk-lambda-eni-usage-metric-publisher'

const lambdaEniUsageMetricPublisherProps: LambdaEniUsageMetricPublisherProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisherProps.property.cloudwatchLogsRetention">cloudwatchLogsRetention</a></code> | <code>aws-cdk-lib.aws_logs.RetentionDays</code> | How long to retain logs published to CloudWatch logs. |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisherProps.property.cwNamespace">cwNamespace</a></code> | <code>string</code> | The CloudWatch namespace to publish metrics to. |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisherProps.property.publishFrequency">publishFrequency</a></code> | <code>number</code> | Time intervals that Lambda will be triggered to publish metric in CloudWatch. |
| <code><a href="#@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisherProps.property.regions">regions</a></code> | <code>string[]</code> | List of AWS regions to publish ENI usage metrics for. |

---

##### `cloudwatchLogsRetention`<sup>Optional</sup> <a name="cloudwatchLogsRetention" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisherProps.property.cloudwatchLogsRetention"></a>

```typescript
public readonly cloudwatchLogsRetention: RetentionDays;
```

- *Type:* aws-cdk-lib.aws_logs.RetentionDays
- *Default:* aws_logs.RetentionDays.THREE_MONTHS

How long to retain logs published to CloudWatch logs.

---

##### `cwNamespace`<sup>Optional</sup> <a name="cwNamespace" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisherProps.property.cwNamespace"></a>

```typescript
public readonly cwNamespace: string;
```

- *Type:* string
- *Default:* 'LambdaHyperplaneEniUsage'

The CloudWatch namespace to publish metrics to.

---

##### `publishFrequency`<sup>Optional</sup> <a name="publishFrequency" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisherProps.property.publishFrequency"></a>

```typescript
public readonly publishFrequency: number;
```

- *Type:* number
- *Default:* 1

Time intervals that Lambda will be triggered to publish metric in CloudWatch.

---

##### `regions`<sup>Optional</sup> <a name="regions" id="@time-loop/cdk-lambda-eni-usage-metric-publisher.LambdaEniUsageMetricPublisherProps.property.regions"></a>

```typescript
public readonly regions: string[];
```

- *Type:* string[]
- *Default:* ['us-east-1']

List of AWS regions to publish ENI usage metrics for.

---



