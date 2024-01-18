
import { Card as CardInterface } from "./card";
export interface List {
    name: string,
    code: string,
    cards?: CardInterface[] | null
  }