import './Item.css';
const Item = ({ key, onClick, value, rowIndex, colIndex }) => {
  const cellClass = value === 'X' ? 'cell-x' : value === 'O' ? 'cell-o' : '';
  return (
    <div
      key={key}
      className={`grid-item ${cellClass}`}
      onClick={() => onClick(rowIndex, colIndex)}
    >
      {value}
    </div>
  );
};

export default Item;
