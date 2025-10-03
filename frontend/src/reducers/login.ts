interface LoginAction {
  type: string;
  status: boolean;
}

const loginReducer = (state: boolean = false, action: LoginAction): boolean => {
  // console.log(state,action);
  switch (action.type) {
    case "CHECK_LOGIN":
      return action.status;

    default:
      return state;
  }
};
export default loginReducer;
