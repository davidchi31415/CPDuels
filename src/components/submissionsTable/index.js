import React, { useState, useEffect, useMemo } from 'react';
import ReactTable from './tableContainer.js';
import Database, { handleUID } from '../../data';
import { 
  Text, IconButton,
  HStack, VStack, Center
} from '@chakra-ui/react';
import { MdRefresh } from 'react-icons/md';

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
    }
    getSubmissions();
    setLoading(false);
    setRefresh(false);
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh(true);
    setLoading(true);
    setSubmissions([]);
  }

  const columns = useMemo(
    () => [
      // {
      //   Header: "Submission Time",
      //   accessor: "",
      //   width: "22em"
      // },
      // {
      //   Header: "Lang",
      //   accessor: ,
      //   id: row => row._id,
      //   width: "4em"
      // },
      {
        Header: "Problem",
        accessor: "submissionsId",
        width: "3em"
      },
      {
        Header: "Verdict",
        accessor: "status",
        width: "3em"
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
          <Text my='auto' mx={0} width='4em'>Refresh</Text>
          <IconButton variant='solid' colorScheme='primary'
            icon={<MdRefresh />} 
            onClick={() => handleRefresh()}
          />
        </HStack>
      </Center>
      <ReactTable loading={loading} 
        data={submissions} 
        columns={columns}
        rowProps={row => ({
          onClick: () => console.log("clicked")
        })} 
      />
    </VStack>
  );
}

export default SubmissionsTable;