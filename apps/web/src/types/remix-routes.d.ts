declare module "remix-routes" {
  type IsAny<T> = (
    unknown extends T
      ? [keyof T] extends [never] ? false : true
      : false
  );
  type URLSearchParamsInit = string | string[][] | Record<string, string> | URLSearchParams;
  type ExportedQuery<T> = IsAny<T> extends true ? URLSearchParamsInit : T;
  type Query<T> = IsAny<T> extends true ? [URLSearchParamsInit?] : [T];

  export interface Routes {
  
    "/": {
      params: {
      
      },
      query: ExportedQuery<import('../app/root').SearchParams>,
    };
  
    "/:page": {
      params: {
      
        page: string | number;
      
      },
      query: ExportedQuery<import('../app/routes/$page').SearchParams>,
    };
  
    "/*": {
      params: {
      
        "*": string | number;
      
      },
      query: ExportedQuery<import('../app/routes/$').SearchParams>,
    };
  
  }

  type RoutesWithParams = Pick<
    Routes,
    {
      [K in keyof Routes]: Routes[K]["params"] extends Record<string, never> ? never : K
    }[keyof Routes]
  >;

  export declare function $path<
    Route extends keyof Routes,
    Rest extends {
      params: Routes[Route]["params"];
      query?: Routes[Route]["query"];
    }
  >(
    ...args: Rest["params"] extends Record<string, never>
      ? [route: Route, query?: Rest["query"]]
      : [route: Route, params: Rest["params"], query?: Rest["query"]]
  ): string;

  export declare function $params<
    Route extends keyof RoutesWithParams,
    Params extends RoutesWithParams[Route]["params"]
  >(
      route: Route,
      params: { readonly [key: string]: string | undefined }
  ): {[K in keyof Params]: string};
}