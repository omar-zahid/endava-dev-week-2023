import { connect, ErrorCode, JSONCodec, ServiceErrorHeader } from "nats";

import * as fs from "fs";
import path from "path";

const name = "Omar Zahid Bin Zahed Nasem";
const company = "Endava Malaysia";

async function main() {
  const nc = await connect();
  const jc = JSONCodec();

  try {
    const msg = await nc.request(
      "generate.badge",
      jc.encode({ name, company }),
      {
        timeout: 30 * 1000,
      }
    );

    if (msg.headers?.get("NATS-Error")) {
      console.log(
        `error processing your request: ${msg.headers.get("NATS-Error")}`
      );
      return 1;
    }

    const fp = path.join("temp", `${Date.now()}.pdf`);
    fs.writeFileSync(fp, msg.data);
    console.log(`wrote badge to ./${fp}`);
    return 0;
  } catch (err: any) {
    if (err.code === ErrorCode.NoResponders) {
      console.log("sorry no generator-service was found");
    } else {
      console.log(`error: ${err.message}`);
    }
    return 1;
  }
}

main();
