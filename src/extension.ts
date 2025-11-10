import * as vscode from 'vscode';
import * as path from 'path';
import * as Handlebars from 'handlebars';

export function activate(context: vscode.ExtensionContext) {
  console.log('Open Cookbook extension is now active');

  // Register the cookbook chat participant
  const participant = vscode.chat.createChatParticipant(
    'open-cookbook.cookbook',
    async (
      request: vscode.ChatRequest,
      context: vscode.ChatContext,
      stream: vscode.ChatResponseStream,
      _token: vscode.CancellationToken
    ) => {
      try {
        // Get the cookbook name from the request
        const cookbookName = request.prompt.trim();
        
        if (!cookbookName) {
          stream.markdown('Please provide a cookbook name. Example: `/cookbook my-template`\n');
          return { metadata: { command: '' } };
        }

        // Show progress indicator
        stream.progress('Looking for cookbook...');

        // Find workspace folders
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
          stream.markdown('❌ No workspace folder found. Please open a workspace.\n');
          return { metadata: { command: '' } };
        }

        // Look for .cookbook folder in workspace
        const cookbookFolder = path.join(workspaceFolders[0].uri.fsPath, '.cookbook');
        
        // Check if .cookbook folder exists
        try {
          await vscode.workspace.fs.stat(vscode.Uri.file(cookbookFolder));
        } catch {
          stream.markdown('❌ No `.cookbook` folder found in workspace. Please create one with your templates.\n');
          stream.markdown('\n**Quick Start:**\n');
          stream.markdown('1. Create a `.cookbook` folder in your workspace root\n');
          stream.markdown('2. Add `.md` files with Handlebars templates\n');
          stream.markdown('3. Optionally add matching `.js` or `.ts` files to generate template data\n');
          return { metadata: { command: '' } };
        }

        // Find the markdown template file
        const possibleExtensions = ['.md', '.markdown'];
        let templateUri: vscode.Uri | null = null;

        for (const ext of possibleExtensions) {
          const testUri = vscode.Uri.file(path.join(cookbookFolder, cookbookName + ext));
          try {
            await vscode.workspace.fs.stat(testUri);
            templateUri = testUri;
            break;
          } catch {
            // File doesn't exist, try next extension
          }
        }

        if (!templateUri) {
          stream.markdown(`❌ Cookbook template \`${cookbookName}.md\` not found in \`.cookbook\` folder.\n`);
          
          // List available cookbooks
          const cookbookFiles = await vscode.workspace.fs.readDirectory(vscode.Uri.file(cookbookFolder));
          const mdFiles = cookbookFiles
            .filter(([name, type]) => type === vscode.FileType.File && (name.endsWith('.md') || name.endsWith('.markdown')))
            .map(([name]) => name.replace(/\.(md|markdown)$/, ''));
          
          if (mdFiles.length > 0) {
            stream.markdown('\n**Available cookbooks:**\n');
            mdFiles.forEach(file => {
              stream.markdown(`- ${file}\n`);
            });
          }
          
          return { metadata: { command: '' } };
        }

        stream.progress('Reading template...');

        // Read the markdown template
        const templateBytes = await vscode.workspace.fs.readFile(templateUri);
        const templateContent = new TextDecoder().decode(templateBytes);

        stream.progress('Executing data provider...');

        // Look for matching .js or .ts file to generate data
        const dataProviderExtensions = ['.js', '.ts'];
        let templateData: any = {};

        for (const ext of dataProviderExtensions) {
          const dataProviderUri = vscode.Uri.file(path.join(cookbookFolder, cookbookName + ext));
          try {
            await vscode.workspace.fs.stat(dataProviderUri);
            
            // Execute the data provider
            stream.progress(`Running ${cookbookName}${ext}...`);
            templateData = await executeDataProvider(dataProviderUri, stream);
            break;
          } catch {
            // No data provider file, use default context
          }
        }

        // If no custom data provider, use default context
        if (Object.keys(templateData).length === 0) {
          templateData = getDefaultContext();
        }

        stream.progress('Processing template...');

        // Compile and execute the Handlebars template
        const template = Handlebars.compile(templateContent);
        const processedContent = template(templateData);

        // Display the final query
        stream.markdown('\n---\n\n');
        stream.markdown('**📋 Generated Context from Cookbook:**\n\n');
        stream.markdown('```\n' + processedContent + '\n```\n');
        stream.markdown('\n---\n\n');
        stream.markdown('✅ Context ready! The LLM will now process this information.\n');

        return { metadata: { command: cookbookName } };

      } catch (error) {
        stream.markdown(`❌ Error: ${error instanceof Error ? error.message : String(error)}\n`);
        return { metadata: { command: '' } };
      }
    }
  );

  // Set up the participant
  participant.iconPath = vscode.Uri.file(
    path.join(context.extensionPath, 'icon.png')
  );

  context.subscriptions.push(participant);
}

/**
 * Execute a data provider script (JS or TS file)
 */
async function executeDataProvider(
  dataProviderUri: vscode.Uri,
  stream: vscode.ChatResponseStream
): Promise<any> {
  const terminal = vscode.window.createTerminal({
    name: 'Cookbook Data Provider',
    hideFromUser: true
  });

  try {
    // For TypeScript files, we need to use ts-node or compile first
    // For JavaScript files, we can execute directly
    const isTypeScript = dataProviderUri.fsPath.endsWith('.ts');

    if (isTypeScript) {
      stream.progress('Compiling TypeScript...');
    }

    // Create a temporary execution script
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
      throw new Error('No workspace folder available');
    }

    // Use Node.js to execute the script and capture JSON output
    const scriptPath = dataProviderUri.fsPath;

    // For simplicity, we'll execute JavaScript directly
    // For TypeScript, users should either use .js or set up ts-node
    if (isTypeScript) {
      throw new Error(
        'TypeScript data providers are not yet supported. Please use JavaScript (.js) or compile your TypeScript to JavaScript first.'
      );
    }

    // Execute the script using child_process would be better, but for VS Code extension
    // we'll use a simpler approach - require the module if it exports data
    // This is a simplified implementation
    try {
      // Use dynamic import for ES modules or require for CommonJS
      const dataModule = await import(scriptPath);
      
      if (typeof dataModule.default === 'function') {
        return await dataModule.default();
      } else if (typeof dataModule.default === 'object') {
        return dataModule.default;
      } else if (typeof dataModule.getData === 'function') {
        return await dataModule.getData();
      } else {
        return dataModule;
      }
    } catch (err) {
      stream.markdown(`⚠️ Could not execute data provider: ${err instanceof Error ? err.message : String(err)}\n`);
      stream.markdown('Using default context instead.\n');
      return {};
    }

  } finally {
    terminal.dispose();
  }
}

/**
 * Get default context when no data provider is available
 */
function getDefaultContext(): any {
  const activeEditor = vscode.window.activeTextEditor;
  const workspaceFolders = vscode.workspace.workspaceFolders;

  return {
    // Active file information
    activeFileName: activeEditor?.document.fileName || 'No active file',
    activeFileContent: activeEditor?.document.getText() || '',
    selectedText: activeEditor?.document.getText(activeEditor.selection) || '',
    activeFileLanguage: activeEditor?.document.languageId || '',
    
    // Workspace information
    workspaceRoot: workspaceFolders?.[0]?.uri.fsPath || '',
    workspaceName: workspaceFolders?.[0]?.name || '',
    
    // Timestamp
    timestamp: new Date().toISOString(),
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  };
}

export function deactivate() {}
