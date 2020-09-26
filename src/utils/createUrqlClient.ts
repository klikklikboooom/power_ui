import { dedupExchange, fetchExchange } from "urql";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  MeQuery,
  MeDocument,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { pipe, tap } from "wonka";
import { Exchange } from "urql";
import Router from "next/router";

export const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error) {
        if (error?.message.toLowerCase().includes("not authenticated")) {
          Router.replace("/login");
        }
      }
    })
  );
};

// export interface PaginationParams {
//   offsetArgument?: string;
//   limitArgument?: string;
// }

// export const cursorPagination  = ({
//   cursorArgument = 'cursor'): Resolver => {
//   // const compareArgs = (
//   //   fieldArgs: Variables,
//   //   connectionArgs: Variables
//   // ): boolean => {
//   //   for (const key in connectionArgs) {
//   //     if (key === offsetArgument || key === limitArgument) {
//   //       continue;
//   //     } else if (!(key in fieldArgs)) {
//   //       return false;
//   //     }

//   //     const argA = fieldArgs[key];
//   //     const argB = connectionArgs[key];

//   //     if (
//   //       typeof argA !== typeof argB || typeof argA !== 'object'
//   //         ? argA !== argB
//   //         : stringifyVariables(argA) !== stringifyVariables(argB)
//   //     ) {
//   //       return false;
//   //     }
//   //   }

//   //   for (const key in fieldArgs) {
//   //     if (key === offsetArgument || key === limitArgument) {
//   //       continue;
//   //     }
//   //     if (!(key in connectionArgs)) return false;
//   //   }

//   //   return true;
//   // };

//   // return (_parent, fieldArgs, cache, info) => {
//   //   const { parentKey: entityKey, fieldName } = info;

//   //   const allFields = cache.inspectFields(entityKey);
//   //   const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
//   //   const size = fieldInfos.length;
//   //   if (size === 0) {
//   //     return undefined;
//   //   }

//   //   const visited = new Set();
//   //   let result: NullArray<string> = [];
//   //   let prevOffset: number | null = null;

//   //   for (let i = 0; i < size; i++) {
//   //     const { fieldKey, arguments: args } = fieldInfos[i];
//   //     if (args === null || !compareArgs(fieldArgs, args)) {
//   //       continue;
//   //     }

//   //     const links = cache.resolveFieldByKey(entityKey, fieldKey) as string[];
//   //     const currentOffset = args[offsetArgument];

//   //     if (
//   //       links === null ||
//   //       links.length === 0 ||
//   //       typeof currentOffset !== 'number'
//   //     ) {
//   //       continue;
//   //     }

//   //     if (!prevOffset || currentOffset > prevOffset) {
//   //       for (let j = 0; j < links.length; j++) {
//   //         const link = links[j];
//   //         if (visited.has(link)) continue;
//   //         result.push(link);
//   //         visited.add(link);
//   //       }
//   //     } else {
//   //       const tempResult: NullArray<string> = [];
//   //       for (let j = 0; j < links.length; j++) {
//   //         const link = links[j];
//   //         if (visited.has(link)) continue;
//   //         tempResult.push(link);
//   //         visited.add(link);
//   //       }
//   //       result = [...tempResult, ...result];
//   //     }

//   //     prevOffset = currentOffset;
//   //   }

//   //   const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
//   //   if (hasCurrentPage) {
//   //     return result;
//   //   } else if (!(info as any).store.schema) {
//   //     return undefined;
//   //   } else {
//   //     info.partial = true;
//   //     return result;
//   //   }
//   // };
// };

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",
  fetchOptions: { credentials: "include" } as const,
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              () => ({ me: null })
            );
          },
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query: any) => {
                if (result.login.errors) {
                  return query;
                } else {
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },

          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query: any) => {
                if (result.register.errors) {
                  return query;
                } else {
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});
