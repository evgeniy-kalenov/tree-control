import * as React from "react";
import styled from "styled-components";
import TreeNodeAttribute from "./TreeNodeAttribute";
import { ITreeNode, INodeAttribute, TreeActions } from "./types";
import genKey from "../../utils/genKey";
import { IAction } from "../../types";
import EditableText from "../EditableText/EditableText";

export interface TreeNodeProps {
    value: ITreeNode;
    parent?: ITreeNode;
    onChange: (action: IAction<TreeActions>) => void;
}

export default function TreeNode(props: TreeNodeProps): JSX.Element {

    const current = props.value;
    const parent = props.parent;

    const changeNode = () => {
        props.onChange({ type: TreeActions.change });
    };

    const createNode = (ev) => {
        const node: ITreeNode = { id: genKey(), name: null };

        if (!current) {
            /* создается корневая нода */
            props.onChange({
                type: TreeActions.create,
                payload: { value: node }
            });
            return;
        }

        if (!current?.nodes) current.nodes = [];
        current.nodes.unshift(node);
        changeNode();
    };

    const deleteNode = (ev?) => {
        ev?.preventDefault();

        if (!props.parent) {
            /* удаляется корневая нода */
            props.onChange({ type: TreeActions.delete });
            return;
        }

        const { nodes = [] } = props.parent;
        const index = nodes.findIndex(({ name }) => name === current.name);
        if (index > -1) {
            nodes.splice(index, 1);
            changeNode();
        }
    };

    const changeNodeName = (value: string) => {
        if (!current.name && !value) {
            /* удаляем пустую ноду */
            deleteNode();
        }
        if (value && current.name !== value) {
            current.name = value;
            changeNode();
        }
    };

    const changeAttribute = ({ type, payload }: IAction<TreeActions>) => {
        switch (type) {
            case TreeActions.create: {
                if (!current?.attrs) current.attrs = [];
                current.attrs.push(payload);
                changeNode();
                break;
            }
            case TreeActions.delete: {
                const index = current.attrs.findIndex(({ name }) => name === payload.name);
                if (index > -1) {
                    current.attrs.splice(index, 1);
                    changeNode();
                }
                break;
            }
            case TreeActions.change: {
                current.attrs = current.attrs.map(attr => {
                    return attr.id === payload.id ? payload : attr;
                });
                changeNode();
                break;
            }
        }
    };

    const createAttribute = (ev) => {
        ev.preventDefault();
        changeAttribute({
            type: TreeActions.create,
            payload: { id: genKey(), name: null, value: null }
        });
    };

    /*
    * Renders
    * */

    const attrsRender = (attrs: INodeAttribute[]): JSX.Element => {
        return Boolean(attrs?.length) && (
            <AttributeList>
                { attrs.map(attribute => (
                    <li key={ genKey() }>
                        <TreeNodeAttribute value={ attribute } onChange={ changeAttribute } />
                    </li>
                )) }
            </AttributeList>
        );
    };

    const childrenRender = (nodes: ITreeNode[]): JSX.Element => {
        return Boolean(nodes?.length) && (
            <Children>
                { nodes.map(node => (
                    <TreeNode key={ genKey() }
                              value={ node }
                              parent={ props.value }
                              onChange={ props.onChange } />
                )) }
            </Children>
        );
    };

    const nodeRender = (node: ITreeNode): JSX.Element => {
        const showActions = node?.name;
        return (
            <Container>
                <ContainerInner>
                    <Button onClick={ createNode }>+</Button>
                </ContainerInner>
                { Boolean(node) && (
                    <ContainerInner>
                        <Content>
                            <EditableText editMode={ !Boolean(node.name) } onChange={ changeNodeName }>
                                <Name>{ node.name }</Name>
                            </EditableText>
                            <Link href={"#"} onClick={ deleteNode }>Delete</Link>
                        </Content>

                        { attrsRender(node.attrs) }
                        { showActions && <Link href={"#"} onClick={ createAttribute }>Add attribute</Link> }

                        { childrenRender(node.nodes) }

                    </ContainerInner>
                )}
            </Container>
        );
    };

    return nodeRender(current);
}

export const Link = styled.a`
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-left: 8px;
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