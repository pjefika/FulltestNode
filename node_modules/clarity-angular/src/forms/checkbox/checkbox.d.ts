import { EventEmitter } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";
export declare class Checkbox implements ControlValueAccessor {
    _id: string;
    readonly id: string;
    name: string;
    disabled: boolean;
    inline: boolean;
    _checked: boolean;
    checked: boolean;
    private _indeterminate;
    indeterminate: boolean;
    indeterminateChange: EventEmitter<boolean>;
    change: EventEmitter<boolean>;
    toggle(): void;
    writeValue(value: any): void;
    private onChangeCallback;
    registerOnChange(onChange: any): void;
    private onTouchedCallback;
    registerOnTouched(onTouched: any): void;
    touch(): void;
}
