export interface IIdAndName {
    id: string;
    name: string;
}

export interface ITreeNode extends IIdAndName {
    attrs?: INodeAttribute[];
    nodes?: ITreeNode[];
}

export interface INodeAttribute extends IIdAndName  {
    value: string | number;
}

export enum TreeActions {
    create = "create",
    delete = "delete",
    change = "change"
}