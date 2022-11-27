import React, { useState, useEffect, useMemo } from "react";
import ReactTable from "./tableContainer.js";
import Database, { handleUID } from "../../data";
import { Text, IconButton, HStack, VStack, Center } from "@chakra-ui/react";
import { MdRefresh } from "react-icons/md";
import moment from "moment";

const SubmissionsTable = ({ duelId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const getSubmissions = async () => {
      handleUID();
      let uid = localStorage.getItem("uid");
      let res = await Database.getSubmissionsByDuelIdAndUid(duelId, uid);
      if (res?.length) setSubmissions(res.reverse());
    };
    getSubmissions();
    setLoading(false);
    setRefresh(false);
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(true);
    setLoading(true);
    setSubmissions([]);
  };

  const columns = useMemo(
    () => [
      {
        Header: "When",
        accessor: row => `${moment(row.createdAt).format('HH:mm:ss')}`,
        id: row => row.createdAt,
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
            <span
              style={
                !s.value?.includes("ACCEPTED") && !s.value?.includes("PENDING")
                  ? { color: "red", fontWeight: "bold" }
                  : s.value?.includes("ACCEPTED")
                  ? { color: "#21bc21", fontWeight: "bold" }
                  : {}
              }
            >
              {s.value
                ?.split(" ")
                .slice(0, s.value?.split(" ").length - 3)
                ?.join(" ")}
            </span>
            {` ${s.value
              ?.split(" ")
              ?.slice(s.value?.split(" ").length - 3)
              ?.join(" ")}`}
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
    <VStack>
      <Center>
        <HStack>
          <Text my="auto" mx={0} width="4em">
            Refresh
          </Text>
          <IconButton
            variant="solid"
            colorScheme="primary"
            icon={<MdRefresh />}
            onClick={() => handleRefresh()}
          />
        </HStack>
      </Center>
      <ReactTable
        loading={loading}
        data={submissions}
        columns={columns}
        rowProps={(row) => ({
          onClick: () => console.log("clicked"),
        })}
      />
    </VStack>
  );
};

export default SubmissionsTable;
