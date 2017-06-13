import { Observable } from "rxjs/Observable";
import { Filter } from "../interfaces/filter";
export declare class FiltersProvider {
    /**
     * This subject is the list of filters that changed last, not the whole list.
     * We emit a list rather than just one filter to allow batch changes to several at once.
     */
    private _change;
    readonly change: Observable<Filter<any>[]>;
    /**
     * List of all filters, whether they're active or not
     */
    private _all;
    /**
     * Tests if at least one filter is currently active
     */
    hasActiveFilters(): boolean;
    /**
     * Returns a list of all currently active filters
     */
    getActiveFilters(): Filter<any>[];
    /**
     * Registers a filter, and returns a deregistration function
     */
    add<F extends Filter<any>>(filter: F): RegisteredFilter<F>;
    /**
     * Accepts an item if it is accepted by all currently active filters
     */
    accepts(item: any): boolean;
}
export declare class RegisteredFilter<F extends Filter<any>> {
    filter: F;
    unregister: () => void;
    constructor(filter: F, unregister: () => void);
}
