import React, { useState, useEffect, useMemo } from "react";
import ReactTable from "./tableContainer.js";
import Database from "../../../data";
import {
  FormControl,
  FormLabel,
  Select,
  IconButton,
  HStack,
  VStack,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdRefresh } from "react-icons/md";

const FinishedDuelsTable = ({ duels, setRefresh }) => {
  const [data, setData] = useState([]);
  const [platform, setPlatform] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let newDuels = [...duels].filter((duel) => 
      {
        if (platform === "All") {
          return duel.status === "FINISHED"
        } else {
          return duel.platform === platform && duel.status === "FINISHED"
        }
      }
    );
    setData(newDuels);
    setLoading(false);
  }, [duels, platform]);

  const handleRefresh = () => {
    setRefresh(true);
    setLoading(true);
    setData([]);
  };

  const columns = useMemo(
    () => [
      {
        Header: "⚔",
        accessor: "platform",
        disableSortBy: true,
        width: "4em",
      },
      {
        Header: "Usernames",
        accessor: (row) => `${row.players[0].username} v ${row.players[1].username}`,
        id: (row, index) => index,
        disableSortBy: true,
        width: "30em",
      },
      {
        Header: "Winner",
        accessor: (row) => `${row.result?.length === 2 ? row.result[1] : row.result[0]}`,
        id: (row) => row._id,
        width: "8em",
      }
    ],
    []
  );

  return (
    <VStack width="fit-content">
      <Flex width="100%" justify="space-between">
        <FormControl>
          <HStack spacing={0}>
            <FormLabel my="auto" mx={1}>
              Showing:
            </FormLabel>
            <Select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              borderColor="grey.100"
              width="11em"
              textAlign="center"
            >
              <option value="All">All Platforms</option>
              <option value="CF">Codeforces</option>
              <option value="AT">AtCoder</option>
              <option value="LC">LeetCode</option>
            </Select>
          </HStack>
        </FormControl>
        <HStack spacing={0}>
          <FormLabel my="auto" mx={0} width="7em">
            Refresh Table
          </FormLabel>
          <IconButton
            variant="solid"
            colorScheme="primary"
            icon={<MdRefresh />}
            onClick={() => handleRefresh()}
          />
        </HStack>
      </Flex>
      <ReactTable
        loading={loading}
        data={
          platform !== "All"
            ? data.filter((duel) => {
                return duel.platform === platform;
              })
            : data
        }
        columns={columns}
        rowProps={(row) => ({
          onClick: () => navigate(`/play/${row.original._id}`),
        })}
      />
    </VStack>
  );
};

export default FinishedDuelsTable;
