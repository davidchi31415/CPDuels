import { Box, Center, useColorMode, useColorModeValue } from "@chakra-ui/react";
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
    '#include "1v1_duels.h"\n',
    "\n",
    "int main() {\n",
    "  CPDuels::Duel duel = new CPDuels::Duel(\n",
    '    "CF", "tourist", "apgpsoop", 10, 180, 2400, 3000\n',
    "  );\n",
    "  duel.start();\n",
    "  duel.solveProblems();\n",
    "  duel.haveFun();\n",
    "  return 0;\n",
    "}",
  ];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cursor="|";

  useEffect(() => {
    if (!writing) {
      setWriting(true);
      async function writeText() {
        for (let i = 0; i < script.length; i++) {
          for (let j = 0; j < script[i].length; j++) {
            if (script[i][j] === "\n") await sleep(100);
            if (script[i][j] === " " && j < script[i].length && script[i][j+1] === " ") {
              setCode(
                (code) => code.substring(0, code.length - 1) + "  " + cursor
              );
              j++;
              await sleep(100);
              continue;
            }
            setCode(
              (code) => code.substring(0, code.length - 1) + script[i][j] + cursor
            );
            if (script[i][j] === " ") await sleep(100);
            else if (script[i][j] === "\n") await sleep(200);
            else if (script[i][j] === ",") await sleep(250);
            else if (script[i][j] === "(" || script[i] === ")")
              await sleep(180);
            else if (script[i][j] === "{" || script[i] === "}")
              await sleep(200);
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
        setCode((code) => code.substring(0, code.length - 1));
        await sleep(500);
        setCode((code) => code + cursor);
      }
    }
    if (doneWriting) {
      setDoneWriting(false);
      blinkCursor();
    }
  }, [doneWriting]);

  return (
    <Box
      className="macintosh"
      boxShadow={
        colorMode === "light" ? "0 70px 44px -44px rgba(0, 0, 0, 0.4)" : ""
      }
    >
      <Box className="monitor-inner">
        <Box className="screen-cutout">
          <Box className="screen">
            <pre className="code">{code}</pre>
          </Box>
        </Box>
        <Box className="logo"
          filter="opacity(50%)"
        >
          <img src={CPFavicon} />
        </Box>
        <Box className="opening">
          <Box className="opening-inner"></Box>
        </Box>
        <Box className="cpduels-label">CPDuels SE</Box>
      </Box>
    </Box>
  );
};

export default HomeHeroCode;
