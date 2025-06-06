import { PurchaseItemType } from '@/lib/utils';
import {
  fetchDistinctPayments,
  fetchPayments,
} from '@/redux/slices/paymentSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface UseDistinctPaymentsProps {
  purchase_type?: PurchaseItemType;
}
const useDistinctPayments = ({
  purchase_type,
}: UseDistinctPaymentsProps = {}) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const queryParams = new URLSearchParams(searchParams.toString());

  // Get page from URL or default to 1
  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('limit')) || 10;
  const [q, setQ] = useState(searchParams.get('q'));
  const [startDate, setStartDate] = useState(searchParams.get('startDate'));
  const [endDate, setEndDate] = useState(searchParams.get('endDate'));

  let { distinctPayments, distinctLoading, countDistinct } = useSelector(
    (state: RootState) => state.payment
  );

  useEffect(() => {
    dispatch(
      fetchDistinctPayments({
        page: currentPage,
        limit: perPage,
        ...(q && { q }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(params?.id && { business_id: params?.id as string }),
        ...(purchase_type && { purchase_type }),
      })
    );
  }, [dispatch, currentPage, perPage, q, startDate, endDate]);

  const onClickNext = async () => {
    if (distinctPayments.length > 0) {
      queryParams.set('page', encodeURIComponent(currentPage + 1));
      router.push(`?${queryParams}`);
    }
  };

  const onClickPrev = async () => {
    if (currentPage - 1 > 0) {
      queryParams.set('page', encodeURIComponent(currentPage - 1));
      router.push(`?${queryParams}`);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (input: string) => {
    setQ(input);

    if (input!.trim()) {
      queryParams.set('q', encodeURIComponent(input!));
    } else {
      queryParams.delete('q'); // Remove 'q' if input is empty
    }

    router.push(`?${queryParams.toString()}`);
  };

  // Handle filter by date submission
  const handleFilterByDateSubmit = (
    startDate: string,
    endDate: string,
    setOpenModal: (value: React.SetStateAction<boolean>) => void
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);

    setOpenModal;
  };

  // Handle Refresh
  const handleRefresh = () => {
    setStartDate('');
    setEndDate('');
    setQ('');
    queryParams.delete('q');
    queryParams.delete('page');
    router.push(`?${queryParams.toString()}`);
  };

  return {
    distinctPayments,
    distinctLoading,
    countDistinct,
    currentPage,
    q,
    startDate,
    endDate,
    onClickNext,
    onClickPrev,
    handleSearchSubmit,
    handleFilterByDateSubmit,
    handleRefresh,
  };
};

export default useDistinctPayments;
