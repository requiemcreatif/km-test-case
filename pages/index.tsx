import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import Campaign from '@/components/Campaign'
import { campaignData } from '@/data/campainData'
import SearchBar from '@/components/SerachBar';



const inter = Inter({ subsets: ['latin'] })

interface CampaignProps {
  id: number,
  name: string,
  startDate: string,
  endDate: string,
  Budget: number
}

let setCampaignsGlobal: React.Dispatch<React.SetStateAction<CampaignProps[]>> | null = null;

export const addCampaigns = (newCampaigns: CampaignProps[]) => {
if(setCampaignsGlobal) setCampaignsGlobal(oldCampaigns => [...oldCampaigns, ...newCampaigns]);
}


export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [campaigns, setCampaigns] = useState<CampaignProps[]>([]);

  useEffect(() => {
    setCampaigns(campaignData);
}, []);

setCampaignsGlobal = setCampaigns;

    const filteredCampaigns = campaigns.filter(campaign =>
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


return (
  <div className="container mx-auto px-4">
    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-100 text-left ">
                        <th className="px-4 py-2 ">Name</th>
                        <th className="px-4 py-2">Start Date</th>
                        <th className="px-4 py-2">End Date</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Budget</th>
                    </tr>
                </thead>
                <tbody>
                {filteredCampaigns.map(campaign => <Campaign key={campaign.id} campaign={campaign} />)}
                </tbody>
            </table>
        </div>
);
}
