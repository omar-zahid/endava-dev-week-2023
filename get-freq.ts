import { connect, Empty, ErrorCode, JSONCodec } from "nats";

async function main() {
  const nc = await connect();

  try {
    const msg = await nc.request("badge.freq", Empty, { timeout: 30 * 1000 });

    if (msg.headers?.get("NATS-Error")) {
      console.log(
        `error processing your request: ${msg.headers.get("NATS-Error")}`
      );
      return 1;
    }

    const jc = JSONCodec();
    const m = jc.decode(msg.data) as any;
    if (Object.keys(m).length) {
      console.table(m);
    } else {
      console.log("no badge generation requests seen");
    }
    return 0;
  } catch (err: any) {
    if (err.code === ErrorCode.NoResponders) {
      console.log("sorry no frequency-service services were found");
    } else {
      console.log(`error: ${err.message}`);
    }
    return 1;
  }
}

main();
