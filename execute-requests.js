import dns from "node:dns";
import { setTimeout } from "timers/promises";
dns.setDefaultResultOrder("ipv4first");

async function executeCall(thirdPartyId) {
  const response = await fetch(
    `http://localhost:3000`,
    {
      method: "GET",
    }
  );

  const parsedResponse = await response.json();
  if (response.status !== 200) {
    throw new Error(
      `Request failed. Response: ${JSON.stringify(parsedResponse)}`
    );
  }

  return parsedResponse;
}

async function run() {
  for (let i = 0; i < 2000; i++) {
    console.log(i);
    await executeCall(thirdPartyId);
    await setTimeout(1000);
  }
}

run()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
