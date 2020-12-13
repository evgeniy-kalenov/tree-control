import * as React from "react";
import { useState, useRef, useEffect } from "react";
import useEventListener from "../../hooks/useEventListener";
import styled from "styled-components";

export interface EditableTextProps {
    children: JSX.Element;
    editMode?: boolean;
    onChange?: (value: string) => void;
}

export default function EditableText(props: EditableTextProps): JSX.Element {

    const ownerRef = useRef<HTMLElement>();
    const inputRef = useRef<HTMLInputElement>();

    const [ editMode, setEditMode ] = useState<boolean>(props.editMode);
    const [ value, setValue ] = useState<string>();

    useEffect(() => {
        setValue(ownerRef.current?.textContent)
    }, []);

    useEffect(() => {
        if (editMode) {
            inputRef.current?.focus();
        } else {
            props?.onChange(value);
        }
    }, [editMode]);

    const inputHandler = (ev) => {
        setValue(ev.target.value.trim());
    };

    const keyUpHandler = (ev) => {
        if (ev.target === inputRef.current && ev.code === "Enter") {
            setEditMode(false);
        }
    };
    useEventListener("keyup", keyUpHandler);

    const clickHandler = (ev) => {
        if (ev.target !== inputRef.current && editMode) {
            setEditMode(false);
        }
    };
    useEventListener("click", clickHandler);

    /*
    * Renders
    * */

    const children = React.cloneElement(props.children, {
        ...props.children.props,
        onClick: () => setEditMode(true),
        ref: ref => ownerRef.current = ref
    });

    const input = (
        <input
            ref={ inputRef }
            type={"text"}
            value={ value || "" }
            onChange={ inputHandler }
        />
    );

    return editMode ? input : children;
}

const Input = styled.input<{ visible }>`
  display: ${ ({ visible }) => !visible && "none" };
`;