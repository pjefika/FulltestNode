import { Observable } from "rxjs/Observable";
import { TreeSelection } from "../tree-selection";
export declare class TreeSelectionService {
    selectable: boolean;
    private _change;
    readonly change: Observable<boolean>;
    notify(): void;
    verifyTreeSelection(selection: TreeSelection): void;
}
