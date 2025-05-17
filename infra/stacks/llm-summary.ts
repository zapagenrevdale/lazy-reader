
export async function handler(event: any) {
  console.log("Event received:", event);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from surigao!" }),
  };
}
