import React from "react";

interface DateRangeProps {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  handleReset: () => void;
}

const DateRange: React.FC<DateRangeProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleReset,
}) => {

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedEndDate = new Date(event.target.value);
    const currentStartDate = new Date(startDate);

    // if selected end date is greater than or equal to start date, update the end date
    if (selectedEndDate >= currentStartDate) {
      setEndDate(event.target.value);
    } else {
      alert("End date can't be before the start date");
    }
  };
  return (
    <div className='p-5  max-w-md grid grid-cols-1 gap-5'>
      <div className='grid grid-cols-1 lg:grid-cols gap-5'>
        <div className=' flex items-center'>
          <label htmlFor='startDate' className='mr-2'>
            Start
          </label>
          <input
            id='startDate'
            className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='date'
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>

        <div className=' flex items-center'>
          <label htmlFor='endDate' className='mr-2'>
            End
          </label>
          <input
            id='endDate'
            className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='date'
            min={startDate}
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>

      <button
        className=' bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-3 rounded focus:outline-none focus:shadow-outline py-2 w-1/3'
        onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default DateRange;
