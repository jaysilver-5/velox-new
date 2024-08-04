import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  surname: '',
  emailAddress: '',
  phoneNumber: '',
  clerkId: '',
  username: '',
  referred: false,
  referralId: '',
  bankname: '',
  accountNumber: '',
  transactions: [],
  referralActivities: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setSurname: (state, action) => {
      state.surname = action.payload;
    },
    setEmailAddress: (state, action) => {
      state.emailAddress = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setClerkId: (state, action) => {
      state.clerkId = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setReferred: (state, action) => {
      state.referred = action.payload;
    },
    setReferralId: (state, action) => {
      state.referralId = action.payload;
    },
    setBankname: (state, action) => {
      state.bankname = action.payload;
    },
    setAccountNumber: (state, action) => {
      state.accountNumber = action.payload;
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    setReferralActivities: (state, action) => {
      state.referralActivities = action.payload;
    },
  },
});

export const {
  setFirstName,
  setSurname,
  setEmailAddress,
  setPhoneNumber,
  setClerkId,
  setUsername,
  setReferred,
  setReferralId,
  setBankname,
  setAccountNumber,
  setTransactions,
  setReferralActivities,
} = userSlice.actions;

export default userSlice.reducer;
