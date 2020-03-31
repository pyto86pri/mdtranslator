# mdtranslator
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://fand.mit-license.org/)

> Markdown file translator.

`mdtranslator` suports;

- **all** markdown syntax defined in [mdast](https://github.com/syntax-tree/mdast).
- **all** languages defined in [here](https://github.com/matheuss/google-translate-api/blob/master/languages.js).

## Install

```shell
$ npm i -g mdtranslator
```

## Usage

```shell
$ mdtranslator --from en --to ja en.md > ja.md
$ mdtranslator --help
Usage: mdtranslator [options]

Options:
  --from <lang>  set the source language (default: "ja")
  --to <lang>    set the translation target language (default: "en")
  -h, --help     display help for command
```

## Acknowledgements

- It's depending on Google Translate and Google Translate has request limits.

### LICENSE
MIT

### TODO

- To translate code comments.