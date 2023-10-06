import * as AWS from 'aws-sdk';

export interface Result {
  region: string;
  vpcId: string;
  count: number;
}

export const monitor = async () => {
  try {
    const regionList = process.env.REGION_LIST;
    const cwNamespace = process.env.CW_NAMESPACE;

    if (!regionList) {
      throw new Error('REGION_LIST environment variable not set');
    }

    if (!cwNamespace) {
      throw new Error('CW_NAMESPACE environment variable not set');
    }

    const regions = regionList.split(',');
    const results: Result[] = [];

    for (const region of regions) {
      const vpcCounts: { [key: string]: number } = {};
      const ec2Client = new AWS.EC2({ region });
      const { Vpcs = [] } = await ec2Client.describeVpcs().promise();

      const vpcIds = Vpcs.map((vpc) => vpc.VpcId).filter((vpcId) => !!vpcId) as string[];
      const params = {
        Filters: [
          { Name: 'vpc-id', Values: vpcIds },
          { Name: 'status', Values: ['in-use'] },
          { Name: 'interface-type', Values: ['lambda'] },
        ],
      };
      const { NetworkInterfaces = [] } = await ec2Client.describeNetworkInterfaces(params).promise();
      NetworkInterfaces.forEach(({ VpcId }) => {
        if (VpcId) {
          if (vpcCounts[VpcId]) {
            vpcCounts[VpcId]++;
          } else {
            vpcCounts[VpcId] = 1;
          }
        }
      });

      Object.keys(vpcCounts).forEach((vpcId) => {
        const count = vpcCounts[vpcId];
        results.push({
          region,
          vpcId,
          count,
        });
      });
    }

    const cloudwatch = new AWS.CloudWatch();
    results.forEach((result) => {
      const dimensions = [
        // We use AwsRegion instead of Region because Datadog mixes the region label we send with the region where the metric is stored.
        { Name: 'AwsRegion', Value: result.region },
        { Name: 'VpcId', Value: result.vpcId },
      ];
      const metricData = [
        {
          MetricName: 'NetworkInterfaceCount',
          Dimensions: dimensions,
          Unit: 'Count',
          Value: result.count,
        },
      ];
      const params = {
        Namespace: cwNamespace,
        MetricData: metricData,
      };
      cloudwatch.putMetricData(params, (err) => {
        if (err) {
          throw err;
        } else {
          console.log(`Successfully pushed metric data to namespace ${cwNamespace} - ${metricData}`);
        }
      });
    });
    if (results.length === 0) {
      console.log('No results to publish');
    } else {
      console.log('Successfully pushed metric data');
    }
    return results;
  } catch (error) {
    console.error('Error publishing metric data for region');
    throw error;
  }
};
