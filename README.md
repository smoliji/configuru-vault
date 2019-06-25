# configuru-vault

###### Based on this [template](https://github.com/AckeeCZ/package-template/tree/4e5a2152c9235d9d7efe969024dde2c3ff6f26e5)

<div align="center">

<span style="font-size: 5em">🛅</span>

[![Build Status](https://img.shields.io/travis/com/AckeeCZ/configuru-vault/master.svg?style=flat-square)](https://travis-ci.com/AckeeCZ/configuru-vault)
[![Coverage](https://img.shields.io/codeclimate/coverage/AckeeCZ/configuru-vault.svg?style=flat-square)](https://codeclimate.com/github/AckeeCZ/configuru-vault)
[![Maintainability](https://img.shields.io/codeclimate/maintainability/AckeeCZ/configuru-vault.svg?style=flat-square)](https://codeclimate.com/github/AckeeCZ/configuru-vault)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/AckeeCZ/configuru-vault.svg?style=flat-square)](https://snyk.io/test/github/AckeeCZ/configuru-vault?targetFile=package.json)
[![Dependency Status](https://img.shields.io/david/AckeeCZ/configuru-vault.svg?style=flat-square)](https://david-dm.org/AckeeCZ/configuru-vault)
[![Dev Dependency Status](https://img.shields.io/david/dev/AckeeCZ/configuru-vault.svg?style=flat-square)](https://david-dm.org/AckeeCZ/configuru-vault?type=dev)

Let your environment fill with vault secrets.
</div>


## Usage

1. Fetch your Vault secret URL from the UI
1. Set it as CFG_VAULT_PATH
    ```
    CFG_VAULT_PATH=https://example-vault.com/ui/vault/secrets/secret/show/path/to/the/secret
    ```
    Only Vault K/V Storage is now supported.
1. Set authentication.
    ```
    CFG_VAULT_USERPASS={your base64 encoded `username:password`}
    ```
    Only userpass is now supported.
1. Run your node with [-r](https://nodejs.org/api/cli.html#cli_r_require_module)

    ```node -r configuru-vault/register my_app.js```


## How it works

TBD.

## License

This project is licensed under [MIT](./LICENSE).
