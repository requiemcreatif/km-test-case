// pages/api/campaigns.ts
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { campaignData } from '@/data/campainData';

// Define a type for your data
interface CampaignProps {
  id: number,
  name: string,
  startDate: string,
  endDate: string,
  Budget: number
}

// Define a type for error response
interface ErrorResponse {
    message: string;
  }

export default async function handler(req: NextApiRequest, res: NextApiResponse<CampaignProps[] | ErrorResponse>) {
    // Check the request method
    if (req.method === 'GET') {
      try {
        // You can use axios to fetch data from an external API here if needed
        // const response = await axios.get('Your-API-URL-Here');
        // res.status(200).json(response.data);
        // Or use static data as in your example:
        res.status(200).json(campaignData);
      } catch (error) {
        res.status(500).json({ message: (error as Error).message });
      }
      
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  