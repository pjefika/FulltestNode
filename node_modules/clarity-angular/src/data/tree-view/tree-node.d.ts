import { EventEmitter, QueryList } from "@angular/core";
import { AbstractTreeSelection } from "./abstract-tree-selection";
import { TreeSelectionService } from "./providers/treeSelection.service";
export declare class TreeNode extends AbstractTreeSelection {
    treeSelectionService: TreeSelectionService;
    constructor(parent: TreeNode, treeSelectionService: TreeSelectionService);
    model: any;
    _children: QueryList<TreeNode>;
    /**
     * Generates the child TreeNodes array from the ContentChildren QueryList
     * @returns {TreeNode[]|Array}
     */
    readonly children: AbstractTreeSelection[];
    nodeSelected: boolean;
    nodeSelectedChange: EventEmitter<boolean>;
    selectedChanged(): void;
    /**
     * Returns true if a TreeNode contains child TreeNodes and false otherwise.
     * @returns {boolean}
     */
    readonly hasChildren: boolean;
    expanded: boolean;
    expandedChange: EventEmitter<boolean>;
    /**
     * Determines the caret direction based on the expanded/collapsed
     * state of the TreeNode.
     *
     * Returns "down" when collapsed and "right" when expanded
     * @returns {string|string}
     */
    readonly caretDirection: string;
    isExpandable: boolean;
    loading: boolean;
    /**
     * Clicking on the caret sign calls this method.
     * Toggles the expanded/collapsed state of the TreeNode
     */
    toggleExpand(): void;
    /**
     * Returns if the TreeNode is selectable or not
     * @returns {boolean}
     */
    readonly selectable: boolean;
    isCompact: boolean;
}
