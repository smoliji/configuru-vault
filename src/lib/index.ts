import url from 'url';
import { debuglog } from 'util';
import Vault from './Vault';

export const log = debuglog('configuru-vault');

const CFG_VAULT_PATH = String(process.env.CFG_VAULT_PATH || '');
const CFG_VAULT_USERPASS = String(process.env.CFG_VAULT_USERPASS || '');

export const getVault = (vaultUrl: string) => {
    const u = new url.URL(vaultUrl);
    u.pathname = '';
    const vault = new Vault(u.toString());
    return vault;
};

export const authenticateVault = async (vault: Vault) => {
    if (!CFG_VAULT_USERPASS) {
        log('No credentials in CFG_VAULT_USERPASS. Will attempt to access Vault without authentication.');
        return;
    }
    const [username, password] = Buffer.from(CFG_VAULT_USERPASS, 'base64')
        .toString()
        .split(':');
    await vault.loginUsername(username, password);
};

export const getVaultSecretPath = (vaultUrl: string) => {
    // This accepts VaultUI Url, but API resides elsewhere.
    // WebUri: https://vault-example.com/ui/vault/secrets/secret/show/{secret-path}
    // ApiUri: https://vault-example.com/v1/secret/data/{secret-path}
    const u = new url.URL(vaultUrl);
    const pathname = u.pathname.replace('ui/vault/secrets/secret/show', 'v1/secret/data');
    return pathname;
};

export const populateEnvWithSecrets = (secret: Record<string, string>) => {
    for (const property in secret) {
        if (!secret.hasOwnProperty(property)) {
            continue;
        }
        if (process.env[property] === undefined) {
            process.env[property] = secret[property];
        }
    }
};

export default async function main() {
    if (!CFG_VAULT_PATH) {
        log("No CFG_VAULT_PATH. Won't query Vault.");
        return;
    }
    const vault = getVault(CFG_VAULT_PATH);
    await authenticateVault(vault);
    const secret = await vault.getSecret(getVaultSecretPath(CFG_VAULT_PATH));
    return secret;
}
