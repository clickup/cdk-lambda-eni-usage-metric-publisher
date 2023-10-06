import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Namer } from 'multi-convention-namer';
import { LambdaEniUsageMetricPublisher, LambdaEniUsageMetricPublisherProps } from '../src';

let app: App;
let stack: Stack;

let template: Template;
let defaultLambdaEniUsageMetricPublisherProps: LambdaEniUsageMetricPublisherProps = {
  publishFrequency: 1,
  regions: ['us-east-1'],
  cwNamespace: 'LambdaHyperplaneEniUsage',
  cloudwatchLogsRetention: 7,
};
let lambdaEniUsageMetricPublisher: LambdaEniUsageMetricPublisher;

const createLambdaEniUsageMetricPublisher = function (id: string, props?: LambdaEniUsageMetricPublisherProps) {
  lambdaEniUsageMetricPublisher = new LambdaEniUsageMetricPublisher(
    stack,
    new Namer([id]),
    props as LambdaEniUsageMetricPublisherProps,
  );
  template = Template.fromStack(stack);
};

describe('LambdaEniUsageMetricPublisher', () => {
  describe('default', () => {
    beforeAll(() => {
      app = new App();
      stack = new Stack(app, 'test');
    });
    it('creates resources', () => {
      createLambdaEniUsageMetricPublisher('defaultProps', defaultLambdaEniUsageMetricPublisherProps);
      template.resourceCountIs('AWS::Lambda::Function', 2);
      expect(lambdaEniUsageMetricPublisher.publishFrequency).toEqual(1);
      expect(lambdaEniUsageMetricPublisher.regions).toEqual(['us-east-1']);
    });
    it('creates resources with default props', () => {
      defaultLambdaEniUsageMetricPublisherProps = {};
      createLambdaEniUsageMetricPublisher('noProps', defaultLambdaEniUsageMetricPublisherProps);
      template.resourceCountIs('AWS::Lambda::Function', 2);
      expect(lambdaEniUsageMetricPublisher.publishFrequency).toEqual(1);
      expect(lambdaEniUsageMetricPublisher.regions).toEqual(['us-east-1']);
    });
  });
});
