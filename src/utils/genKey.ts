import * as shortid from "shortid";

export default function genKey(): string {
    return shortid.generate();
}