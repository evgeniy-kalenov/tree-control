import * as React from "react";
import { useState } from "react";
import { ITreeNode } from "./types";
import { defaultTree } from "../../data";
import TreeNode from "./TreeNode";

export default function Tree(): JSX.Element {

    const [ tree, setTree ] = useState<ITreeNode>(defaultTree);

    return (
        <div>
            <TreeNode value={ tree } />
        </div>
    );
}