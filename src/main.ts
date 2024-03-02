import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

interface FunctionNode {
  name: string;
  start: {
    line: number;
    column: number;
    index: number;
  };
  end: {
    line: number;
    column: number;
    index: number;
  }
}

// 业务逻辑
export function getFunctionNode(code: string, index: number): FunctionNode|undefined {
  const ast = parse(code);
  // console.log('ast----->', ast);
  let functionNode;
  traverse(ast, {
    FunctionDeclaration(path) {
      const node = path.node;
      console.log('path.node----->', node);
      // 获取光标所在的函数信息
      if(index >= node.start! && index <= node.end!) {
        functionNode = {
          name: node?.id?.name,
          start: node?.loc?.start,
          end: node?.loc?.end,
      };
      }
    }
  });

  return functionNode;
};