import yaml from 'js-yaml';
import fs from 'fs';

const env = process.env.ENV || 'local';

/**
 * Add env vars (declared on the yml file from this folder) to process.env.
 */
export default function loadEnvVars() {
  const doc = yaml.safeLoad(fs.readFileSync(`./config/${env}.yml`));
  process.env = {...doc, ...process.env};
}
