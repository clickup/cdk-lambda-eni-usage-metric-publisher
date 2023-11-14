// This is a dummy lambda function that is used by the integration tests.
// The AWS Lambda resource is managed from test/integ.lambda-eni-usage-metric-publisher.ts
export const handler = async () => {
  console.log('Dummy logs for integ-runner');
  return {
    statusCode: 200,
  };
};
