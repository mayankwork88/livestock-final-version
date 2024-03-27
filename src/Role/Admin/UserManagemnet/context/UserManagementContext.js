import { createContext, useContext, useState } from "react";

const UserManagementContext = createContext();

const userInitialState = {
  username: "",
  email: "",
  mobile: null,
};

export const UserManagementContextProvider = ({ children }) => {
  const [addNewUser, setAddNewUser] = useState(userInitialState);
  const [addUserModal, setAddUserModal] = useState(false);

  const handleAddNewUserChange = (data) => {
    const { name, value } = data.target;
    setAddNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUserModalCancel = () => {
    setAddUserModal(false);
    setAddNewUser(userInitialState);
  };

  const handleAddUserModalOpen = () => {
    setAddUserModal(true);
  };

  const handleAddNewUser = async () => {};
  return (
    <UserManagementContext.Provider
      value={{
        addNewUser,
        handleAddNewUserChange,
        handleAddNewUser,
        addUserModal,
        handleAddUserModalCancel,
        handleAddUserModalOpen,
        setAddUserModal
      }}
    >
      {children}
    </UserManagementContext.Provider>
  );
};

export const useUserManagementContext = () => useContext(UserManagementContext);
