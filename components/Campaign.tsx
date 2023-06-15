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

    return (
        <tr style={{ color: isActive ? 'green' : 'red' }}>
            <td>{campaign.name}</td>
            <td>{campaign.startDate}</td>
            <td>{campaign.endDate}</td>
            <td>{isActive ? 'Active' : 'Inactive'}</td>
            <td>{campaign.Budget}</td>
        </tr>
    );
}

export default Campaign;