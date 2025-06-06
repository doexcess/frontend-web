import { fetchCarts } from '@/redux/slices/cartSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useCart = () => {
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

  let { carts, loading, count } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(
      fetchCarts({
        page: currentPage,
        limit: perPage,
        ...(q && { q }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(params?.id && { business_id: params?.id as string }),
      })
    );
  }, [dispatch, currentPage, perPage, q, startDate, endDate]);

  const onClickNext = async () => {
    if (carts.length > 0) {
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
    carts,
    loading,
    count,
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

export default useCart;
