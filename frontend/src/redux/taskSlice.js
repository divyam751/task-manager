import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk("task/getTasks", async () => {
  const response = await fetch("http://localhost:8000/api/tasks");
  const taskData = await response.json();
  return taskData;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    apiData: [],
    filteredTasks: [],
    loading: false,
  },
  reducers: {
    searchQuery: (state, { payload }) => {
      const query = payload.toLowerCase();
      state.filteredTasks = state.apiData.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
    },

    setCustomFilter: (state, { payload }) => {
      state.filteredTasks = [];
      for (let query in payload) {
        if (payload[query]) {
          const data = state.apiData.filter(
            (item) =>
              item.brand.toLowerCase().includes(query.toLowerCase()) ||
              item.category.toLowerCase().includes(query.toLowerCase()) ||
              item.title.toLowerCase().includes(query.toLowerCase()) ||
              item.description.toLowerCase().includes(query.toLowerCase())
          );
          state.filteredTasks = [...state.filteredTasks, ...data];
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTasks.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.apiData = payload;
    });
    builder.addCase(getTasks.rejected, (state, error) => {
      state.loading = true;
      console.log(error);
    });
  },
});

export const { searchQuery, setCustomFilter } = taskSlice.actions;
export default taskSlice.reducer;
