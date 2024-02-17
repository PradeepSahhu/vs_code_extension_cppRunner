// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
const simpleGit = require('simple-git');
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

async function executeCommand(fileName) {
    const editor = vscode.window.activeTextEditor;
    const outputChannel = vscode.window.createOutputChannel('My Extension Output');
    const fileWithoutExtension = await removeExtensionFromFilePath(fileName);
    const commandToExecute = `g++ -std=c++11 ${fileName} -o ${fileWithoutExtension}`;

    // Append a message to the output channel
    outputChannel.appendLine("Developed By Pradeep Sahu");
    outputChannel.appendLine("Link : https://www.linkedin.com/in/pradeep-sahu-759720224/")

    console.log(fileName);

    // Execute the command
    try {
        const { stdout, stderr } = await new Promise((resolve, reject) => {
            exec(commandToExecute, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing command: ${error.message}`);
                    reject(error);
                } else {
                    console.log(`Command stdout: ${stdout}`);
                    console.error(`Command stderr: ${stderr}`);
                    resolve({ stdout, stderr });
                }
            });
        });

        // Check if there's any stderr
        if (stderr) {
            console.error(`Command stderr: ${stderr}`);
            return;
        }

        // If successful, run the file
        runFile(fileName);
    } catch (error) {
        console.error(`Error executing command: ${error.message}`);
    }
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

async function executeCommandInTerminal(command) {
    try {
        // Check if a terminal with the name 'MyExtensionTerminal' exists
        let terminal = vscode.window.terminals.find(term => term.name === 'TerminalSahu');

        // If no terminal exists, create a new one
        if (!terminal) {
            terminal = vscode.window.createTerminal('TerminalSahu');
        }

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
            // outputChannel.show();
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

    });

    let other = vscode.commands.registerCommand('c-c---code-runner-for-mac.c_c++CodeCopy',async function(){
        await copyFile();

    //     const editor = vscode.window.activeTextEditor;
    //     const document = editor.document;
    //     const currentFilePath = document.uri.fsPath;

    // // Read the content of the current file
    //     const fileContent = fs.readFile(currentFilePath, 'utf-8');

    //     const newFileName = await vscode.window.showInputBox({
    //         prompt: 'Enter the new file name (without extension)',
    //         value: 'newFile',
    //     });

    //     if (newFileName) {
    //         // Derive the new file path
    //         const newFilePath = currentFilePath.replace(document.fileName, newFileName);

    //         // Write the content to the new file
    //         fs.writeFile(newFilePath, fileContent, 'utf-8');

    //         // Open the new file
    //         const doc = vscode.workspace.openTextDocument(newFilePath);
    //         vscode.window.showTextDocument(doc);
    //     }

        

    });

    let gits = vscode.commands.registerCommand('c-c---code-runner-for-mac.c_c++GitIt',async function(){

        commitToGitHub();
        
    });
   

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

async function copyFile(){

    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        const currentFilePath = document.uri.fsPath;

        var filedata;
    // Read the content of the current file
        const fileContent = fs.readFile(currentFilePath, 'utf-8',(err, fileContent) => {
            if (err) {
                console.error(`Error reading file: ${err.message}`);
            } else {
                // Handle fileContent here
                console.log('File content:', fileContent);
                filedata = fileContent;
                // return fileContent;
                
            }
        });

        console.log(fileContent);

        const newFileName = await vscode.window.showInputBox({
            prompt: 'Enter the new file name (without extension)',
            value: '',
        });

        if (newFileName) {
            // Derive the new file path
            // const newFilePath = currentFilePath.replace(document.fileName, newFileName);
            const newFilePath = path.join(path.dirname(currentFilePath), newFileName);

            // Write the content to the new file
            fs.writeFile(newFilePath, filedata, 'utf-8',(err)=>{
                if(err){
                    console.error("Error")
                }else{
                    console.log("File written");
                }
            });

            // Open the new file
            const doc = vscode.workspace.openTextDocument(newFilePath);
            vscode.window.showTextDocument(doc);
        }
    } else {
        vscode.window.showWarningMessage('No active text editor.');
    }

    


}


//! Commiting to Github Function.
async function commitToGitHub() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage('No workspace opened.');
        return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;

    const git = simpleGit(rootPath);

    // Check if Git is initialized
    const isGitInitialized = await git.checkIsRepo();
    if (!isGitInitialized) {
        // If not initialized, initialize Git
        await git.init();

        vscode.window.showInformationMessage('Git repository initialized.');
    }

    // Check if there's a remote repository
    const remotes = await git.getRemotes(true);
    const remoteExists = remotes.some(remote => remote.name === 'origin');

    if (!remoteExists) {
        // Prompt user to enter repository URL
        const repositoryUrl = await vscode.window.showInputBox({
            prompt: 'Enter the URL of the remote repository:'
        });

        if (!repositoryUrl) {
            return; // User canceled input
        }

        // Add the remote repository
        await git.addRemote('origin', repositoryUrl);

        vscode.window.showInformationMessage('Remote repository added.');
    }

    // Ask for commit message
    const commitMessage = await vscode.window.showInputBox({
        prompt: 'Enter the commit message:'
    });

    if (!commitMessage) {
        return; // User canceled input
    }

    // Commit changes
    await git.add('./*');
    await git.commit(commitMessage);

    // Push to the remote repository
    await git.push(['-u', 'origin', 'master']);

    vscode.window.showInformationMessage('Changes committed and pushed to GitHub.');
}


async function createNewFile(filePath, content) {
    try {
        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`File created successfully at: ${filePath}`);
    } catch (err) {
        throw new Error(`Error creating file: ${err.message}`);
    }
}



module.exports = {
	activate,
	deactivate
}
