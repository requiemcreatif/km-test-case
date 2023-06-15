import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Campaign from '@/components/Campaign'
import SearchBar from '@/components/SerachBar';


interface CampaignProps {
  id: number,
  name: string,
  startDate: string,
  endDate: string,
  Budget: number
}


export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data: campaigns, error } = useSWR('/api/campaign', fetcher);

  if (error) return <div>Failed to load campaigns</div>
  if (!campaigns) return <div>Loading...</div>

  const filteredCampaigns = campaigns.filter((campaign: CampaignProps) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


return (
  <div className="container mx-auto px-4">
    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-100 text-left ">
                        <th className="px-4 py-2 ">Name</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Start Date</th>
                        <th className="px-4 py-2">End Date</th>
                        <th className="px-4 py-2">Budget</th>
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
