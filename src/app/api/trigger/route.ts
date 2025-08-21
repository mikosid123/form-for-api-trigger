// app/api/trigger/route.ts
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { serverName, diskSize } = body as {
      serverName: string;
      diskSize: number;
    };

    console.log("Received:", serverName, diskSize);

    // GitLab trigger info
    const GITLAB_TRIGGER_URL = "https://gitlab.com/api/v4/projects/<PROJECT_ID>/trigger/pipeline";
    const GITLAB_TRIGGER_TOKEN = process.env.GITLAB_TRIGGER_TOKEN; // store securely in .env.local

    // Prepare the POST payload
    const payload = {
      token: GITLAB_TRIGGER_TOKEN,
      ref: "main", // or whichever branch you want to trigger
      variables: {
        SERVER_NAME: serverName,
        DISK_SIZE: diskSize.toString(),
      },
    };

    // Send request to GitLab
    const gitlabRes = await fetch(GITLAB_TRIGGER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!gitlabRes.ok) {
      const errText = await gitlabRes.text();
      console.error("GitLab error:", errText);
      return new Response(JSON.stringify({ success: false, error: errText }), {
        status: gitlabRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await gitlabRes.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: `${serverName} deployment triggered with ${diskSize}GB disk`,
        gitlab: data,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
