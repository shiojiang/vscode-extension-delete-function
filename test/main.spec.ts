import { test, expect } from 'vitest';
// expect：断言

import { getFunctionNode } from '../src/main';

test('init', () => {
  // expect(true).toBe(true);
  // expect(true).toBe(false);

  // 现在需要看ast语法树
  // 第一种做法是每次执行f5、输入指令输出打印的结果(繁琐)
  // 第二种做法是在单元测试中输出(推荐)
  const index = 12;
  const code = `
  function testFunction1(){
    console.log("This is testFunction1");
  }
  function testFunction2(){
    console.log("This is testFunction2");
  }
  `;

  const functionNode = getFunctionNode(code, index);

  // 测试驱动开发(以终为始的思想)
  // 将ast解析的结果输出成自己需要的结构
  expect(functionNode).toEqual({
    name: 'testFunction1',
    start: { line: 2, column: 2, index: 3 },
    end: { line: 4, column: 3, index: 74 },
  });
});