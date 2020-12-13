export interface ITreeNode {
    name: string;
    attrs?: INodeAttribute[];
    nodes?: ITreeNode[];
}

export interface INodeAttribute {
    name: string;
    value: string | number;
}

export interface INodePayload {
    root: ITreeNode;
    value: ITreeNode;
}