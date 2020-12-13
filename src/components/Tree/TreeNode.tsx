import * as React from "react";
import styled from "styled-components";
import Attribute from "../Attribute/Attribute";
import { ITreeNode, INodeAttribute, INodePayload } from "./types";
import genKey from "../../utils/genKey";
import { IAction, ActionType } from "../../types";

export interface TreeNodeProps {
    value: ITreeNode;
    parent?: ITreeNode;
    onChange: (action: IAction<INodePayload>) => void;
}

export default function TreeNode(props: TreeNodeProps): JSX.Element {

    const current = props.value;

    const createNode = (ev) => {
        if (!current) {
            /* создается корневая нода */
            props.onChange({
                type: ActionType.create,
                payload: {
                    root: null,
                    value: { name: "New node" }
                }
            });
            return;
        }
        if (!current?.nodes) {
            current.nodes = [];
        }
        current.nodes.unshift({ name: "New node" });
        props.onChange({ type: ActionType.update });
    };

    const deleteNode = (ev) => {
        ev.preventDefault();

        if (!props.parent) {
            /* удаляется корневая нода */
            props.onChange({ type: ActionType.delete });
            return;
        }

        const { nodes = [] } = props.parent;
        const index = nodes.findIndex(({ name }) => name === current.name);
        if (index > -1) {
            nodes.splice(index, 1);
            props.onChange({ type: ActionType.update });
        }
    };

    /*
    * Renders
    * */

    const attrsRender = (attrs: INodeAttribute[]): JSX.Element => {
        return Boolean(attrs?.length) && (
            <AttributeList>
                { attrs.map(attribute => (
                    <li key={ genKey() }>
                        <Attribute value={ attribute } />
                    </li>
                )) }
            </AttributeList>
        );
    };

    const childrenRender = (nodes: ITreeNode[]): JSX.Element => {
        return Boolean(nodes?.length) && (
            <Children>
                { nodes.map(node => (
                    <TreeNode key={ genKey() } value={ node } parent={ props.value } onChange={ props.onChange } />
                )) }
            </Children>
        );
    };

    const nodeRender = (node: ITreeNode): JSX.Element => (
        <Container>
            <ContainerInner>
                <Button onClick={ createNode }>+</Button>
            </ContainerInner>
            { Boolean(node) && (
                <ContainerInner>
                    <Content>
                        <Name>{ node.name }</Name>
                        <Link href={"#"} onClick={ deleteNode }>Delete</Link>
                    </Content>

                    { attrsRender(node.attrs) }
                    <Link href={"#"}>Add attribute</Link>

                    { childrenRender(node.nodes) }

                </ContainerInner>
            )}
        </Container>
    );

    return nodeRender(current);
}

export const Link = styled.a`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const Container = styled.div`
  display: flex;
  margin-top: 12px;
`;

const ContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;

const Button = styled.button`
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  font-size: 20px;
  padding-right: 10px;
`;

const AttributeList = styled.ul`
  margin: 0;
  padding-left: 8px;
  padding-top: 4px;
  list-style: none;
`;

const Children = styled.div`
  display: flex;
  flex-direction: column;
`;