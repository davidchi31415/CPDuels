import React, { useState, useEffect, useMemo } from "react";
import { useColorModeValue, useToast, Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import ReactTable from "./tableContainer.js";
import Database, { getUID } from "../../../data";
import Editor from "../submitCodeEditor/editor.js";
import moment from "moment";
import { MdContentCopy } from "react-icons/md";
import socket from "../../../socket";
import { codes_to_languages } from "../submitCodeEditor/languages.js";

const SubmissionsTable = ({ duelId, refresh, onRefresh, toast, onToast }) => {
  const [submissions, setSubmissions] = useState([]);
  const [currentSubmissionIndex, setCurrentSubmissionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const makeToast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const getSubmissions = async () => {
      setSubmissions([]);
      let uid = getUID();
      let res = await Database.getSubmissionsByDuelIdAndUid(duelId, uid);
      if (res?.length) {
        let updateVal = [...res].reverse();
        setSubmissions(updateVal);
        if (toast) {
          let newSubmission = res[res.length - 1];
          if (newSubmission.status && newSubmission.status[0] !== "PENDING") {
            makeToast({
              title: `Problem ${newSubmission.problemNumber} Verdict`,
              description: `${newSubmission.status[0]}`,
              status:
                newSubmission.status[0] === "ACCEPTED" ? "success" : "error",
              duration: 5000,
              isClosable: true,
            });
            onToast();
          }
        }
      }
      setLoading(false);
    };
    if (refresh) {
      getSubmissions();
      onRefresh();
    }
  }, [refresh, toast]);

  const columns = useMemo(
    () => [
      {
        Header: "When",
        accessor: (row) => `${moment(row.createdAt).format("HH:mm:ss")}`,
        id: (row) => row.createdAt,
        width: "3em",
      },
      // {
      //   Header: "Lang",
      //   accessor: ,
      //   id: row => row._id,
      //   width: "4em"
      // },
      {
        Header: "Problem",
        accessor: "problemName",
        width: "25em",
      },
      {
        Header: "Verdict",
        accessor: (row) => {
          if (row.status.length === 2)
            return `${row.status[0]} on Test ${row.status[1]}`;
          else return row.status[0];
        },
        id: (row) => row._id,
        width: "10em",
        Cell: (s) => (
          <div>
            <Text
              as="span"
              fontWeight="bold"
              color={
                !s.value?.includes("ACCEPTED") && !s.value?.includes("PENDING")
                  ? "red.500"
                  : s.value?.includes("ACCEPTED")
                  ? "#00aa00"
                  : ""
              }
            >
              {s.value.split(" ")?.length <= 2
                ? s.value
                : s.value
                    ?.split(" ")
                    .slice(0, s.value?.split(" ").length - 3)
                    ?.join(" ")}
            </Text>
            {s.value.split(" ")?.length > 2
              ? ` ${s.value
                  ?.split(" ")
                  ?.slice(s.value?.split(" ").length - 3)
                  ?.join(" ")}`
              : ""}
          </div>
        ),
      },
      // {
      //   Header: "Time",
      //   accessor: "timeLimit",
      //   width: "3em"
      // },
      // {
      //   Header: "Memory",
      //   accessor: "timeLimit",
      //   width: "3em"
      // },
    ],
    []
  );

  let chosenSubmission = submissions[currentSubmissionIndex];
  let languageCode; let platform;
  if (chosenSubmission) {
    if (chosenSubmission.platform === "CF") languageCode = parseInt(chosenSubmission.languageCode);
    else languageCode = chosenSubmission.languageCode;
    platform = chosenSubmission.platform;
  }

  return (
    <>
      <ReactTable
        loading={loading}
        data={submissions}
        columns={columns}
        rowProps={(row) => ({
          onClick: (e) => {
            setCurrentSubmissionIndex(row.index);
            onOpen();
          },
        })}
      />
      {submissions?.length ?
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="2xl"
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent top="0">
              <ModalHeader pb={0}>
                {chosenSubmission?.problemName}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody width="675px" pb={3}>
              Language: {codes_to_languages[platform][languageCode]} | Verdict: {chosenSubmission.status[0]}
                <Editor duelPlatform={platform}
                  languageCode={
                    languageCode
                  }
                  providedValue={chosenSubmission.content}
                  readOnly={true}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        : ""
      }
    </>
  );
};

export default SubmissionsTable;
