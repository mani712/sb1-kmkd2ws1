import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { Play, RotateCcw, Code2 } from 'lucide-react';

const defaultCode = `// Welcome to JavaScript Playground!
// Write your code here and click Run to execute

function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;

function App() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');

  const runCode = () => {
    try {
      // Create a new function from the code and execute it
      const originalConsoleLog = console.log;
      let output = '';
      
      console.log = (...args) => {
        output += args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ') + '\n';
      };

      // Execute the code
      new Function(code)();
      
      // Restore console.log
      console.log = originalConsoleLog;
      
      setOutput(output);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const resetCode = () => {
    setCode(defaultCode);
    setOutput('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <Code2 className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold">JavaScript Playground</h1>
            <p className="text-sm text-gray-400">Write, edit, and execute JavaScript code in real-time</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex">
        <div className="flex-1 flex flex-col border-r border-gray-800">
          <div className="px-4 py-2 border-b border-gray-800 flex items-center justify-between bg-gray-800/50">
            <h2 className="font-medium">Code Editor</h2>
            <div className="flex gap-2">
              <button
                onClick={resetCode}
                className="px-2 py-1 rounded text-sm bg-gray-700 hover:bg-gray-600 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                onClick={runCode}
                className="px-3 py-1 rounded text-sm bg-blue-600 hover:bg-blue-500 transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                Run
              </button>
            </div>
          </div>
          <div className="flex-1">
            <CodeMirror
              value={code}
              height="100%"
              theme={vscodeDark}
              extensions={[javascript({ jsx: true })]}
              onChange={(value) => setCode(value)}
              className="text-base h-full"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="px-4 py-2 border-b border-gray-800 bg-gray-800/50">
            <h2 className="font-medium">Output</h2>
          </div>
          <div className="flex-1 bg-gray-800/30 p-4 font-mono overflow-auto">
            <pre className="text-gray-300 whitespace-pre-wrap">{output || 'Output will appear here...'}</pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;