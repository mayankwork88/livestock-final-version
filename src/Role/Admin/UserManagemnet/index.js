import { Container } from "@mui/material";
import { CustomModal, TabPane } from "../../../ComponentsV2";
import AdminUIContainer from "../../../layout/AdminUIContainer";
import AddUserContent from "./AddUserContent";
import { useUserManagementContext } from "./context/UserManagementContext";
import ShowUsers from "./ShowUsers";
import { useState } from "react";
import useGetAllUsers from "./hooks/useGetAllUsers";
import useDeleteUser from "./hooks/useDeleteUser";
import toast from "react-hot-toast";
import { getTabText, handleSearchQuery } from "./utils/utils";

const BreadcrumbData = [
  {
    label: "User Management",
    link: "users",
  },
];

const UserManagement = () => {
  const { addUserModal, handleAddUserModalCancel, handleAddUserModalOpen } =
    useUserManagementContext();

  const [pagination, setPagination] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState();
  const [deleteUserId, setDeleteUserId] = useState(null);
  const { isLoading, error, data, dataLength } = useGetAllUsers(
    pagination,
    handleDeleteUser,
    searchTerm
  );

  const { isDeleting, deleteUser } = useDeleteUser();

  if (error) {
    toast.error("ERROR " + error?.message);
  }

  function handleDeleteUser(userId) {
    setDeleteUserId(userId);
    setShowModal(true);
  }

  const handleUserDeleteConfirm = () => {
    deleteUser(deleteUserId, {
      onSuccess: (data) => {
        if (data?.status === 200) {
          setShowModal(false);
        }
      },
    });
  };

  return (
    <>
      <AdminUIContainer BreadcrumbData={BreadcrumbData}>
        <Container maxWidth="xl" sx={{ marginTop: 3, pb: 0 }}>
          <TabPane
            text={getTabText("users", dataLength)}
            // btnText="Add User"
            btnIcon={true}
            hover={true}
            search={true}
            onSearch={(term) => handleSearchQuery(term, setSearchTerm)}
            minWidth="12rem"
            onBtnClick={handleAddUserModalOpen}
          />
          <ShowUsers
            isLoading={isLoading}
            data={data}
            dataLength={dataLength}
            pagination={pagination}
            showModal={showModal}
            isDeleting={isDeleting}
            setPagination={setPagination}
            setShowModal={setShowModal}
            setDeleteUserId={setDeleteUserId}
            handleUserDeleteConfirm={handleUserDeleteConfirm}
          />
          <CustomModal
            content={<AddUserContent />}
            openModal={addUserModal}
            handleClose={handleAddUserModalCancel}
          />
        </Container>
      </AdminUIContainer>
    </>
  );
};

export default UserManagement;
