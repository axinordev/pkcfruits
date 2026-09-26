import config from "@payload-config";
import { getPayload } from "payload";

import { seedSite } from "./seed-site";

const payload = await getPayload({ config });
const result = await seedSite(payload);
console.log(result.message);
process.exit(0);
