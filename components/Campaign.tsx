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
    const startDate = new Date(campaign.startDate);
    const endDate = new Date(campaign.endDate);
    const today = new Date();
    const budgetFormatted = campaign.Budget.toLocaleString();

    // Format date strings
    const startDateFormatted = `${(startDate.getMonth()+1).toString().padStart(2, '0')}/${startDate.getDate().toString().padStart(2, '0')}/${startDate.getFullYear()}`;
    const endDateFormatted = `${(endDate.getMonth()+1).toString().padStart(2, '0')}/${endDate.getDate().toString().padStart(2, '0')}/${endDate.getFullYear()}`;

    const isActive = today >= startDate && today <= endDate;
    //const isActive = true;

    return (
        <tr className={isActive ? "bg-green-200" : "bg-red-200"}>
            <td className="border px-4 py-2">{campaign.name}</td>
            <td className="border px-4 py-2">{isActive ? "Active" : "Inactive"}</td>
            <td className="border px-4 py-2">{startDateFormatted}</td>
            <td className="border px-4 py-2">{endDateFormatted}</td>   
            <td className="border px-4 py-2">${budgetFormatted}</td>
        </tr>
    );
}

export default Campaign;