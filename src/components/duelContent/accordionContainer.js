import React, { useEffect, useState, useRef } from "react";
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
	AccordionProps,
	Box,
	Center,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	useColorModeValue,
	useDisclosure,
	ButtonGroup,
	Flex,
	Text,
} from "@chakra-ui/react";
import SubmitCodeEditor from "../submitCodeEditor";
import socket from "../../socket";
import Database, { handleUID } from "../../data";
import parse from "html-react-parser";
import "./cfStyles.css";

const AccordionContainer = ({
	id,
	duelPlatform,
	duelStatus,
	playerNum,
	onMathJaxRendered,
}) => {
	const [problems, setProblems] = useState([]);
	const [problemVerdicts, setProblemVerdicts] = useState([]);
	const [selectedProblem, setSelectedProblem] = useState(0);
	const [rendered, setRendered] = useState(false);

	useEffect(() => {
		const getProblemVerdicts = async () => {
      setProblemVerdicts([]);
			let duel = await Database.getDuelById(id);
      console.log(duel);
			let newProblemVerdicts = [
				...Array(duel.problems.length).fill([null]),
			];
			let playerIndex = playerNum - 1;
			for (let i = 0; i < duel.problems.length; i++) {
				if (duel.problems[i].playerSolveTimes[playerIndex])
					newProblemVerdicts[i] = "AC";
				else if (duel.problems[i].playerAttempts[playerIndex])
					newProblemVerdicts[i] = "WA";
			}
      setProblemVerdicts(newProblemVerdicts);
		};
		const getProblems = async () => {
			let duel = await Database.getDuelById(id);
			setProblems(duel.problems);
		};
		getProblems();
		getProblemVerdicts();
		socket.on("problem-change", async ({ roomId }) => {
			if (roomId === id) {
				await getProblems();
			}
		});
		socket.on("submission-change", async ({ uid }) => {
			handleUID();
			let localUid = localStorage.getItem("uid");
			if (uid === localUid) {
				await getProblemVerdicts();
			}
		});

		return () => {
			socket.off("problem-change");
			socket.off("submission-change");
		};
	}, []);

  useEffect(() => {
    console.log("Problem verdicts changed.");
  }, [problemVerdicts]);

	useEffect(() => {
		if (problems?.length && !rendered) {
			console.log(problems.length);
			setRendered(true);
			onMathJaxRendered();
		}
	}, [problems, rendered, onMathJaxRendered]);

	const defaultBorderColor = useColorModeValue(
		"rgb(0, 0, 0, 0.5)",
		"rgb(255, 255, 255, 0.5)"
	);
	const rightAnswerBorderColor = useColorModeValue("#d4edc9", "#21aa21");
	const wrongAnswerBorderColor = useColorModeValue(
		"red",
		"red"
	);
	const selectedRowColor = useColorModeValue("primary.300", "primary.700");
	const rightAnswerBackgroundColor = useColorModeValue("#d4edc9", "#d4edc9");
	const wrongAnswerBackgroundColor = useColorModeValue(
		"rgb(0, 200, 0, 0.5)",
		"rgb(0, 150, 0, 0.5)"
	);
	const sampleTestLineColor = useColorModeValue("grey.100", "grey.700");
	const { isOpen, onOpen, onClose } = useDisclosure();

	return problems?.length ? (
		<Accordion
			onChange={(index) => {
				setSelectedProblem(index + 1);
			}}
			allowToggle
			boxShadow="2xl"
		>
			{console.count("Accordion Container")}
			{problems.map((problem, index) => (
				<AccordionItem
					key={problem._id}
					borderColor={
						problemVerdicts[index] === "AC"
							? rightAnswerBorderColor
							: problemVerdicts[index] === "WA"
							? wrongAnswerBorderColor
							: defaultBorderColor
					}
					border="1px solid"
				>
					<h2>
						<AccordionButton
							bg={index === selectedProblem - 1 ? selectedRowColor : (
                problemVerdicts[index] === "AC"
                  ? rightAnswerBorderColor
                  : problemVerdicts[index] === "WA"
                  ? wrongAnswerBorderColor
                  : ""
              )}
							_hover={
								"none"
							}
						>
							<Box flex="2" textAlign="left">
								{index + 1}. <b>{problem.name}</b>
							</Box>
							<Box flex="1" textAlign="center">
								<b>Rated:</b> {problem.rating}, <b>Points:</b>{" "}
								{problem.duelPoints}
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel p={4}>
						{problem.content.constraints ? (
							<Flex justify="space-between">
								{parse(problem.content.constraints)}
							</Flex>
						) : (
							""
						)}
						<Box
							mt={2}
							className="problem-statement"
							fontSize="0.95rem"
						>
							<Text fontWeight="bold" fontSize="1.2rem">
								Problem Statement
							</Text>
							{problem.content.statement
								? parse(problem.content.statement)
								: ""}
						</Box>
						<Box
							mt={2}
							className="problem-input-specifications"
							fontSize="0.95rem"
						>
							<Text fontWeight="bold" fontSize="1.2rem">
								Input
							</Text>
							{problem.content.input
								? parse(problem.content.input)
								: ""}
						</Box>
						<Box
							mt={2}
							className="problem-output-specifications"
							fontSize="0.95rem"
						>
							<Text fontWeight="bold" fontSize="1.2rem">
								Output
							</Text>
							{problem.content.output
								? parse(problem.content.output)
								: ""}
						</Box>
						<Box
							mt={2}
							className="problem-sample-test-cases"
							fontSize="0.95rem"
							sx={{
								" && .test-example-line.test-example-line-odd":
									{
										backgroundColor: sampleTestLineColor,
									},
								" && .sample-test, .sample-test .title, .sample-test .input, .sample-test .output":
									{
										borderColor: defaultBorderColor,
									},
							}}
						>
							{problem.content.testCases
								? parse(problem.content.testCases)
								: ""}
						</Box>
						<Box mt={2} className="problem-note" fontSize="0.95rem">
							{problem.content.note
								? parse(problem.content.note)
								: ""}
						</Box>
						<Center pt={3}>
							<Button
								onClick={onOpen}
								size="md"
								fontSize="lg"
								variant="solid"
								colorScheme="primary"
								isDisabled={duelStatus !== "ONGOING"}
							>
								Submit Your Answer
							</Button>
						</Center>
					</AccordionPanel>
				</AccordionItem>
			))}
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				size="2xl"
				motionPreset="slideInBottom"
			>
				<ModalOverlay />
				<ModalContent top="0">
					<ModalHeader pb={0}>Submit Your Answer</ModalHeader>
					<ModalCloseButton />
					<ModalBody width="675px" pb={3}>
						<SubmitCodeEditor
							key="floating-editor"
							duelStatus={duelStatus}
							duelPlatform={duelPlatform}
							editorId="floating-editor"
							isPopup={true}
							problemChosen={selectedProblem}
							numProblems={problems.length}
							duelId={id}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Accordion>
	) : (
		<p>Problems will be generated when the duel starts.</p>
	);
};

export default AccordionContainer;
