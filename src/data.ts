import { ITreeNode } from "./components/Tree/types";
import genKey from "./utils/genKey";

export const defaultTree: ITreeNode = {
    id: genKey(),
    name: "Россия",
    nodes: [
        {
            id: genKey(),
            name: "Пермь",
            attrs: [
                { id: genKey(), name: "Регион", value: 59 },
                { id: genKey(), name: "Код", value: 342 }
            ],
            nodes: [
                { id: genKey(), name: "Ленинский р-н" },
                {
                    id: genKey(),
                    name: "Дзержинский р-н",
                    nodes: [
                        { id: genKey(), name: "ул. Малкова" },
                        { id: genKey(), name: "ул. Рабочая" },
                        { id: genKey(), name: "ул. Плеханова" },
                    ]
                },
            ]
        },
        { id: genKey(), name: "Екатеринбург" },
        {
            id: genKey(),
            name: "Москва",
            nodes: [
                { id: genKey(), name: "Измайлово" },
                { id: genKey(), name: "Щукино" },
                { id: genKey(), name: "Царицино" }
            ]
        }
    ]
};