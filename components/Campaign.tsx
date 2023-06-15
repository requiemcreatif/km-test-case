import React from 'react'

interface CampaignProps {
    campaign: {
        id: number,
        name: string,
        startDate: string,
        endDate: string,
        Budget: number
    }
}


const Campaign: React.FC<CampaignProps> = ({ campaign }) => {
    const isActive = new Date() >= new Date(campaign.startDate) && new Date() <= new Date(campaign.endDate);
    //const isActive = true;

    return (
        <tr className={isActive ? "bg-green-200" : "bg-red-200"}>
            <td className="border px-4 py-2">{campaign.name}</td>
            <td className="border px-4 py-2">{campaign.startDate}</td>
            <td className="border px-4 py-2">{campaign.endDate}</td>
            <td className="border px-4 py-2">{isActive ? "Active" : "Inactive"}</td>
            <td className="border px-4 py-2">{campaign.Budget}</td>
        </tr>
    );
}

export default Campaign;