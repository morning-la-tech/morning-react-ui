import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './richTextEditor.module.css';

const RichTextEditor = () => {
  const [text, setText] = useState('');
  const quillRef = useRef<ReactQuill>(null);

  const handleChange = (value: string) => {
    setText(value);
  };

  const modules = {
    toolbar: {
      container: '#toolbar',
    },
  };

  return (
    <div className={styles.wrapper}>
      <style>
        {`.ql-snow {
          border: none !important;
        }
        /* styles.css */
        .ql-snow .ql-tooltip {
            border-radius: 6px;
            border: 1px solid #E5E9EB;
            background: #FFF;
            box-shadow: 0px 0px 1px rgba(26, 32, 36, 0.32), 0px 4px 8px rgba(91, 104, 113, 0.24);
        }
        `}
      </style>
      <ReactQuill
        ref={quillRef}
        theme='snow'
        value={text}
        onChange={handleChange}
        modules={modules}
        className={styles.input}
      />
      <div id='toolbar' className={styles.controls}>
        <button className={`ql-bold ${styles.control}`}>Bold</button>
        <button className={`ql-italic ${styles.control}`}>Italic</button>
        <button className={`ql-link ${styles.control}`}>Link</button>
        <button className={`ql-strike ${styles.control}`}>Strike</button>
        <button className={`ql-underline ${styles.control}`}>Underline</button>
      </div>
    </div>
  );
};

export default RichTextEditor;
