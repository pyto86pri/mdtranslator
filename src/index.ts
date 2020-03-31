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
    const queue = (tree_: Node, file_: VFile): Promise<void>[] => {
      if (tree_.type === 'text' && typeof tree_.value === 'string') {
        return [translate(tree_.value as string, options)
          .then((res): void => {
            tree_.value = res.text;
          })
          .catch((e): void => {
            console.error(e);
          })];
      }
      const children = tree_.children as Node[] | undefined;
      if (children) {
        return children
          .flatMap((node) => queue(node, file_))
      }
      return [];
    }
    return Promise.all(queue(tree, file)).then(() => {});
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
