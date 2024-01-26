// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */


function executeCommand(fileName){
    
    const editor = vscode.window.activeTextEditor;
	// const commandToExecute = `echo "Processing file: ${filename}"`;

    const outputChannel = vscode.window.createOutputChannel('My Extension Output');
    const fileWithoutExtension = removeExtensionFromFilePath(fileName);

    // const fileNameWithoutEx = getFilenameWithoutExtension(fileName);
	const commandToExecute = `g++ -std=c++11 ${fileName} -o ${fileWithoutExtension}`;

        // Append a message to the output channel
        outputChannel.appendLine("Developed By Pradeep Sahu");
        outputChannel.appendLine("Link : https://www.linkedin.com/in/pradeep-sahu-759720224/")
        // outputChannel.appendLine(path.dirname(fileWithoutExtension));
    // outputChannel.appendLine(fileName);
    // outputChannel.appendLine(path.dirname(fileName));

        // Show the output channel
      
        outputChannel.show();
        
   
    console.log(fileName);

    // const parsedPath = path.parse(fileName);
    // const fileNameWithoutEx = parsedPath.name;

	

    // return new Promise((resolve, reject) => {
    //     exec(commandToExecute, (error, stdout, stderr) => {
    //         if (error) {
    //             console.error(`Error executing command: ${error.message}`);
    //             reject(error);
    //         } else {
    //             console.log(`Command stdout: ${stdout}`);
    //             console.error(`Command stderr: ${stderr}`);
    //             resolve({ stdout, stderr });
    //         }
    //     });
    // });

    // Execute the command
    return new Promise((resolve, reject) => {
    exec(commandToExecute, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
            return;
        }
        runFile(fileName);
        console.log(`Command stdout: ${stdout}`);
    })});
}

function moveToDirectory(filePath){

    const uri = vscode.Uri.file(filePath);
    const commandToExecute = `cd "${uri.fsPath}"`;

    // const editor = vscode.window.activeTextEditor;

    // const fileName = path.basename(editor.document.fileName, path.extname(editor.document.fileName));
	// const commandToExecute = `cd ${filePath}/`;

    // Execute the command

    exec(commandToExecute, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
            return;
        }
        console.log(`Command stdout: ${stdout}`);
    });

    // executeCommand(fileName);

}

function removeExtensionFromFilePath(filePath) {
    const directory = path.dirname(filePath);
    const filenameWithoutExtension = path.basename(filePath, path.extname(filePath));
    const filePathWithoutExtension = path.join(directory, filenameWithoutExtension);
    return filePathWithoutExtension;
}

function checkForKeywordInFile(filePath, keyword) {
    try {
        // Read the content of the file
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Check if the keyword is present in the file content
        const isKeywordPresent = fileContent.includes(keyword);

        return isKeywordPresent;
    } catch (error) {
        vscode.window.showErrorMessage(`Error reading file: ${error.message}`);
        return false;
    }
}

function executeCommandInTerminal(command) {
    try {
        // Create a terminal
        const terminal = vscode.window.createTerminal();

        // Send the command to the terminal
        terminal.sendText(command);

        // Show and focus the terminal
        terminal.show();
    } catch (error) {
        vscode.window.showErrorMessage(`Error executing command: ${error.message}`);
    }
}

function runFile(fileName){
    
    const fileNameWithout = removeExtensionFromFilePath(fileName)
    const commandToExecute = ` ${fileNameWithout}`;
    executeCommandInTerminal(commandToExecute);
  
        
        const outputChannel = vscode.window.createOutputChannel('My Extension Output');

        // const terminal = vscode.window.createTerminal('My Terminal');
    
        // // Send the code to the terminal
        // terminal.sendText(commandToExecute);
    
        // // Show and focus the terminal
        // terminal.show();

   
        return new Promise((resolve, reject) => {
        exec(commandToExecute, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Command stderr: ${stderr}`);
                return;
            }
            
            outputChannel.appendLine("Developed by Pradeep Sahu");
            outputChannel.appendLine("Link: https://www.linkedin.com/in/pradeep-sahu-759720224/");
                // Show the output channel
            outputChannel.show();
        })});

   

}

function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "c-c---code-runner-for-mac" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('c-c---code-runner-for-mac.c_c++CodeRunner',function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user

		const editor = vscode.window.activeTextEditor;

        if (editor) {
            // Access information about the current file
			const document = editor.document;
            const fileName = editor.document.fileName;
            const languageId = editor.document.languageId;
			// getting the current file directory / folder.
			const filePath = path.dirname(document.fileName);

            // Display information in the VS Code output channel
			
			// execute command.
			//  moveToDirectory(fileName);
            
			// const fileName = path.basename(document.fileName, path.extname(document.fileName));
			executeCommand(fileName);

            

            // vscode.window.showInformationMessage(`Current File: ${fileName}, Language: ${languageId}`);
            vscode.window.showInformationMessage(`Current File: ${filePath}, Language: ${languageId}`);
        } else {
            vscode.window.showWarningMessage('No active text editor.');
        }
    });

    let another = vscode.commands.registerCommand('c-c---code-runner-for-mac.c_c++CodeDelete',function(){
        deleteCurrentFile();

    })

   

	// context.subscriptions.push(disposable);
}



function getFilenameWithoutExtension(filename) {
    // Use the path module to extract the filename without extension
    return path.parse(filename).name;
}



function deleteCurrentFile() {
    try {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            const filePath = document.uri.fsPath;

            // Delete the file
            fs.unlinkSync(filePath);

            // Close the editor
            vscode.commands.executeCommand('workbench.action.closeActiveEditor');
        } else {
            vscode.window.showWarningMessage('No active text editor.');
        }
    } catch (error) {
        vscode.window.showErrorMessage(`Error deleting file: ${error.message}`);
    }
}

// This method is called when your extension is deactivated
function deactivate() {}



module.exports = {
	activate,
	deactivate
}
