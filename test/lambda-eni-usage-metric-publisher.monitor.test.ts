import path from 'path';
import * as AWSMock from 'aws-sdk-mock';
import { monitor } from '../src/lambda-eni-usage-metric-publisher.monitor';

AWSMock.setSDK(path.resolve('./node_modules/aws-sdk'));

// Silence log output
(['log', 'error'] as jest.FunctionPropertyNames<Required<Console>>[]).forEach((func) =>
  jest.spyOn(console, func).mockImplementation(() => {}),
);

describe('monitor', () => {
  beforeEach(() => {
    process.env.REGION_LIST = 'us-east-1';
    process.env.CW_NAMESPACE = 'test-namespace';
    AWSMock.mock('EC2', 'describeVpcs', mockDescribeVpcs);
    AWSMock.mock('EC2', 'describeNetworkInterfaces', mockDescribeNetworkInterfaces);
    AWSMock.mock('CloudWatch', 'putMetricData', (params: AWS.CloudWatch.PutMetricDataInput, callback) => {
      console.log(params);
      callback(undefined, {});
    });
  });

  afterEach(() => {
    AWSMock.restore();
  });

  const mockDescribeVpcs = jest.fn(() => {
    return { Vpcs: [{ VpcId: 'vpc-123' }] };
  });
  const mockDescribeNetworkInterfaces = jest.fn(() => {
    return { NetworkInterfaces: [{ VpcId: 'vpc-123' }, { VpcId: 'vpc-123' }] };
  });

  it('should publish metric data to CloudWatch', async () => {
    const result = await monitor();

    expect(result).toEqual([{ region: 'us-east-1', vpcId: 'vpc-123', count: 2 }]);
  });

  it('should throw an error if REGION_LIST environment variable is not set', async () => {
    delete process.env.REGION_LIST;
    process.env.CW_NAMESPACE = 'test-namespace';

    await expect(monitor()).rejects.toThrow('REGION_LIST environment variable not set');
  });

  it('should throw an error if CW_NAMESPACE environment variable is not set', async () => {
    process.env.REGION_LIST = 'us-east-1';
    delete process.env.CW_NAMESPACE;

    await expect(monitor()).rejects.toThrow('CW_NAMESPACE environment variable not set');
  });

  it('should log "No results to publish" if there are no results', async () => {
    AWSMock.remock(
      'EC2',
      'describeNetworkInterfaces',
      jest.fn(() => {
        return { NetworkInterfaces: [] };
      }),
    );

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const result = await monitor();

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith('No results to publish');

    consoleSpy.mockRestore();
  });

  it('should throw an error if there is an error publishing metric data', async () => {
    AWSMock.remock('CloudWatch', 'putMetricData', (params: AWS.CloudWatch.PutMetricDataInput, callback) => {
      callback(
        {
          code: '1',
          message: `Intentional mock failure: ${params}`,
          time: new Date(),
          name: 'MockECSAWSError',
        },
        undefined,
      );
    });

    await expect(monitor()).rejects.toBeDefined();
  });
});
