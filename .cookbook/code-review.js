/**
 * Data provider for code-review cookbook
 * This script generates context data for the Handlebars template
 */

const vscode = require('vscode');

async function getData() {
  const activeEditor = vscode.window.activeTextEditor;
  
  if (!activeEditor) {
    return {
      fileName: 'No file open',
      language: 'unknown',
      fileContent: '',
      linesOfCode: 0,
      projectType: 'Unknown',
      date: new Date().toLocaleDateString()
    };
  }

  const document = activeEditor.document;
  const content = document.getText();
  const lines = content.split('\n').length;
  
  // Try to detect project type from workspace
  const workspaceFolders = vscode.workspace.workspaceFolders;
  let projectType = 'Unknown';
  
  if (workspaceFolders && workspaceFolders.length > 0) {
    const workspacePath = workspaceFolders[0].uri.fsPath;
    const fs = require('fs');
    const path = require('path');
    
    // Check for common project files
    if (fs.existsSync(path.join(workspacePath, 'package.json'))) {
      projectType = 'Node.js/JavaScript';
    } else if (fs.existsSync(path.join(workspacePath, 'requirements.txt')) || 
               fs.existsSync(path.join(workspacePath, 'setup.py'))) {
      projectType = 'Python';
    } else if (fs.existsSync(path.join(workspacePath, 'pom.xml'))) {
      projectType = 'Java/Maven';
    } else if (fs.existsSync(path.join(workspacePath, 'Cargo.toml'))) {
      projectType = 'Rust';
    } else if (fs.existsSync(path.join(workspacePath, 'go.mod'))) {
      projectType = 'Go';
    }
  }

  return {
    fileName: document.fileName,
    language: document.languageId,
    fileContent: content,
    linesOfCode: lines,
    projectType: projectType,
    date: new Date().toLocaleDateString()
  };
}

// Export for ES modules
module.exports = { getData };
