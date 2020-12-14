import * as React from "react";
import styled from "styled-components";
import { INodeAttribute, TreeActions } from "./types";
import { Link } from "./TreeNode";
import { IAction } from "../../types";
import EditableText from "../EditableText/EditableText";
import { useState } from "react";

export interface NodeAttributeProps {
    value: INodeAttribute;
    onChange?: (action: IAction<TreeActions, INodeAttribute>) => void;
}

export default function TreeNodeAttribute(props: NodeAttributeProps): JSX.Element {

    const attribute = props.value;

    if (!attribute) {
        throw new Error("Attribute not found");
    }

    const { name, value } = attribute;

    const deleteAttribute = (ev) => {
        ev.preventDefault();
        props.onChange({
            type: TreeActions.delete,
            payload: attribute
        });
    };

    const changeAttribute = (changes: Partial<INodeAttribute>) => {
        props.onChange({
            type: TreeActions.change,
            payload: { ...attribute, ...changes }
        });
    };

    const changeAttributeName = (value: string) => {
        if (value && attribute.name !== value) {
            changeAttribute({ name: value });
        }
    };

    const changeAttributeValue = (value: string) => {
        if (value && attribute.value !== value) {
            changeAttribute({ value });
        }
    };

    const [ hover, setHover ] = useState<boolean>(false);
    const mouseEnter = () => setHover(true);
    const mouseLeave = () => setHover(false);

    /*
    * Renders
    * */

    return (
        <Container onMouseEnter={ mouseEnter } onMouseLeave={ mouseLeave }>
            <Content>
                <EditableText editMode={ !name } onChange={ changeAttributeName }>
                    <span>{ name }</span>
                </EditableText>
                { Boolean(name) && (
                    <>
                        <span>:</span>
                        <EditableText editMode={ !value } onChange={ changeAttributeValue }>
                            <span>{ value }</span>
                        </EditableText>
                    </>
                )}
            </Content>
            <Link href={"#"} onClick={ deleteAttribute } hidden={ !hover }>Delete</Link>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;

  > span:not(:last-child) {
    padding-right: 5px;
    font-size: 16px;
  }
`;