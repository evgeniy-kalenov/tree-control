import { ITreeNode } from "./components/Tree/types";

export const defaultTree: ITreeNode = {
    name: "Россия",
    nodes: [
        {
            name: "Пермь",
            attrs: [
                { name: "Регион", value: 59 },
                { name: "Телефонный код", value: 342 }
            ],
            nodes: [
                { name: "Ленинский р-н" },
                {
                    name: "Дзержинский р-н",
                    nodes: [
                        { name: "ул. Малкова" },
                        { name: "ул. Рабочая" },
                        { name: "ул. Плеханова" },
                    ]
                },
            ]
        },
        { name: "Екатеринбург" },
        {
            name: "Москва",
            nodes: [
                { name: "Измайлово" },
                { name: "Щукино" },
                { name: "Царицино" }
            ]
        }
    ]
};