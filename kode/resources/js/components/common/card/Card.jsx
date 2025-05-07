import "../card/card.scss";

// const Card = ({ children, cardTitle, ...props }) => {
//   const attributes = {
//     ...props,
//     className: `card ${props.className || ""}`,
//   };
//   return (
//     <div {...attributes}>
//       {cardTitle && (
//         <div className="card-header">
//           <h4 className="card-title">{cardTitle}</h4>
//         </div>
//       )}

//       <div className="card-body">{children}</div>
//     </div>
//   );
// };

// export default Card;



const Card = ({ children, ...props }) => {
  const attributes = {
    ...props,
    className: `card rounded-xl ${props.className || ""}`,
  };
  return <div {...attributes}>{children}</div>;
};

export default Card;


