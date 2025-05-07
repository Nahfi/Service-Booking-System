import "./preloader.scss";

const Preloader = () => {
  return (
    <div className="preloader-wrapper">
      <div className="progress-loader"></div>
      <div>
        <h2>Loading...</h2>
      </div>
    </div>
  );
};

export default Preloader;
