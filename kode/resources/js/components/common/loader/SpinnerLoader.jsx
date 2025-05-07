const SpinnerLoader = ({ bg = "text-primary" }) => {
  return (
    <div className={`spinner-border spinner-border-sm ${bg}`} role="status">
      <span className="visually-hidden"></span>
    </div>
  );
};

export default SpinnerLoader;
