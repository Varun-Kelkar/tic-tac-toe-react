import './Item.css';
const Item = ({ key, onClick, value, rowIndex, colIndex }) => {
  return (
    <div
      key={key}
      className="grid-item"
      onClick={() => onClick(rowIndex, colIndex)}
    >
      {value}
    </div>
  );
};

export default Item;
