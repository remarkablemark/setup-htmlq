# setup-htmlq

[![build](https://github.com/remarkablemark/setup-htmlq/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/setup-htmlq/actions/workflows/build.yml)

Set up your GitHub Actions workflow with [htmlq](https://github.com/mgdm/htmlq).

## Usage

See [action.yml](action.yml)

**Basic:**

```yaml
steps:
  - uses: remarkablemark/setup-htmlq@v1
```

## Inputs

### `htmlq-version`

**Optional**: The htmlq [version](https://github.com/mgdm/htmlq/releases). Defaults to [`0.4.0`](https://github.com/mgdm/htmlq/releases/tag/v0.4.0):

```yaml
- uses: remarkablemark/setup-htmlq@v1
  with:
    htmlq-version: 0.4.0
```

## Contributions

Contributions are welcome!

## License

[MIT](LICENSE)
