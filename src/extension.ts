import * as vscode from 'vscode';
import { getFunctionNode } from './main';

// activate会在package.json中activationEvents中的命令触发时调用
export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand('vscode-extension-delete-function.helloWorld', () => {
		// 调用Message
		vscode.window.showInformationMessage('Hello World from vscode-extension-delete-function!!');
		// 删除字符
		const editor = vscode.window.activeTextEditor;

		if(!editor) {
			return;
		}

		// 小步骤开发思想(数据先写死 先注重写业务逻辑 写完后再用真实数据进行调试)

		// 获取代码
		const code = editor.document.getText();
		// 获取光标索引
		const index = editor.document.offsetAt(editor.selection.active);
		// 行列数据
		const functionNode = getFunctionNode(code, index);

		if (!functionNode) {
			return;
		}

		editor?.edit((editBuilder) => {
			// 删除的范围
			// editBuilder.delete(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(2, 1)));
			editBuilder.delete(new vscode.Range(
				new vscode.Position(functionNode.start.line - 1, functionNode.start.column),
				new vscode.Position(functionNode.end.line - 1, functionNode.end.column)));
		});
	});
}

export function deactivate() {}
