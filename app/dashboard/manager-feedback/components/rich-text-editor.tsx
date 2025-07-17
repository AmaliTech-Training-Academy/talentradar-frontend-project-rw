'use client';

import React, { useEffect, useRef,  } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import { RichTextEditorProps } from '@/lib/types';

const RichTextEditor:React.FC<RichTextEditorProps> =
  ({ value, onChange }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
      if (editorRef.current && !quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
              ['clean'],
            ],
          },
          placeholder: 'Write something...',
        });

        quillRef.current.on('text-change', () => {
          if (quillRef.current) {
            onChange(quillRef.current.root.innerHTML);
          }
        });
      }
    }, [onChange]);

    useEffect(() => {
      if (quillRef.current && value !== quillRef.current.root.innerHTML) {
        quillRef.current.root.innerHTML = value || '';
      }
    }, [value]);

    return <div ref={editorRef} style={{ height: '300px' }} />;
  }

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
