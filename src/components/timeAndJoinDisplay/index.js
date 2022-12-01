import React, { useState, useEffect, useRef } from "react";
import {
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	InputRightElement,
	InputGroup,
	Button,
	IconButton,
	ButtonGroup,
	Text,
	Center,
	Flex,
	VStack,
	HStack,
	TableContainer,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Skeleton,
	useToast,
	useColorModeValue,
} from "@chakra-ui/react";
import Database, { handleUID } from "../../data";
import socket from "../../socket";
import { MdContentCopy } from "react-icons/md";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const JoinDisplay = ({ id, playerNum }) => {
	const [username, setUsername] = useState();
	const [joining, setJoining] = useState(false);
	const [joiningGuest, setJoiningGuest] = useState(false);
	const toastRef = useRef();
	const toast = useToast();
	const link = `https://www.cpduels.com/play/${id}`;

	const handleJoin = (e) => {
		e.preventDefault();
		setJoining(true);
		handleUID();
		if (!username) {
			makeToast({
				title: "Error",
				description: "Either enter username or join as guest.",
				status: "error",
				duration: 2000,
				isClosable: true,
			});
			setJoining(false);
			return;
		}
		let uid = localStorage.getItem("uid");
		socket.emit("join-duel", {
			roomId: id,
			username: username,
			guest: false,
			uid: uid,
		});
	};

	const handleJoinGuest = (e) => {
		e.preventDefault();
		setJoiningGuest(true);
		handleUID();
		let uid = localStorage.getItem("uid");
		socket.emit("join-duel", {
			roomId: id,
			username: "GUEST",
			guest: true,
			uid: uid,
		});
	};

	useEffect(() => {
		socket.on("join-duel-error", ({ message }) => {
			setJoining(false);
			makeToast({
				title: "Error",
				description: message,
				status: "error",
				duration: 2000,
				isClosable: true,
			});
		});

		return () => {
			socket.off("join-duel-error");
		};
	}, []);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(link);
		makeToast({
			title: "Copied!",
			description: "The link is now in your clipboard.",
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	};

	const makeToast = (toastParams) => {
		if (toastRef.current) {
			toast.close(toastRef.current);
		}
		toastRef.current = toast(toastParams);
	};

	return playerNum ? (
		<VStack>
			<Text my={0} height="100%">
				Wait for someone to join, or invite them:
			</Text>
			<InputGroup px={2}>
				<Input
					type="text"
					value={`https://www.cpduels.com/play/${id}`}
					size="md"
					textOverflow="ellipsis"
					readOnly
					borderColor="grey.100"
					variant="outline"
				/>
				<InputRightElement pr={4}>
					<IconButton
						variant="outline"
						borderColor="grey.100"
						icon={<MdContentCopy />}
						onClick={copyToClipboard}
					/>
				</InputRightElement>
			</InputGroup>
		</VStack>
	) : (
		<VStack height="100%">
			<FormControl mx="auto" width="fit-content">
				<FormLabel my="auto">Username (optional)</FormLabel>
				<Input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleJoin(e);
					}}
					borderColor="grey.100"
					width="16em"
					mt={1}
				/>
			</FormControl>
			<ButtonGroup>
				<Button
					onClick={handleJoin}
					size="md"
					loadingText="Joining"
					isLoading={joining}
					colorScheme="primary"
					variant="solid"
				>
					Join
				</Button>
				<Button
					onClick={handleJoinGuest}
					size="md"
					loadingText="Joining"
					isLoading={joiningGuest}
					colorScheme="primary"
					variant="outline"
				>
					Join as Guest
				</Button>
			</ButtonGroup>
		</VStack>
	);
};

const ReadyUpDisplay = ({ id, playerNum, replacing }) => {
	const handleReady = (e) => {
		e.preventDefault();
		handleUID();
		let uid = localStorage.getItem("uid");
		socket.emit("player-ready", { roomId: id, uid: uid });
		setReady(true);
	};
	const handleUnready = (e) => {
		e.preventDefault();
		handleUID();
		let uid = localStorage.getItem("uid");
		socket.emit("player-unready", { roomId: id, uid: uid });
		setReady(false);
	};

	const [ready, setReady] = useState(false);
	const [readyCount, setReadyCount] = useState(0);

	useEffect(() => {
		const getReadiness = async () => {
			let duel = await Database.getDuelById(id);
			setReady(duel.players[playerNum - 1].ready);
			let readyCountFetched = 0;
			if (duel.players[0].ready) readyCountFetched++;
			if (duel.players[1].ready) readyCountFetched++;
			setReadyCount(readyCountFetched);
		};
		if (playerNum) getReadiness(playerNum - 1);

		socket.on("player-ready-changed", async ({ roomId }) => {
			if (roomId === id) await getReadiness();
		});

		return () => {
			socket.off("player-ready-changed");
		};
	}, []);

	return playerNum ? (
		<Flex direction="column" align="center" gap="1em">
			<Center gap={2}>
				<IconButton
					onClick={handleReady}
					size="md"
					colorScheme="green"
					variant="solid"
					boxSize="3em"
					disabled={ready || replacing}
					icon={<CheckIcon boxSize="2em" />}
				/>
				<IconButton
					onClick={handleUnready}
					size="md"
					colorScheme="red"
					boxSize="3em"
					disabled={!ready || replacing}
					icon={<CloseIcon boxSize="1.5em" />}
				/>
			</Center>
			<Text fontSize="1.5rem">{readyCount}/2</Text>
		</Flex>
	) : (
		<Center>
			<Text textAlign="center" textStyle="body2Semi">
				Duel is full.
			</Text>
		</Center>
	);
};

const TimeDisplay = ({ id }) => {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		socket.on("time-left", ({ roomId, timeLeft }) => {
			if (roomId === id && !Number.isNaN(timeLeft)) {
				setHours(Math.floor(timeLeft / 3600));
				setMinutes(Math.floor(timeLeft / 60) % 60);
				setSeconds(timeLeft % 60);
			}
		});

		return () => {
			socket.off("time-left");
		};
	}, []);

	return (
		<Text textAlign="center" textStyle="display2">
			{`${
				`${hours}`.padStart(2, "0") +
				":" +
				`${minutes}`.padStart(2, "0") +
				":" +
				`${seconds}`.padStart(2, "0")
			}`}
		</Text>
	);
};

const ResultDisplay = ({ id }) => {
	const [result, setResult] = useState();
	const [largeText, setLargeText] = useState(true);

	useEffect(() => {
		const getResult = async () => {
			let duel = await Database.getDuelById(id);
			let res = duel.result;
			if (res) {
				if (res[0] === "TIE") setResult("TIE");
				else if (res[0] === "ABORTED") setResult("ABORTED");
				else if (res[0] === "RESIGNED") {
					setResult(
						<>
							{`${res[1]} WINS BY`}
							<br />
							{`RESIGNATION`}
						</>
					); // Player who won, not the one who resigned
					setLargeText(false);
				} else {
					setResult(`${res[1]} WINS!`);
					setLargeText(false);
				}
			}
		};
		getResult();
	}, []);

	return (
		<Center>
			<Text
				textAlign="center"
				textStyle={largeText ? "display2" : "body2Semi"}
			>
				{result}
			</Text>
		</Center>
	);
};

const TimeAndJoinDisplay = ({ id, duelStatus, playerNum, replacing }) => {
	const [title, setTitle] = useState("");
	const [currentDisplay, setCurrentDisplay] = useState();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (duelStatus === "INITIALIZED") {
			setTitle(playerNum !== null ? "Ready to Start?" : "Duel Full");
			setCurrentDisplay(<ReadyUpDisplay id={id} playerNum={playerNum} replacing={replacing} />);
		} else if (duelStatus === "ONGOING") {
			setTitle("Time Left");
			setCurrentDisplay(<TimeDisplay id={id} />);
		} else if (duelStatus === "FINISHED" || duelStatus === "ABORTED") {
			setTitle("Result");
			setCurrentDisplay(<ResultDisplay id={id} />);
		} else {
			setTitle(playerNum !== null ? "Wait" : "Join");
			setCurrentDisplay(<JoinDisplay id={id} playerNum={playerNum} />);
		}
		if (duelStatus !== "") setLoading(false);
	}, [duelStatus, playerNum, replacing]);

	const borderColor = useColorModeValue(
		"rgb(0, 0, 0, 0.5)",
		"rgb(255, 255, 255, 0.5)"
	);

	return (
		<TableContainer
			border="1px solid"
			borderColor={borderColor}
			borderTopLeftRadius="md"
			borderTopRightRadius="md"
			width="22em"
			boxShadow="xl"
		>
			<Table>
				<Thead>
					<Tr>
						<Th
							textAlign="center"
							fontSize="1.2rem"
							borderColor="grey.500"
							py={2}
						>
							{title}
						</Th>
					</Tr>
				</Thead>
				<Tbody>
					{loading ? (
						<Tr>
							<Skeleton height="8em">
								<Td px={1} py={1} height="8em">
									{currentDisplay}
								</Td>
							</Skeleton>
						</Tr>
					) : (
						<Tr>
							<Td px={1} py={1} height="8em">
								{currentDisplay}
							</Td>
						</Tr>
					)}
				</Tbody>
			</Table>
		</TableContainer>
	);
};

export default TimeAndJoinDisplay;
