import React, { useRef, useEffect, useState } from 'react';
import Editor, { useMonaco } from "@monaco-editor/react";

const AnimatedEditor = ({ colorMode }) => {
  const editorRef = useRef(null);
  const monaco = useMonaco();
  const [editorReady, setEditorReady] = useState(false);
  const [writing, setWriting] = useState(false);

  const script = [
    "#include <codeforces>\n",
    "#include <atcoder>\n",
    "#include <leetcode>\n",
    "#include \"1v1_duels.h\"\n",
    "\n",
    "\n",
    "int main() {\n",
    "\tCPDuels::Duel duel = CPDuels::createDuel();\n",
    "\tduel.setPlatform(\"codeforces\");\n",
    "\tduel.setProblemCount(5);\n",
    "\tduel.setTimeLimit(120);\n",
    "\tduel.setUsername(\"tourist\");\n",
    "\tduel.start();\n",
    "\n",
    "\twhile (duel.ongoing()) {\n",
    "\t\tduel.solveProblems();\n",
    "\t}\n",
    "\treturn 0;\n",
    "}"
  ];

  const handleEditorMounted = (editor) => {
    editorRef.current = editor;
    setEditorReady(true);
  }

  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  useEffect(() => {
    if (editorReady && !writing) {
      setWriting(true);
      let lineNumber = 1;
      editorRef.current.trigger('keyboard', 'type');
      editorRef.current.focus();
      let position = editorRef.current.getPosition();
      editorRef.current.setPosition(position);
      async function writeText() {
        for (let i = 0; i < script.length; i++) {
          for (let j = 0; j < script[i].length; j++) {
            if (script[i][j] === '\n') await sleep(100);
            const range = new monaco.Range(lineNumber+i, 1+j, lineNumber+i, 1+j);
            const id = { major: 1, minor: 1};
            const op = { identifier: id, range: range, text: script[i][j], forceMoveMarkers: true};
            editorRef.current.executeEdits("editor", [op]);
            await sleep(100);
            if (script[i][j] === ' ') await sleep(150);
            if (script[i][j] === '\n') await sleep(100);
            if (script[i][j] === '(') await sleep(100);
            if (script[i][j] === ')') await sleep(100);
          }
        }
      }
      writeText();
    }  
  }, [editorReady]);

  const options = {
    theme: (colorMode === 'light') ? 'vs-dark' : 'vs',
    padding: { top: '10px' },
    scrollbar: { handleMouseWheel: false, vertical: 'hidden', horizontal: 'hidden' },
    minimap: {
        enabled: false
    },
    highlightActiveIndentGuide: false,
    cursorStyle: 'block-outline',
    overviewRulerBorder: false,
    wordWrap: 'on',
    renderLineHighlight: 'none'
  };
  
  return (
    <Editor
      width="500px"
      height="400px"
      language="cpp"
      options={options}
      onMount={handleEditorMounted}
    />
  );
}

export default AnimatedEditor;