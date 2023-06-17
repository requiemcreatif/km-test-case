import React, { useState, useEffect, useMemo } from "react";
import useSWR from "swr";
import { usePersistedState } from "../hooks/usePersistedState";
import Campaign from "@/components/Campaign";
import SearchBar from "@/components/SearchBar";
import DateRange from "@/components/DateRange";
import { IoFilterSharp } from "react-icons/io5";
import { MdFilterListOff } from "react-icons/md";
import { addCampaigns } from "@/utils/campaignUtils";
import { campaignData } from "@/data/campainData";
import { Campaign as CampaignType } from "../utils/types";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [dateRangeVisible, setDateRangeVisible] = usePersistedState("dateRangeVisible", true);
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 10;

  // Fetch campaigns from the API
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data: campaigns, error } = useSWR("/api/campaign", fetcher);

  // Filter the campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns?.filter((campaign: CampaignType) => {
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
  }, [campaigns, searchTerm, startDate, endDate]);

  // Add campaigns calling the addCampaigns function
  useEffect(() => {
    addCampaigns(campaignData);
  }, []);

  // used to Handle errors during loading state
  if (error) return <div>Failed to load campaigns</div>;
  if (!campaigns) return <div>Loading...</div>;

  // Pagination. This will only display 10 campaigns per page
  const totalPages = Math.ceil(filteredCampaigns.length / campaignsPerPage);

  // Go to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * campaignsPerPage;
  const endIndex = startIndex + campaignsPerPage;
  const displayedCampaigns = filteredCampaigns.slice(startIndex, endIndex);

  // Reset date range
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className='container mx-auto px-4 flex gap-3 mt-2'>
      <div
        className={`transition-all duration-300 ease-in-out ${
          dateRangeVisible ? "w-3/4" : "w-full"
        }`}>
        <div className=' mb-3 flex justify-between gap-5 items-center py-3 shadow rounded-full px-3 bg-[#334DA2]'>
          <button
            className=' bg-[#71B256] hover:bg-white text-white hover:text-black font-semibold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline '
            onClick={() => setDateRangeVisible(!dateRangeVisible)}>
            {dateRangeVisible ? <MdFilterListOff /> : <IoFilterSharp />}
          </button>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div className=' overflow-auto rounded-lg shadow border-[0.5px]'>
          <table className='w-full table-auto'>
            <thead className='bg-gray-50 border-b-2 border-white'>
              <tr className='bg-gray-100 text-left'>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Name</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Status</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Start Date</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>End Date</th>
                <th className='p-3 text-sm font-semibold tracking-wide text-left'>Budget</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {displayedCampaigns.map((campaign: CampaignType) => (
                <Campaign key={campaign.id} campaign={campaign} />
              ))}
            </tbody>
          </table>
        </div>

        <div className='flex justify-between p-4 text-white'>
          <button
            className=' shadow w-[100px] py-2 rounded-full border-[0.5px] bg-[#334DA2]'
            disabled={currentPage === 1}
            onClick={goToPreviousPage}>
            Prev
          </button>
          <button
            className=' shadow w-[100px] py-2 rounded-full border-[0.5px] bg-[#334DA2]'
            disabled={currentPage === totalPages}
            onClick={goToNextPage}>
            Next
          </button>
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out overflow-x-hidden ${
          dateRangeVisible ? "w-1/4" : "w-0"
        }`}>
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
  );
}
