import * as React from "react";
import styled from "styled-components";
import Attribute from "../Attribute/Attribute";
import { ITreeNode, INodeAttribute } from "./types";
import genKey from "../../utils/genKey";

export interface TreeNodeProps {
    value: ITreeNode;
}

export default function TreeNode(props: TreeNodeProps): JSX.Element {

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
                    <TreeNode key={ genKey() } value={ node } />
                )) }
            </Children>
        );
    };

    const nodeRender = ({ name, attrs = [], nodes = [] }: ITreeNode): JSX.Element => (
        <Container>
            <ContainerInner>
                <Button>+</Button>
            </ContainerInner>
            <ContainerInner>
                <Content>
                    <Name>{ name }</Name>
                    <Link href={"#"}>Delete</Link>
                </Content>

                { attrsRender(attrs) }
                <Link href={"#"}>Add attribute</Link>

                { childrenRender(nodes) }

            </ContainerInner>
        </Container>
    );

    return nodeRender(props.value);
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