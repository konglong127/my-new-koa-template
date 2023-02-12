import { CopyDocs } from "./index";
import { needCopy } from "../../config";

for (let i in needCopy) {
  CopyDocs(needCopy[i]);
}