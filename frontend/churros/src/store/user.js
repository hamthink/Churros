import { atom } from "recoil";

export const userInfoState = atom({
  key: "userInfoState",
  default: {
    userId: null,
    isUserInterestsInitialized: false,
  },
  effects: [
    ({ setSelf }) => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setSelf(JSON.parse(storedUserInfo));
      }
    },
    ({ onSet }) => {
      onSet(newValue => {
        localStorage.setItem("userInfo", JSON.stringify(newValue));
        console.log(`userInfo has set to ${newValue}`)
      });
    },
  ]
});
