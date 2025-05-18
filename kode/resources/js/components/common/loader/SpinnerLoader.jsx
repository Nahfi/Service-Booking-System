const SpinnerLoader = ({ bg = "text-primary",size="md" }) => {
  return (
      <div
          className={`spinner-border spinner-border-${size} ${bg}`}
          role="status"
      >
          <span className="visually-hidden"></span>
      </div>
  );
};

export default SpinnerLoader;
