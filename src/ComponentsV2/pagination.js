import { Pagination,Stack } from "@mui/material";

export default function CustomPagination({
  showFirstButton,
  showLastButton,
  size,
  count,
  onPageChange,
  page
}) {
  const handlePageChange = (event, page) => {
    onPageChange(page)
  }


  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(count)} //
        color="primary"
        page={page}
        onChange={handlePageChange}
        showFirstButton={showFirstButton?showFirstButton:true}
        showLastButton={showLastButton?showLastButton:true}
        size={size}
      />
    </Stack>
  );
}

 