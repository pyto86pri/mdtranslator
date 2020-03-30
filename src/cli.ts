import { readFile } from 'fs';
import p from 'pify';
import meow, { AnyFlags, StringFlag } from 'meow';
import { mdtrans } from './';

const usage = `
  Usage
    $ mdtrans <input>
  Options
    --from LANG    set the source language
    --to   LANG    set the translation target language
  Example
    $ mdtrans foo.md --from=ja --to=ja > foo.ja.md
`;
const options: meow.Options<AnyFlags> = {
  flags: {
    from: {
      type: 'string',
      alias: 'f',
      default: 'ja',
    },
    to: {
      type: 'string',
      alias: 'to',
      default: 'en',
    },
  },
};
const cli = meow(usage);

if (!cli.input[0]) {
  cli.showHelp(-1);
}

p(readFile)(cli.input[0], 'utf8')
  .then((md: string) =>
    mdtrans(md, { from: cli.flags.from as string, to: cli.flags.to as string })
  )
  .then((data: string) => console.log(data))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
