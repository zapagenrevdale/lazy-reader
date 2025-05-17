
const bus = new sst.aws.Bus("UploadBus");

bus.subscribe("UploadBusSubscriber", {
  handler: "src/functions/upload.handler",
  timeout: "60 seconds",
});
