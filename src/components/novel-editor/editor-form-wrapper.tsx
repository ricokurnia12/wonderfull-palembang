import Editor from "@/components/novel-editor";
import { useMemo, useRef } from "react";

// SOLUSI 1: Gunakan useRef untuk mencegah re-initialization
const EditorWithForm = ({ field, contentname }: { field: any, contentname: string }) => {
    const isInitialized = useRef(false);
    const lastValue = useRef(field.value);

    // Hanya set initialValue sekali saat pertama kali
    const initialValue = useMemo(() => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            lastValue.current = field.value;
            return field.value;
        }
        return lastValue.current;
    }, []); // Empty dependency array - hanya run sekali

    return (
        <Editor
            contentname={contentname}
            initialValue={initialValue} // Gunakan nilai yang stabil
            onChange={(html) => {
                lastValue.current = html;
                field.onChange(html);
            }}
        />
    );
};

export default EditorWithForm