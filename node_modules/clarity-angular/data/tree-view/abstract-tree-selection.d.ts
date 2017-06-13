/**
 * Author: Eudes
 */
import { TreeSelection } from "./tree-selection";
import { TreeSelectionService } from "./providers/treeSelection.service";
export declare abstract class AbstractTreeSelection {
    parent: AbstractTreeSelection;
    treeSelectionService: TreeSelectionService;
    constructor(parent: AbstractTreeSelection, treeSelectionService: TreeSelectionService);
    model: any;
    readonly abstract children: AbstractTreeSelection[];
    abstract selectedChanged(): void;
    private _selected;
    private _indeterminate;
    selected: boolean;
    readonly indeterminate: boolean;
    childChanged(): void;
    parentChanged(selected: boolean): void;
    toTreeSelection(): TreeSelection;
    matchTreeSelection(selectionArray: TreeSelection[]): void;
}
