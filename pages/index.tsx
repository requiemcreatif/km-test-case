import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Campaign from "@/components/Campaign";
import SearchBar from "@/components/SearchBar";
import DateRange from "@/components/DateRange";
import { IoFilterSharp } from "react-icons/io5";
import { MdFilterListOff } from "react-icons/md";

interface CampaignProps {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  Budget: number;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dateRangeVisible, setDateRangeVisible] = useState<boolean>(true);

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: campaigns, error } = useSWR("/api/campaign", fetcher);

  

  if (error) return <div>Failed to load campaigns</div>;
  if (!campaigns) return <div>Loading...</div>;

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
  };

  const filteredCampaigns = campaigns.filter((campaign: CampaignProps) => {
    const campaignStartDate = new Date(campaign.startDate);
    const campaignEndDate = new Date(campaign.endDate);

    const startDateCondition = !startDate || campaignStartDate >= new Date(startDate);
    const endDateCondition = !endDate || campaignEndDate <= new Date(endDate);

    return (
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      startDateCondition &&
      endDateCondition
    );
  });

  return (
    <div className='container mx-auto px-4'>
      <div className=''>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="py-2">
          <button
            className='bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2'
            onClick={() => setDateRangeVisible(!dateRangeVisible)}>
            {dateRangeVisible ? <MdFilterListOff /> : <IoFilterSharp />}
          </button>

          {dateRangeVisible && (
            <DateRange
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              handleReset={handleReset}
            />
          )}
        </div>
      </div>

      <table className='w-full table-auto'>
        <thead>
          <tr className='bg-gray-100 text-left '>
            <th className='px-4 py-2 '>Name</th>
            <th className='px-4 py-2'>Status</th>
            <th className='px-4 py-2'>Start Date</th>
            <th className='px-4 py-2'>End Date</th>
            <th className='px-4 py-2'>Budget</th>
          </tr>
        </thead>
        <tbody>
          {filteredCampaigns.map((campaign: CampaignProps) => (
            <Campaign key={campaign.id} campaign={campaign} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
