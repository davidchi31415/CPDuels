import React, { useState, useEffect, useMemo } from "react";
import { useColorModeValue, useToast, Text } from "@chakra-ui/react";
import ReactTable from "./tableContainer.js";
import Database, { getUID } from "../../../data";
import moment from "moment";
import socket from "../../../socket";

const SubmissionsTable = ({ duelId, refresh, onRefresh, toast, onToast }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const makeToast = useToast();

  useEffect(() => {
    const getSubmissions = async () => {
      setSubmissions([]);
      let uid = getUID();
      let res = await Database.getSubmissionsByDuelIdAndUid(duelId, uid);
      if (res?.length) {
        let updateVal = res.reverse();
        setSubmissions(updateVal);
        if (toast) {
          let newSubmission = updateVal[updateVal.length - 1];
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

  return (
    <ReactTable
      loading={loading}
      data={submissions}
      columns={columns}
      rowProps={(row) => ({
        onClick: () => {},
      })}
    />
  );
};

export default SubmissionsTable;
