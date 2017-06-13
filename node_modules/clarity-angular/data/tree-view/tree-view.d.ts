import { AfterContentInit, EventEmitter, QueryList } from "@angular/core";
import { TreeSelectionService } from "./providers/treeSelection.service";
import { TreeSelection } from "./tree-selection";
import { TreeNode } from "./tree-node";
export declare class TreeView implements AfterContentInit {
    private treeSelectionService;
    children: QueryList<TreeNode>;
    isCompact: boolean;
    generateTreeSelection(): TreeSelection[];
    /**
     * Verifies whether the input received is valid or not.
     * Throws an error if invalid.
     * @param selectionArray
     */
    verifyInput(selectionArray: TreeSelection[]): void;
    populateTree(selectionArray: TreeSelection[]): void;
    private initialInput;
    selected: TreeSelection[];
    selectedChange: EventEmitter<TreeSelection[]>;
    constructor(treeSelectionService: TreeSelectionService);
    ngAfterContentInit(): void;
}
