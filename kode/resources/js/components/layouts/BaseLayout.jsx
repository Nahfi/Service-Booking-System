
const BaseLayout = ({ children,...props }) => {
  
    const attributes = {
        ...props,
        className: `base-layout main-body-scroll ${props.className || ""}`,
    };
  return (
    <div {...attributes}>
      <div className="container-fluid px-0">{children}</div>
    </div>
  );
}

export default BaseLayout