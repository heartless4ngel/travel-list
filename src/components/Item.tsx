import type { ItemObj } from "./App";

interface ItemProps {
  item: ItemObj;
  onDelete(id: number): void;
  onTogglePacked(id: number): void;
}

function Item({ item, onDelete, onTogglePacked }: ItemProps) {
  return (
    <li>
      <label style={{ cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => onTogglePacked(item.id)}
          style={{ marginRight: 8 }}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.description} × {item.quantity}
        </span>
      </label>
      <button
        type="button"
        onClick={() => onDelete(item.id)}
        aria-label={`Remove ${item.description}`}
      >
        ❌
      </button>
    </li>
  );
}

export default Item;
