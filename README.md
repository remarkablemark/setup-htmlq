# setup-htmlq

[![version](https://img.shields.io/github/release/remarkablemark/setup-htmlq)](https://github.com/remarkablemark/setup-htmlq/releases)
[![build](https://github.com/remarkablemark/setup-htmlq/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/setup-htmlq/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/remarkablemark/setup-htmlq/branch/master/graph/badge.svg?token=GQ7Q6LAWGV)](https://codecov.io/gh/remarkablemark/setup-htmlq)

⚙️ Set up your GitHub Actions workflow with [htmlq](https://github.com/mgdm/htmlq).

## Quick Start

```yaml
name: htmlq
on: push
jobs:
  htmlq:
    runs-on: ubuntu-latest
    steps:
      - name: Setup htmlq
        uses: remarkablemark/setup-htmlq@v2
```

## Usage

**Basic:**

```yaml
- uses: remarkablemark/setup-htmlq@v2
```

See [action.yml](action.yml)

## Inputs

### `htmlq-version`

**Optional**: The htmlq [version](https://github.com/mgdm/htmlq/releases). Defaults to [`0.4.0`](https://github.com/mgdm/htmlq/releases/tag/v0.4.0):

```yaml
- uses: remarkablemark/setup-htmlq@v2
  with:
    htmlq-version: 0.4.0
```

### `cli-name`

**Optional**: The htmlq CLI name. Defaults to `htmlq`:

```yaml
- uses: remarkablemark/setup-htmlq@v2
  with:
    cli-name: htmlq
```

## Examples

- [setup-htmlq-demo](https://github.com/remarkablemark/setup-htmlq-demo)

## License

[MIT](LICENSE)
