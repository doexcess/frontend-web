'use client';

import { filterPeriods } from '@/constants';
import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { HiDotsVertical, HiRefresh } from 'react-icons/hi';
import { IoIosClose, IoIosFunnel } from 'react-icons/io';
import Input from './ui/Input';
import { useRouter } from 'next/navigation';
import { getISODateString, now, oneMonthAgo } from '@/lib/utils';

const Filter = ({
  pageTitle,
  extra,
  showSearch = true,
  searchPlaceholder = 'Search',
  showPeriod = true,
  handleSearchSubmit,
  handleFilterByDateSubmit,
  handleRefresh,
}: {
  pageTitle?: string;
  extra?: JSX.Element;
  showSearch?: boolean;
  searchPlaceholder?: string;
  showPeriod?: boolean;
  handleSearchSubmit?: (input: string) => void;
  handleFilterByDateSubmit?: (
    startDate: string,
    endDate: string,
    setOpenModal: (value: React.SetStateAction<boolean>) => void
  ) => void;
  handleRefresh?: () => void;
}) => {
  const [openModal, setOpenModal] = useState(false);

  const [startDate, setStartDate] = useState(getISODateString(oneMonthAgo()));
  const [endDate, setEndDate] = useState(getISODateString(now));
  const [searchQuery, setSearchQuery] = useState('');

  const [modalPlacement, setModalPlacement] = useState('center');

  const handleSearchFormSubmit = (e: any) => {
    e.preventDefault();

    handleSearchSubmit!(searchQuery!);
  };

  const handleFilterByDate = (e: any) => {
    e.preventDefault();

    handleFilterByDateSubmit!(startDate, endDate, setOpenModal(false)!);
  };

  const handleRefreshClick = () => {
    handleRefresh!();
  };

  return (
    <div>
      <div
        className={`flex ${showPeriod ? 'flex-col' : 'flex-col md:flex-row'} ${
          !showSearch ? 'justify-end mt-5' : 'mt-3'
        } lg:flex-row gap-3 lg:gap-0`}
      >
        <div className={`flex items-center gap-2 flex-[4]`}>
          {showSearch ? (
            <form
              onSubmit={handleSearchFormSubmit}
              className='w-full lg:w-[50%] xl:w-[35%]'
            >
              <Input
                type='text'
                name='search'
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                className='w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              />
            </form>
          ) : (
            <h1 className='text-2xl font-bold'>{pageTitle!}</h1>
          )}
        </div>
        <div className={`flex items-center flex-row-reverse lg:flex-row gap-2`}>
          <button
            title='Search with date filter'
            className='text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-2 py-2 me-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 flex gap-1 items-center'
            onClick={() => setOpenModal(true)}
          >
            <HiDotsVertical size={20} className={'text-2xl'} />
          </button>
          <button
            title='Refresh'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex gap-1 items-center'
            onClick={handleRefreshClick}
          >
            <HiRefresh size={20} className={'text-2xl'} />
          </button>
          {showPeriod && (
            <form className='w-full'>
              <select
                id='period'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full'
                defaultValue='today'
              >
                {filterPeriods.map((period) => (
                  <option key={period.slug} value={period.slug}>
                    {period.name}
                  </option>
                ))}
              </select>
            </form>
          )}

          {/* Extra component */}
          {extra}
        </div>
      </div>
      <Modal
        show={openModal}
        position={modalPlacement}
        onClose={() => setOpenModal(false)}
      >
        <form method='POST' onSubmit={handleFilterByDate}>
          <Modal.Header>Filter by date</Modal.Header>
          <Modal.Body className='grid gap-6'>
            <div>
              <div>
                <label
                  htmlFor='start_date'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Start date
                </label>
                <Input
                  name='from'
                  type='datetime-local'
                  value={startDate}
                  onChange={(e: any) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor='end_date'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  End date
                </label>
                <Input
                  name='to'
                  type='datetime-local'
                  value={endDate}
                  onChange={(e: any) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className='flex justify-end'>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex gap-1 items-center'
            >
              <IoIosFunnel />
              Filter
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
};

export default Filter;
