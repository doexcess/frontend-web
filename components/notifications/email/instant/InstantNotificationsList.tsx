import Pagination from '@/components/Pagination';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import TableEndRecord from '@/components/ui/TableEndRecord';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { InstantNotification } from '@/types/notification';
import InstantNotificationItem from './InstantNotificationItem';

interface InstantNotificationListProps {
  notifications: InstantNotification[];
  count: number;
  onClickNext: () => Promise<void>;
  onClickPrev: () => Promise<void>;
  currentPage: number;
  loading: boolean;
}
const InstantNotificationsList = ({
  notifications,
  count,
  onClickNext,
  onClickPrev,
  currentPage,
  loading,
}: InstantNotificationListProps) => {
  const searchParams = useSearchParams();
  if (loading) return <LoadingSkeleton />;

  const noFoundText =
    !searchParams.has('page') || searchParams.has('q')
      ? 'No record found.'
      : undefined;

  return (
    <div className='overflow-x-auto rounded-none'>
      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 min-w-full divide-y '>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Subject
              </th>
              <th scope='col' className='px-6 py-3'>
                Sender
              </th>
              <th scope='col' className='px-6 py-3'>
                Status
              </th>
              <th scope='col' className='px-6 py-3'>
                Date Created
              </th>
              <th scope='col' className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <InstantNotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}

            {!notifications.length && (
              <TableEndRecord colspan={8} text={noFoundText} />
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <Pagination
          total={count}
          currentPage={currentPage}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          noMoreNextPage={notifications.length === 0}
        />
      </div>
    </div>
  );
};

export default InstantNotificationsList;
