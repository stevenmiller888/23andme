# 23andme

[![CircleCI](https://circleci.com/gh/stevenmiller888/23andme.svg?style=svg)](https://circleci.com/gh/stevenmiller888/23andme)

A JavaScript client for communicating with the [23andMe](https://api.23andme.com) API.

## Example

```js
import Client from '23-and-me'
const client = new Client('ACCESS_TOKEN')
const accounts = await client.getAccounts()
```

## API

Please refer to the official 23andme API reference [documentation](https://api.23andme.com/docs/reference).

### Client(accessToken)

Create a new instance of the 23andMe client.

The required parameter is:

- `accessToken`: The [access token](https://api.23andme.com/docs/authentication) used to call API endpoints.

## Releasing / Publishing

CircleCI will handle publishing to npm. To cut a new release, just do:

```
$ git changelog --tag <version>
$ vim package.json # enter <version>
$ git release <version>
```

Where `<version>` follows the [semver](http://semver.org/) spec.

## License

[MIT](https://tldrlegal.com/license/mit-license)

---

> [stevenmiller888.github.io](https://stevenmiller888.github.io) &nbsp;&middot;&nbsp;
> GitHub [@stevenmiller888](https://github.com/stevenmiller888) &nbsp;&middot;&nbsp;
> Twitter [@stevenmiller888](https://twitter.com/stevenmiller888)
