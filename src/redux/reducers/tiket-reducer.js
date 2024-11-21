/* eslint-disable prettier/prettier */ /* eslint-disable linebreak-style */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchId = createAsyncThunk('searchId/fetchSearchId', async (_, { rejectedWithValue }) => {
  try {
    const responseId = await fetch('https://aviasales-test-api.kata.academy/search');
    const id = await responseId.json();
    return id;
  } catch (error) {
    return rejectedWithValue(error.message);
  }
});

const searchIdSlice = createSlice({
  name: 'searchId',
  initialState: { searchId: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state, action) => {
        state.searchId = null;
        state.error = action.payload;
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload.searchId;
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.searchId = null;
        state.error = action.payload;
      });
  },
});

const fetchTickets = async (id, rejectedWithValue) => {
  try {
    const responseTickets = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${id}`);
    if (!responseTickets.ok) {
      throw new Error('нет запроса');
    }
    const data = await responseTickets.json();
    return data;
  } catch (error) {
    if (error.message === 'нет запроса' || error.status === 500) {
      return fetchTickets(id);
    }
    return rejectedWithValue(error);
  }
};

export const fetchTicketsThunk = createAsyncThunk('tickets/fetchTickets', async (id, { rejectWithValue }) => {
  return fetchTickets(id, rejectWithValue);
});

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    arrayTickets: [],
    sortTickets: [],
    filterTickets: [],
    stop: false,
    isLoading: false,
    error: '',
    sliceNumber: 0,
    sortCheap: true,
    sortFast: false,
    sortAll: true,
    sortWithout: true,
    sortOne: true,
    sortTwo: true,
    sortThree: true,
  },
  reducers: {
    sliceTickets(state, action) {
      if (Number.isFinite(action.payload)) {
        state.arrayTickets = state.sortTickets.slice(0, action.payload);
      } else {
        state.sliceNumber += 5;
        state.arrayTickets = state.sortTickets.slice(0, state.sliceNumber);
      }
    },
    sortCheap(state) {
      state.sortCheap = true;
      state.sortFast = false;
    },
    sortFast(state) {
      state.sortFast = true;
      state.sortCheap = false;
    },
    sortAll(state) {
      if (!state.sortAll) {
        state.sortAll = true;
        state.sortWithout = true;
        state.sortOne = true;
        state.sortTwo = true;
        state.sortThree = true;
      } else {
        state.sortAll = false;
        state.sortWithout = false;
        state.sortOne = false;
        state.sortTwo = false;
        state.sortThree = false;
      }
    },
    sortWithout(state) {
      if (!state.sortWithout) {
        state.sortWithout = true;
      } else {
        state.sortWithout = false;
        state.sortAll = false;
      }
      if (state.sortWithout && state.sortOne && state.sortTwo && state.sortThree) {
        state.sortAll = true;
      }
    },
    sortOne(state) {
      if (!state.sortOne) {
        state.sortOne = true;
      } else {
        state.sortOne = false;
        state.sortAll = false;
      }
      if (state.sortWithout && state.sortOne && state.sortTwo && state.sortThree) {
        state.sortAll = true;
      }
    },
    sortTwo(state) {
      if (!state.sortTwo) {
        state.sortTwo = true;
      } else {
        state.sortTwo = false;
        state.sortAll = false;
      }
      if (state.sortWithout && state.sortOne && state.sortTwo && state.sortThree) {
        state.sortAll = true;
      }
    },
    sortThree(state) {
      if (!state.sortThree) {
        state.sortThree = true;
      } else {
        state.sortThree = false;
        state.sortAll = false;
      }
      if (state.sortWithout && state.sortOne && state.sortTwo && state.sortThree) {
        state.sortAll = true;
      }
    },
    sortTickets(state) {
      if (state.sortFast) {
        const fastTickets = state.filterTickets.sort((a, b) => {
          const sumADuration = a.segments.reduce((ac, item) => {
            const sum = ac + item.duration;
            return sum;
          }, 0);
          const sumBDuration = b.segments.reduce((ac, item) => {
            const sum = ac + item.duration;
            return sum;
          }, 0);
          return sumADuration - sumBDuration;
        });
        state.sortTickets = [...fastTickets];
      }
      if (state.sortCheap) {
        const cheapTickets = state.filterTickets.sort((a, b) => {
          return a.price - b.price;
        });
        state.sortTickets = [...cheapTickets];
      }
    },
    filtersTickets(state) {
      let resultTicketsArray = [];
      if (!state.sortAll && !state.sortWithout && !state.sortOne && !state.sortTwo && !state.sortThree) {
        state.filterTickets = [];
      } else {
        if (state.sortAll) {
          state.filterTickets = state.tickets;
        }
        if (state.sortWithout) {
          const sortWitoutStop = state.tickets.filter((ticket) => {
            const { segments } = ticket;
            const stopCount = segments.reduce((ac, item) => {
              const sum = ac + item.stops.length;
              return sum;
            }, 0);
            return stopCount === 0;
          });
          resultTicketsArray = [...resultTicketsArray, ...sortWitoutStop];
          state.filterTickets = resultTicketsArray;
        }
        if (state.sortOne) {
          const sortWithOneStop = state.tickets.filter((ticket) => {
            const { segments } = ticket;
            const result = segments.every((item) => {
              return item.stops.length === 1;
            });
            return result;
          });
          resultTicketsArray = [...resultTicketsArray, ...sortWithOneStop];
          state.filterTickets = resultTicketsArray;
        }
        if (state.sortTwo) {
          const sortWithTwoStops = state.tickets.filter((ticket) => {
            const { segments } = ticket;
            const result = segments.every((item) => {
              return item.stops.length === 2;
            });
            return result;
          });
          resultTicketsArray = [...resultTicketsArray, ...sortWithTwoStops];
          state.filterTickets = resultTicketsArray;
        }
        if (state.sortThree) {
          const sortWithThreeStops = state.tickets.filter((ticket) => {
            const { segments } = ticket;
            const result = segments.every((item) => {
              return item.stops.length === 3;
            });
            return result;
          });
          resultTicketsArray = [...resultTicketsArray, ...sortWithThreeStops];
          state.filterTickets = resultTicketsArray;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTicketsThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTicketsThunk.fulfilled, (state, action) => {
        if (Array.isArray(action.payload.tickets)) {
          state.tickets = [...state.tickets, ...action.payload.tickets];
        } else {
          state.error = 'ошибка запроса';
        }
        state.stop = action.payload.stop;
        if (state.stop) {
          state.isLoading = false;
        }
      })
      .addCase(fetchTicketsThunk.rejected, (state) => {
        state.error = 'ошибка запроса';
      });
  },
});

export const {
  sortCheap,
  sortFast,
  sliceTickets,
  filtersTickets,
  sortTickets,
  sortAll,
  sortWithout,
  sortOne,
  sortTwo,
  sortThree,
} = ticketsSlice.actions;
export const searchIdReducer = searchIdSlice.reducer;
export const ticketReducer = ticketsSlice.reducer;
