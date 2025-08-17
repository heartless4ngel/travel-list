import type { ItemObj } from "./App";

function Stats({ items }: { items: ItemObj[] }) {
  const total = items.length;
  const packed = items.filter(i => i.packed).length;
  const pct = total ? Math.round((packed / total) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        You have {total} items on your list, and you already packed {packed} (
        {pct}%)
      </em>
    </footer>
  );
}

export default Stats;
