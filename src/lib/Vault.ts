import request from 'got';
import * as url from 'url';
import { log } from '.';

export default class Vault {
    // /auth key from login response
    // @see {@link https://www.vaultproject.io/api/auth/userpass/index.html#login}
    protected session?: {
        client_token: string;
        metadata: {
            username: string;
        };
    };
    constructor(protected url: string) {
        log(`Initializing Vault proxy for ${url}`);
    }
    async loginUsername(username: string, password: string) {
        log(`Loging into Vault as \`${username}\``);
        try {
            const uri = url.resolve(this.url, `/v1/auth/userpass/login/${username}`);
            const { body, statusCode } = await request(uri, {
                method: 'post',
                body: { username: String(username), password: String(password) },
                json: true,
            });
            if (statusCode !== 200) {
                log(`Received not OK status. ${JSON.stringify(body, null, 2)}`);
                throw new Error(`Received HTTP#${statusCode}`);
            }
            this.session = body.auth;
            log(`Authenticated with Vault for ${username}. Received ${JSON.stringify(body, null, 2)}`);
        } catch (error) {
            log(`Vault login failed: ${error.stack}`);
            throw new Error(`Vault login failed. ${error.message}`);
        }
    }
    async getSecret(path: string) {
        log(`Getting Vault secret at \`${path}\` with X-Vault-Token=${this.session && this.session.client_token}`);
        try {
            const uri = url.resolve(this.url, path);
            const { body, statusCode } = await request(uri, {
                method: 'get',
                headers: {
                    'X-Vault-Token': this.session && this.session.client_token,
                },
                json: true,
            });
            if (statusCode !== 200) {
                log(`Received not OK status. ${JSON.stringify(body, null, 2)}`);
                throw new Error(`Received HTTP#${statusCode}`);
            }
            log(`Secret \`${path}\` obtained successfully.`);
            return body.data.data;
        } catch (error) {
            log(`Failed to obtain Secret from Vault: ${error.stack}`);
            throw new Error(`Vault getSecret failed. ${error.message}`);
        }
    }
}
