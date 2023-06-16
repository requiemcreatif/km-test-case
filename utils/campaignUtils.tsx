import axios from 'axios';
import { mutate } from 'swr';

// In types.ts
export interface CampaignProps {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    Budget: number;
  }
  

export async function addCampaigns(newCampaigns: CampaignProps[]) {
    try {
        const postCampaignPromises = newCampaigns.map((campaign) => {
          console.log('Adding campaign with id:', campaign.id);  // Add log here
          return axios.post('/api/campaign', campaign);
        });
    const responses = await Promise.all(postCampaignPromises);

    // Check if all requests were successful
    if (responses.every((response) => response.status === 200)) {
      // If successful, refetch campaigns data
      mutate('/api/campaign');
    } else {
      console.error('Failed to add some campaigns');
    }
  } catch (error) {
    console.error('Failed to add campaigns', error);
  }
}
