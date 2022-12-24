import { WhereFilterOp } from "firebase/firestore";

export type ConditionalTypeForDocs = {
    key: string
    conditional: WhereFilterOp
    value: string
}