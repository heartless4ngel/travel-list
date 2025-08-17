import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export type ItemObj = {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
};

export type NewItemInput = {
  description: string;
  quantity: number;
};

const initialItems: ItemObj[] = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

function App() {
  const [items, setItems] = useState<ItemObj[]>(initialItems);

  const handleAdd = ({ description, quantity }: NewItemInput) => {
    setItems(prev => [
      ...prev,
      { id: Date.now(), description, quantity, packed: false },
    ]);
  };

  const handleDelete = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const handleTogglePacked = (id: number) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, packed: !i.packed } : i))
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAdd={handleAdd} />
      <PackingList
        items={items}
        onDelete={handleDelete}
        onTogglePacked={handleTogglePacked}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
