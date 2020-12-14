import * as React from "react";
import { useState } from "react";
import { ITreeNode, TreeActions } from "./types";
import { defaultTree } from "../../data";
import TreeNode from "./TreeNode";
import genKey from "../../utils/genKey";
import { IAction } from "../../types";

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

    return (
        <div>
            <TreeNode value={ tree } parent={ null } onChange={ changeTree } />
        </div>
    );
}