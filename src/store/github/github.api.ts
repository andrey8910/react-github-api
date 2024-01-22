import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IRepo, IServerResponse, IUser} from "../../models/models.ts";

export const githubApi = createApi({
    reducerPath: 'github/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
    searchUsers: build.query<IUser[], string>({
        query: (search: string) => ({
            url: `search/users`,
            params:{
                q: search,
                per_page: 20
            }
        }),
        transformResponse: (response: IServerResponse) => response.items,
        transformErrorResponse: (response, arg) => {
            return {
                originalArg: arg,
                status: response.status,
                data: response.data
            }
        }
    }),
    getUserRepos: build.query<IRepo[], string>({
        query: (username: string) => ({
            url: `users/${username}/repos`
        })
    })
})
});

export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi;