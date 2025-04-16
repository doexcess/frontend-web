import api from '@/lib/api';
import { NotificationType } from '@/lib/utils';
import { NotificationResponse } from '@/types/notification';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface EmailNotificationState {
  loading: boolean;
  error: string | null;
}

const initialState: EmailNotificationState = {
  loading: false,
  error: null,
};

// Async Thunk for a single email notification dispatch
export const composeEmail = createAsyncThunk(
  'notification-dispatch/trigger',
  async (
    credentials: {
      title: string;
      message: string;
      type: NotificationType;
      is_scheduled: boolean;
      recipients: string[];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post(
        '/notification-dispatch/trigger',
        credentials
      );
      const { message } = response.data;
      return { message };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Notification dispatch failed'
      );
    }
  }
);

// Async Thunk for fetching all instant notifications
export const fetchInstant = createAsyncThunk(
  'notification-dispatch/fetch-instant',
  async (
    {
      page,
      limit,
      q,
      startDate,
      endDate,
    }: {
      page?: number;
      limit?: number;
      q?: string;
      startDate?: string;
      endDate?: string;
    },
    { rejectWithValue }
  ) => {
    const params: Record<string, any> = {};

    if (page !== undefined) params['pagination[page]'] = page;
    if (limit !== undefined) params['pagination[limit]'] = limit;
    if (q !== undefined) params['q'] = q;
    if (startDate !== undefined) params['startDate'] = startDate;
    if (endDate !== undefined) params['endDate'] = endDate;

    try {
      const { data } = await api.get<NotificationResponse>(
        `/notification-track/fetch-instant`,
        {
          params,
        }
      );

      return {
        instant_notifications: data.data,
        count: data.count,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch instant notifications'
      );
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(composeEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(composeEmail.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(composeEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default notificationSlice.reducer;
