import type { ItemObj } from "./App";
import Item from "./Item";

interface PackingListProps {
  items: ItemObj[];
  onDelete(id: number): void;
  onTogglePacked(id: number): void;
}

function PackingList({ items, onDelete, onTogglePacked }: PackingListProps) {
  return (
    <div className="list">
      <ul>
        {items.map(item => (
          <Item
            key={item.id}
            item={item}
            onDelete={onDelete}
            onTogglePacked={onTogglePacked}
          />
        ))}
      </ul>
    </div>
  );
}

export default PackingList;
