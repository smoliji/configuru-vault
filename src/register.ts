import { spawnSync } from 'child_process';
import path from 'path';
import { log, populateEnvWithSecrets } from './lib';

const node = process.argv0;

const result = spawnSync(node, [path.join(__dirname, 'lib', 'printConfiguration')], { stdio: [null, null, 'inherit'] });

if (result.error) {
    log(result.error.stack!);
} else {
    const secret = JSON.parse(result.stdout.toString());
    populateEnvWithSecrets(secret);
}
