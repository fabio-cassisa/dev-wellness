import { createSlice } from '@reduxjs/toolkit';

import { getCurrentDate } from '../helpers';

const initialState = {
  historicalData: {},
};

export const historical = createSlice({
  name: 'historical',
  initialState,
  reducers: {
    loadHistoricalData: state => {
      // Only load date-keyed entries (YYYY-MM-DD format) from localStorage
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      const currentDate = getCurrentDate();
      const historicalData = {};

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (datePattern.test(key) && key !== currentDate) {
          try {
            historicalData[key] = JSON.parse(localStorage.getItem(key));
          } catch {
            // skip malformed entries
          }
        }
      }

      state.historicalData = historicalData;
    },
  },
});

export const { loadHistoricalData } = historical.actions;
