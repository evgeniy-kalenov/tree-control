import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { ITreeNode, TreeActions } from "./types";
import { defaultTree } from "../../data";
import TreeNode, { Link } from "./TreeNode";
import genKey from "../../utils/genKey";
import { IAction } from "../../types";
import styled from "styled-components";

export default function Tree(): JSX.Element {

    const [ tree, setTree ] = useState<ITreeNode>(defaultTree);

    const changeTree = ({ type, payload }: IAction<TreeActions>) => {
        switch (type) {
            case TreeActions.create: {
                setTree({ id: genKey(), name: null });
                break;
            }
            case TreeActions.delete: {
                setTree(null);
                break;
            }
            case TreeActions.change: {
                setTree({ ...tree });
                break;
            }
        }
    };

    const jsonNode = useRef<HTMLPreElement>();
    const [ isTree, setIsTree ] = useState<boolean>(true);

    const treeView = (ev) => {
        ev.preventDefault();
        setIsTree(true);
    };

    const jsonView = (ev) => {
        ev.preventDefault();
        setIsTree(false);
    };

    useEffect(() => {
        if (!isTree) {
            const element = document.createTextNode(JSON.stringify(tree, null, 4));
            jsonNode.current.appendChild(element);
        }
    }, [isTree]);

    /*
    * Renders
    * */

    return (
        <Container>
            <LinksContainer>
                <ViewLink href={"#"} onClick={ treeView } selected={ isTree }>TREE</ViewLink>
                <ViewLink href={"#"} onClick={ jsonView } selected={ !isTree }>JSON</ViewLink>
            </LinksContainer>
            {
                isTree
                    ? <TreeNode value={ tree } parent={ null } onChange={ changeTree } />
                    : <pre ref={ jsonNode }></pre>
            }
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ViewLink = styled(Link)<{ selected: boolean }>`
  text-decoration: ${ ({ selected }) => !selected && "none" };
`;