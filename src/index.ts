import unified from 'unified';
import parse from 'remark-parse';
import stringify from 'remark-stringify';
import { Node } from 'unist';
import { VFile } from 'vfile';
import translate from '@vitalets/google-translate-api';

interface Options {
  from: string;
  to: string;
}

export function translator(options: Options) {
  return transformer;

  function transformer(tree: Node, file: VFile): Promise<void> {
    if (tree.type === 'text' && typeof tree.value === 'string') {
      return translate(tree.value, options)
        .then(res => {
          tree.value = res.text;
        })
        .catch(e => {
          console.error(e);
        });
    }
    const children = tree.children as Node[] | undefined;
    if (children) {
      return children
        .map(node => transformer(node, file))
        .reduce((p, f) => p.then(() => f), Promise.resolve());
    }
    return Promise.resolve();
  }
}

export function mdtrans(md: string, options: Options): Promise<string> {
  return unified()
    .use(parse, { footnotes: true })
    .use(translator, options)
    .use(stringify)
    .process(md)
    .then((vfile) => vfile.contents as string);
}
