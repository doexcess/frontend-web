import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/api';
import Cookies from 'js-cookie';
import { PaymentResponse, Transaction } from '@/types/payment';
import {
  SubscriptionPlan,
  SubscriptionPlanResponse,
} from '@/types/subscription-plan';

interface SubscriptionPlanState {
  subscription_plans: SubscriptionPlan[];
  count: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
}

// Initial state
const initialState: SubscriptionPlanState = {
  subscription_plans: [],
  count: 0,
  loading: false,
  error: null,
  currentPage: 1,
};

// Async thunk to fetch paginated subscription plans
export const fetchAllSubscriptionPlans = createAsyncThunk(
  'subscription-plan/fetch-all',
  async ({
    page,
    limit,
    q,
    startDate,
    endDate,
    business_id,
  }: {
    page?: number;
    limit?: number;
    q?: string;
    startDate?: string;
    endDate?: string;
    business_id?: string;
  }) => {
    const params: Record<string, any> = {};

    if (page !== undefined) params['pagination[page]'] = page;
    if (limit !== undefined) params['pagination[limit]'] = limit;
    if (q !== undefined) params['q'] = q;
    if (startDate !== undefined) params['startDate'] = startDate;
    if (endDate !== undefined) params['endDate'] = endDate;
    if (business_id !== undefined) params['business_id'] = business_id;

    const { data } = await api.get<SubscriptionPlanResponse>(
      '/subscription-plan/fetch-all',
      {
        params,
      }
    );

    return {
      subscription_plans: data.data,
      count: data.count,
    };
  }
);

const subscriptionPlanSlice = createSlice({
  name: 'subscriptonPlan',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      // state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubscriptionPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSubscriptionPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription_plans = action.payload.subscription_plans;
        state.count = action.payload.count;
      })
      .addCase(fetchAllSubscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Failed to fetch subscription plans';
      });
  },
});

export const { setPage, setPerPage } = subscriptionPlanSlice.actions;
export default subscriptionPlanSlice.reducer;
