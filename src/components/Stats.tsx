import type { ItemObj } from "./App";

function Stats({ items }: { items: ItemObj[] }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  }

  const total = items.length;
  const packed = items.filter(i => i.packed).length;
  const pct = total ? Math.round((packed / total) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        {pct === 100
          ? "You got everything! Ready to go 🛩️"
          : `You have ${total} items on your list, and you already packed ${packed} (
        ${pct}%)`}
      </em>
    </footer>
  );
}

export default Stats;
