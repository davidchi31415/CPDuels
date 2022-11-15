import { Center, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import CPFavicon from "../../images/CPDuels Favicon (1).svg";

const HomeHeroCode = () => {
  const { colorMode } = useColorMode();

  const [writing, setWriting] = useState(false);
  const [doneWriting, setDoneWriting] = useState(false);
  const [code, setCode] = useState("▮");
  const script = [
    "#include <codeforces>\n",
    "#include <atcoder>\n",
    "#include <leetcode>\n",
    "#include \"1v1_duels.h\"\n",
    "\n",
    "int main() {\n",
    "  CPDuels::Duel duel = CPDuels::createDuel(\n",
    "    \"tourist\", \"apgpsoop\", 10, 180, 2400, 3000\n",
    "  );\n",
    "  duel.start();\n",
    "  duel.solveProblems();\n",
    "  duel.haveFun();\n",
    "  return 0;\n",
    "}"
  ];

  const sleep = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

  useEffect(() => {
    if (!writing) {
      setWriting(true);
      async function writeText() {
        for (let i = 0; i < script.length; i++) {
          for (let j = 0; j < script[i].length; j++) {
            if (script[i][j] === '\n') await sleep(100);
            setCode(code => code.substring(0, code.length-1) + script[i][j] + '▮');
            if (script[i][j] === ' ') await sleep(100);
            else if (script[i][j] === '\n') await sleep(200);
            else if (script[i][j] === '(' || script[i] === ')') await sleep(180);
            else if (script[i][j] === '{' || script[i] === '}') await sleep(200);
            else await sleep(50);
          }
        }
        setDoneWriting(true);
      }
      writeText();
    }
  }, [writing]);

  useEffect(() => {
    async function blinkCursor() {
      while (true) {
        await sleep(500);
        setCode(code => code.substring(0, code.length-1));
        await sleep(500);
        setCode(code => code + '▮');
      }
    }
    if (doneWriting) {
      setDoneWriting(false);
      blinkCursor();
    }
  }, [doneWriting]);

  return (
    <div class="macintosh">
      <div class="monitor-inner">
        <div class="screen-cutout">
          <div class="screen">
            <pre class="code">{code}</pre>
          </div>
        </div>
        <div class="logo">
          <img src={CPFavicon} />
        </div>
        <div class="opening">
          <div class="opening-inner"></div>
        </div>
        <div class="cpduels-label">CPDuels SE</div>
      </div>
    </div>
  );
};

export default HomeHeroCode;
