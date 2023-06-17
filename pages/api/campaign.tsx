import type { NextApiRequest, NextApiResponse } from "next";
import { campaignData as initialCampaignData } from "@/data/campainData";

let campaignData = initialCampaignData;

interface CampaignProps {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  Budget: number;
}

interface ErrorResponse {
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CampaignProps[] | ErrorResponse>
) {
  if (req.method === "GET") {
    res.status(200).json(campaignData);
  } else if (req.method === "POST") {
    const newCampaign = req.body;

    if (
      !newCampaign.name ||
      !newCampaign.startDate ||
      !newCampaign.endDate ||
      typeof newCampaign.Budget !== "number"
    ) {
      res.status(400).json({ message: "Invalid campaign data" });
    } else if (new Date(newCampaign.startDate) > new Date(newCampaign.endDate)) {
      res.status(400).json({ message: "Start date must be before end date." });
    } else {
      campaignData.push(newCampaign);
      res.status(200).json({ message: "Campaign added successfully." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
