/**
 * Retrieves ENI usage metrics from CloudWatch for the last 5 minutes.
 * The AWS Lambda resource is managed from test/integ.lambda-eni-usage-metric-publisher.ts
 * @returns {Promise<{ statusCode: number, body: { message?: string, error?: string } }>} Returns a promise that resolves to an object containing the status code and a message or error.
 */
import { CloudWatchClient, GetMetricDataCommand, GetMetricDataCommandInput } from '@aws-sdk/client-cloudwatch';
import { IntegTestResources } from './integ-tests-types';

exports.handler = async () => {
  const client = new CloudWatchClient();
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

  const params: GetMetricDataCommandInput = {
    StartTime: roundedStartTime,
    EndTime: roundedEndTime,
    MetricDataQueries: [
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
                Value: IntegTestResources.AWS_REGION,
              },
              {
                Name: 'VpcId',
                Value: IntegTestResources.VPC_ID,
              },
            ],
          },
          Period: 60,
          Stat: 'Maximum',
        },
      },
    ],
  };
  const command = new GetMetricDataCommand(params);
  try {
    const data = await client.send(command);
    console.log('Data: ', data);
    const numMetrics = data.MetricDataResults?.[0]?.Timestamps?.length ?? 0;
    if (numMetrics > 0) {
      return {
        statusCode: 200,
        body: { message: 'Metrics found' },
      };
    }
    throw new Error('No metrics found');
  } catch (error) {
    return {
      statusCode: 500,
      body: { error: error.message },
    };
  }
};
