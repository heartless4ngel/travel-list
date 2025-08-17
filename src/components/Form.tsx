import { useState } from "react";
import type { NewItemInput } from "./App";

interface FormProps {
  onAdd(input: NewItemInput): void;
}

function Form({ onAdd }: FormProps) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.trim()) return;

    onAdd({ description: description.trim(), quantity });
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      <select
        value={quantity}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setQuantity(Number(e.target.value))
        }
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
