import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
import Modal from "./Modal";

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

function App() {
  const [items, setItems] = useState<ItemObj[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Mostra la modale invece di cancellare subito
  const handleRequestClearList = () => setIsModalOpen(true);

  const confirmClearList = () => {
    setItems([]);
    setIsModalOpen(false);
  };

  const cancelClearList = () => setIsModalOpen(false);

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAdd={handleAdd} />
        <PackingList
          items={items}
          onDelete={handleDelete}
          onTogglePacked={handleTogglePacked}
          onRequestClearList={handleRequestClearList}
        />
        <Stats items={items} />
        <Modal
          isOpen={isModalOpen}
          title="Conferma eliminazione"
          description="Sei sicuro di voler eliminare tutti gli elementi?"
          confirmLabel="Elimina tutto"
          cancelLabel="Annulla"
          onConfirm={confirmClearList}
          onCancel={cancelClearList}
        />
      </div>
    </>
  );
}

export default App;
