import CircularProgress from '@mui/material/CircularProgress';

const Loader = () => {
  return (
      <div className="min-h-screen min-w-full flex items-center justify-center">
          <CircularProgress />
      </div>
  );
};

export default Loader;
