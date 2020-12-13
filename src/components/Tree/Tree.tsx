import * as React from "react";
import { useState } from "react";
import { ITreeNode, INodePayload } from "./types";
import { defaultTree } from "../../data";
import TreeNode from "./TreeNode";
import { IAction, ActionType } from "../../types";

export default function Tree(): JSX.Element {

    const [ tree, setTree ] = useState<ITreeNode>(defaultTree);

    const changeTree = (action: IAction<INodePayload>) => {
        const { type, payload } = action;
        let value = { ...tree };
        if (type === ActionType.create) {
            value = payload?.value;
        }
        if (type === ActionType.delete) {
            value = null;
        }
        setTree(value);
    };

    return (
        <div>
            <TreeNode value={ tree } parent={ null } onChange={ changeTree } />
        </div>
    );
}