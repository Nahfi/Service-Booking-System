const SwitchWrapper = ({ id, label }) => {
  return (
    <label htmlFor={id} className="switch-wrapper">
      {label && <span className="text-dark">{label}</span>}
      <span className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id={id}
        />
      </span>
    </label>
  );
};

export default SwitchWrapper;
