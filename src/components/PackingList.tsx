import { useState } from "react";
import type { ItemObj } from "./App";
import Item from "./Item";

interface PackingListProps {
  items: ItemObj[];
  onDelete(id: number): void;
  onTogglePacked(id: number): void;
  onRequestClearList(): void;
}

function PackingList({
  items,
  onDelete,
  onTogglePacked,
  onRequestClearList: onRequestClearList,
}: PackingListProps) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems: ItemObj[] = items;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a: ItemObj, b: ItemObj) =>
        a.description.localeCompare(b.description)
      );
  }

  if (sortBy === "packed") {
    sortedItems = items.sort((a: ItemObj, b: ItemObj) => {
      return Number(a.packed) - Number(b.packed);
    });
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item
            key={item.id}
            item={item}
            onDelete={onDelete}
            onTogglePacked={onTogglePacked}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by descritpion</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onRequestClearList}>Clear list</button>
      </div>
    </div>
  );
}

export default PackingList;
