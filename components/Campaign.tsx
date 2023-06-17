import React from "react";
import { AiFillCheckCircle, AiOutlineClose } from "react-icons/ai";
import { Campaign as CampaignType } from "../utils/types";
interface CampaignProps {
  campaign: CampaignType;
}

const Campaign: React.FC<CampaignProps> = ({ campaign }) => {
  // Convert date strings to Date objects
  const startDate = new Date(campaign.startDate);
  const endDate = new Date(campaign.endDate);
  const today = new Date();
  const budgetFormatted = campaign.Budget.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Helper function for formatting the date
  const formatDate = (date: Date): string => {
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Format date strings
  const startDateFormatted = formatDate(startDate);
  const endDateFormatted = formatDate(endDate);

  const isActive = today >= startDate && today <= endDate;

  return (
    <tr className={isActive ? "bg-green-200" : "bg-red-50"}>
      <td className=' p-3 text-sm text-gray-700 whitespace-nowrap'>{campaign.name}</td>
      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
        {isActive ? (
          <div className='flex items-center gap-2'>
            <AiFillCheckCircle className='text-green-700' />
            <span>Active </span>
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <AiOutlineClose className='text-red-500' />
            <span>Inactive </span>
          </div>
        )}
      </td>
      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{startDateFormatted}</td>
      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{endDateFormatted}</td>
      <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>${budgetFormatted}</td>
    </tr>
  );
};

export default Campaign;
