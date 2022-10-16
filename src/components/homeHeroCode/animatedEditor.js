import React, { useRef, useEffect, useState } from 'react';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const AnimatedEditor = () => {
  const [writing, setWriting] = useState(false);
  const [editor, setEditor] = useState();

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
    "\tduel.setRatingRange(1800, 2300);\n",
    "\tduel.addPlayer(\"tourist\");\n",
    "\tduel.addPlayer(\"apgpsoop\");\n",
    "\tduel.start();\n",
    "\n",
    "\twhile (duel.ongoing()) {\n",
    "\t\tduel.solveProblems();\n",
    "\t}\n",
    "\treturn 0;\n",
    "}"
  ];

  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  useEffect(() => {
    if (editor && !writing) {
      setWriting(true);
      async function writeText() {
        for (let i = 0; i < script.length; i++) {
          for (let j = 0; j < script[i].length; j++) {
            if (script[i][j] === '\n') await sleep(100);
            editor.session.insert(editor.getCursorPosition(), script[i][j]);
            await sleep(50);
            if (script[i][j] === ' ') await sleep(70);
            if (script[i][j] === '\n') await sleep(100);
            if (script[i][j] === '(' || script[i] === ')') await sleep(80);
            if (script[i][j] === '{' || script[i] === '}') await sleep(150);
          }
        }
      }
      writeText();
    }  
  }, [editor, writing]);

  useEffect(() => {
    if (editor) {
      editor.removeAllListeners("mousedown");
    }
  }, [editor]);
  
  return (
    <AceEditor
      onLoad={setEditor}
      mode='c_cpp'
      theme='monokai'
      name="editor"
      width='500px'
      height='400px'
      fontSize={14}
      readOnly={true}
      showGutter={true}
      highlightActiveLine={false}
      setOptions={{
        showFoldWidgets: false,
        useWorker: false,
        cursorStyle:'smooth',
      }}
    />
  );
}

export default AnimatedEditor;