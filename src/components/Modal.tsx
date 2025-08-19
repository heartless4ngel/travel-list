import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

function Modal({
  isOpen,
  title,
  description,
  confirmLabel = "OK",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstBtnRef = useRef<HTMLButtonElement>(null);
  const lastBtnRef = useRef<HTMLButtonElement>(null);

  // when modal is open, scroll is not available
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // initial focus and tab handling
  useEffect(() => {
    if (!isOpen) return;
    firstBtnRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
      if (e.key === "Tab") {
        const active = document.activeElement;
        if (e.shiftKey && active === firstBtnRef.current) {
          e.preventDefault();
          lastBtnRef.current?.focus();
        } else if (!e.shiftKey && active === lastBtnRef.current) {
          e.preventDefault();
          firstBtnRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="modal-overlay" onClick={onCancel} aria-hidden={!isOpen}>
      <div
        className="modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby={description ? "modal-desc" : undefined}
        onClick={stop}
      >
        <h2 id="modal-title" className="modal__title">
          {title}
        </h2>
        {description && (
          <p id="modal-desc" className="modal__desc">
            {description}
          </p>
        )}

        <div className="modal__actions">
          <button
            ref={firstBtnRef}
            className="btn btn-ghost"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            ref={lastBtnRef}
            className="btn btn-danger"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
