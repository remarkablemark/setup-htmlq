# setup-htmlq

[![version](https://badgen.net/github/release/remarkablemark/setup-htmlq)](https://github.com/remarkablemark/setup-htmlq/releases)
[![build](https://github.com/remarkablemark/setup-htmlq/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/setup-htmlq/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/remarkablemark/setup-htmlq/branch/master/graph/badge.svg?token=GQ7Q6LAWGV)](https://codecov.io/gh/remarkablemark/setup-htmlq)

:gear: Set up your GitHub Actions workflow with [htmlq](https://github.com/mgdm/htmlq). See [demo](https://github.com/remarkablemark/setup-htmlq-demo).

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
