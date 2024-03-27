import {Backdrop,CircularProgress} from '@mui/material';

export default function BackdropLoader({open}) {
 
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={() => true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}