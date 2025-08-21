// app/api/trigger/route.ts
export async function POST(req: Request) {
  const body = await req.json(); // parse JSON body

  const { serverName, diskSize, operatingSystem } = body as {
    serverName: string;
    diskSize: number;
    operatingSystem: string;
  };

  // Example: log form data (later you can trigger your pipeline here)
  console.log("Received:", serverName, diskSize, operatingSystem);

  return new Response(JSON.stringify({ success: true, url: `${serverName} deployed with ${diskSize}GB of disk` }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
