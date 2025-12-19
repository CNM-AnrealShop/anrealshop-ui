import { RichTextEditor as MantineRichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { memo } from 'react';
import { Text, type TextInputProps } from '@mantine/core';

interface RichTextEditorProps {
    descriptionProps: TextInputProps; 
}

const TextEditor = memo(({ descriptionProps }: RichTextEditorProps) => {
    const { value, onChange, error } = descriptionProps;

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: (value as string) || '<p></p',
        onUpdate: ({ editor }) => {
            const syntheticEvent = {
                target: {
                    value: editor.getHTML(),
                },
            } as React.ChangeEvent<HTMLInputElement>; 
            onChange?.(syntheticEvent);
        },
    });

    return (
        <div>
            <label className="text-sm font-medium mb-2 block">
                Mô tả chi tiết <span className="text-red-500">*</span>
            </label>
            <MantineRichTextEditor editor={editor}>
                <MantineRichTextEditor.Toolbar sticky stickyOffset={60}>
                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.Bold />
                        <MantineRichTextEditor.Italic />
                        <MantineRichTextEditor.Underline />
                        <MantineRichTextEditor.Strikethrough />
                        <MantineRichTextEditor.ClearFormatting />
                        <MantineRichTextEditor.Highlight />
                        <MantineRichTextEditor.Code />
                    </MantineRichTextEditor.ControlsGroup>

                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.H1 />
                        <MantineRichTextEditor.H2 />
                        <MantineRichTextEditor.H3 />
                        <MantineRichTextEditor.H4 />
                    </MantineRichTextEditor.ControlsGroup>

                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.Blockquote />
                        <MantineRichTextEditor.Hr />
                        <MantineRichTextEditor.BulletList />
                        <MantineRichTextEditor.OrderedList />
                        <MantineRichTextEditor.Subscript />
                        <MantineRichTextEditor.Superscript />
                    </MantineRichTextEditor.ControlsGroup>

                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.Link />
                        <MantineRichTextEditor.Unlink />
                    </MantineRichTextEditor.ControlsGroup>

                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.AlignLeft />
                        <MantineRichTextEditor.AlignCenter />
                        <MantineRichTextEditor.AlignJustify />
                        <MantineRichTextEditor.AlignRight />
                    </MantineRichTextEditor.ControlsGroup>

                    <MantineRichTextEditor.ControlsGroup>
                        <MantineRichTextEditor.Undo />
                        <MantineRichTextEditor.Redo />
                    </MantineRichTextEditor.ControlsGroup>
                </MantineRichTextEditor.Toolbar>

                <MantineRichTextEditor.Content />
            </MantineRichTextEditor>
            {error && <Text size="xs" c="red" mt={4}>{error}</Text>}
        </div>
    );
});

export default TextEditor;