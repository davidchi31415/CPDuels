import React from 'react';
import AceEditor from "react-ace";
import { useColorModeValue } from '@chakra-ui/react';
import languages from './languages';

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-d";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-haskell";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-ocaml";
import "ace-builds/src-noconflict/mode-pascal";
import "ace-builds/src-noconflict/mode-perl";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-scala";

import "ace-builds/src-noconflict/theme-iplastic"
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function onChange(newValue) {
  console.log("change", newValue);
}


const Editor = ({ language }) => {
  const theme = useColorModeValue("iplastic", "monokai");

  return (
    <AceEditor
      mode={languages[language]}
      theme={theme}
      onChange={onChange}
      name="editor"
      width='100%'
      height='400px'
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
    />
  );
}

export default Editor;