import * as React from "react";
import styled from "styled-components";
import { INodeAttribute } from "../Tree/types";

export interface NodeAttributeProps {
    value: INodeAttribute;
}

export default function Attribute(props: NodeAttributeProps): JSX.Element {

    const { name, value } = props.value;

    return (
        <Container>
            <Content>
                <span>{ name }</span>
                <span>:</span>
                <span>{ value }</span>
            </Content>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  > span {
    padding-right: 5px;
    font-size: 16px;
  }
`;