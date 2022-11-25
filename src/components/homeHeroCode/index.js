import {
  Box,
  Center,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import CPFavicon from "../../images/CPDuels Favicon (1).svg";

const HomeHeroCode = () => {
  const { colorMode } = useColorMode();

  const [loading, setLoading] = useState(false);
  const [doneLoading, setDoneLoading] = useState(false);
  const [writing, setWriting] = useState(false);
  const [doneWriting, setDoneWriting] = useState(false);
  const [code, setCode] = useState("|");

  const script1 = [
    " ======= =======",
    "===      ===  ===",
    "===      =======",
    "===      ===",
    " ======= ===",
  ];
  const [currentLine, setCurrentLine] = useState(script1.length - 1);

  const script2 = [
    "#include <codeforces>\n",
    "#include <atcoder>\n",
    "#include <leetcode>\n",
    '#include "1v1_duels.h"\n',
    "\n",
    "int main() {\n",
    "  CPDuels::Duel duel = new CPDuels::Duel(\n",
    '    "tourist", "apgpsoop", 10, 180, 2400, 3000\n',
    "  );\n",
    "  duel.start();\n",
    "  duel.solveProblems();\n",
    "  duel.haveFun();\n",
    "  return 0;\n",
    "}",
  ];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const cursor = "|";

  useEffect(() => {
    if (!doneLoading) {
      const shiftLine = async () => {
        if (!loading) {
          await sleep(500);
          setLoading(true);
          return;
        }
        if (currentLine === -1) {
          await sleep(1000);
          setDoneLoading(true);
        } else {
          await sleep(200);
          setCurrentLine((i) => i - 1);
        }
      };
      shiftLine();
    }
  }, [loading, doneLoading, currentLine]);

  useEffect(() => {
    if (!writing && doneLoading) {
      setWriting(true);
      async function writeText() {
        for (let i = 0; i < script2.length; i++) {
          for (let j = 0; j < script2[i].length; j++) {
            if (script2[i][j] === "\n") await sleep(100);
            if (
              script2[i][j] === " " &&
              j < script2[i].length &&
              script2[i][j + 1] === " "
            ) {
              setCode(
                (code) => code.substring(0, code.length - 1) + "  " + cursor
              );
              j++;
              await sleep(100);
              continue;
            }
            setCode(
              (code) =>
                code.substring(0, code.length - 1) + script2[i][j] + cursor
            );
            if (script2[i][j] === " ") await sleep(100);
            else if (script2[i][j] === "\n") await sleep(200);
            else if (script2[i][j] === ",") await sleep(250);
            else if (script2[i][j] === "(" || script2[i] === ")")
              await sleep(180);
            else if (script2[i][j] === "{" || script2[i] === "}")
              await sleep(200);
            else await sleep(50);
          }
        }
        setDoneWriting(true);
      }
      writeText();
    }
  }, [writing, doneLoading]);

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
        colorMode === "light"
          ? "0 70px 44px -44px rgba(0, 0, 0, 0.4)"
          : "#a8a8ff 0 15px 42px"
      }
    >
      <Box className="monitor-inner">
        <Box
          className="screen-cutout"
          boxShadow={colorMode === "light" ? "" : "#888888 0 10px 35px"}
        >
          {doneLoading ? (
            <Box className="screen">
              <pre class="code">
                <code>{code}</code>
              </pre>
            </Box>
          ) : (
            <Box
              className="screen"
              paddingY="55px"
              fontSize={["23px", null, null, null, "25px"]}
              lineHeight="15px"
              fontWeight="bold"
            >
              <Box mx="auto" width="fit-content">
                {script1.map((line, index) => (
                  <Text
                    as="pre"
                    color={index > currentLine ? "#43ff43" : "#21bc21"}
                  >
                    {line}
                  </Text>
                ))}
              </Box>
            </Box>
          )}
        </Box>
        <Box className="logo" filter="opacity(50%)">
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
