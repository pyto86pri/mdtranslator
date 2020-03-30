import { readFile } from 'fs';
import p from 'pify';
import { mdtrans } from './';
import { program } from 'commander';

program
  .option('--from <lang>', 'set the source language', 'ja')
  .option('--to <lang>', 'set the translation target language', 'en')

program.parse(process.argv)

if (!program.args[0]) {
  console.log(program.helpInformation());
  process.exit(1);
}

p(readFile)(program.args[0] as string, 'utf8')
  .then((md: string) =>
    mdtrans(md, { from: program.from as string, to: program.to as string })
  )
  .then((data: string) => console.log(data))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
