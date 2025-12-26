import React, { useRef, useEffect, useState } from "react";
import styles from "./examples.module.css";
import { sanitizeHtml } from "../../utils/html-sanitizer";

interface HtmlEditorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
}

export const HtmlEditor: React.FC<HtmlEditorProps> = ({
  value,
  onChange,
  label,
  required,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    // Обновляем содержимое только если оно действительно изменилось извне
    if (editorRef.current && editorRef.current.innerHTML !== value && !editorRef.current.matches(':focus')) {
      // Санитизируем HTML перед установкой в contentEditable
      const sanitized = sanitizeHtml(value || "");
      editorRef.current.innerHTML = sanitized;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      // Санитизируем HTML перед передачей в onChange
      const sanitized = sanitizeHtml(editorRef.current.innerHTML);
      onChange(sanitized);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const insertHTML = (html: string) => {
    document.execCommand("insertHTML", false, html);
    editorRef.current?.focus();
    handleInput();
  };

  return (
    <div className={styles.htmlEditorContainer}>
      <div className={styles.htmlEditorHeader}>
        <label>{label} {required && "*"}</label>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className={styles.togglePreviewButton}
        >
          {showPreview ? "Скрыть предпросмотр" : "Показать предпросмотр"}
        </button>
      </div>
      
      <div className={styles.htmlEditorToolbar}>
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className={styles.toolbarButton}
          title="Жирный"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className={styles.toolbarButton}
          title="Курсив"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => execCommand("underline")}
          className={styles.toolbarButton}
          title="Подчеркнутый"
        >
          <u>U</u>
        </button>
        <div className={styles.toolbarSeparator} />
        <button
          type="button"
          onClick={() => execCommand("formatBlock", "h1")}
          className={styles.toolbarButton}
          title="Заголовок 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => execCommand("formatBlock", "h2")}
          className={styles.toolbarButton}
          title="Заголовок 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => execCommand("formatBlock", "h3")}
          className={styles.toolbarButton}
          title="Заголовок 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => execCommand("formatBlock", "p")}
          className={styles.toolbarButton}
          title="Абзац"
        >
          P
        </button>
        <div className={styles.toolbarSeparator} />
        <button
          type="button"
          onClick={() => execCommand("insertUnorderedList")}
          className={styles.toolbarButton}
          title="Маркированный список"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => execCommand("insertOrderedList")}
          className={styles.toolbarButton}
          title="Нумерованный список"
        >
          1.
        </button>
        <div className={styles.toolbarSeparator} />
        <button
          type="button"
          onClick={() => insertHTML('<a href="https://" target="_blank">Ссылка</a>')}
          className={styles.toolbarButton}
          title="Вставить ссылку"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => insertHTML('<img src="https://" alt="Изображение" style="max-width: 100%;" />')}
          className={styles.toolbarButton}
          title="Вставить изображение"
        >
          🖼️
        </button>
        <div className={styles.toolbarSeparator} />
        <button
          type="button"
          onClick={() => execCommand("justifyLeft")}
          className={styles.toolbarButton}
          title="По левому краю"
        >
          ⬅
        </button>
        <button
          type="button"
          onClick={() => execCommand("justifyCenter")}
          className={styles.toolbarButton}
          title="По центру"
        >
          ⬌
        </button>
        <button
          type="button"
          onClick={() => execCommand("justifyRight")}
          className={styles.toolbarButton}
          title="По правому краю"
        >
          ➡
        </button>
      </div>

      <div className={styles.htmlEditorContent}>
        <div className={styles.htmlEditorCode}>
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            className={styles.htmlEditorEditable}
            suppressContentEditableWarning
          />
        </div>
        {showPreview && (
          <div className={styles.htmlEditorPreview}>
            <div className={styles.htmlEditorPreviewLabel}>Предпросмотр:</div>
            <div
              className={styles.htmlEditorPreviewContent}
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(value || "<em>Введите текст для предпросмотра</em>") }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
