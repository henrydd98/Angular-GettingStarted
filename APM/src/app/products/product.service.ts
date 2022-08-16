import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap, catchError, throwError } from "rxjs";
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root' // root so that we can access in whole app
})
export class ProductService{
    private productUrl = 'api/products/products.json'; //path in angular.json assets
    constructor(private http: HttpClient){}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse){ //dont need return type cuz angular knows
        let errorMessage = ''; //might send msg to somewhere other than console
        if(err.error instanceof ErrorEvent){
            //if client-side/network error occured
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            //backend returned unsuccessful response code, 
            //check response body for clue
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(()=>errorMessage);
    }
}