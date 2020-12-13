import * as React from "react";
import styled from "styled-components";
import { INodeAttribute } from "./types";
import { Link } from "./TreeNode";
import { IAction, ActionType } from "../../types";

export interface NodeAttributeProps {
    value: INodeAttribute;
    onChange: (action: IAction<INodeAttribute>) => void;
}

export default function TreeNodeAttribute(props: NodeAttributeProps): JSX.Element {

    const { name, value } = props.value;

    const deleteAttribute = (ev) => {
        ev.preventDefault();
        props.onChange({
            type: ActionType.delete,
            payload: props.value
        });
    };

    return (
        <Container>
            <Content>
                <span>{ name }</span>
                <span>:</span>
                <span>{ value }</span>
            </Content>
            <Link href={"#"} onClick={ deleteAttribute }>Delete</Link>
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