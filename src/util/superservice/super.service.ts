import { Injectable } from '@angular/core';

@Injectable()
export class SuperService {

    public handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}