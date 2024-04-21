import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import axios from "axios"

const initialState = {
    list: []
}

export const favoriteSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.list = action.payload
        },
    }
})

export const fetchData = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "get",
                url: `http://localhost:3000/my-favorites/${id}`,
                headers: {
                  Authorization: "Bearer " + localStorage.access_token,
                },
              });
        
              dispatch(setData(data));
        } catch (error) {
            Swal.fire({
                text: error.response.data.message,
            });
        }
    }
}

export const deleteFavoriteById = (id) => {
    return async () => {
        try {
            await axios({
              method: "delete",
              url: `http://localhost:3000/my-favorites/${id}`,
              headers: {
                Authorization: "Bearer " + localStorage.access_token,
              },
            });
      
            Swal.fire({
              text: "successfully delete favorite",
              icon: "success",
            });
          } catch (error) {
            Swal.fire({
              text: error.response.data.message,
              icon: "error",
            });
          }
    }
}
export const{
    setData
} = favoriteSlice.actions

export default favoriteSlice.reducer;