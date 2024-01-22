import c from './SearchPage.module.scss';
import React, {useEffect, useRef, useState} from "react";
import {useDebounce} from "../../hooks/debounce.ts";
import {useLazyGetUserReposQuery, useSearchUsersQuery} from "../../store/github/github.api.ts";
import {IFetchError, IRepo, IUser} from "../../models/models.ts";
import {RepoCard} from "../../components/repo-card/RepoCard.tsx";
//import {Notification} from "../../components/notification/Notification.tsx";
import {createPortal} from "react-dom";
import {Notification} from "../../components/notification/Notification.tsx";
import Portal from "../../components/Portal.tsx";


export function SearchPage(): React.ReactElement{
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] =useState(false);
    const debounced = useDebounce(search);

    const {isError, isLoading, data= [], error} = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true,
    });

    const [fetchRepos, {isLoading: areReposLoading, data: repos = []}] = useLazyGetUserReposQuery();
    const inputEl = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [fetchError, setFetchError] = useState<IFetchError | null>(null);
    const [selectUser, setSelectUser] = useState<IUser | null>(null)
    const [toglee, setToglee] = useState(false)

    useEffect(() => {
        setDropdown(debounced.length > 3 && data.length > 0)
    }, [debounced, data]);

    const clickHandler = (user: IUser) => {
        fetchRepos(user.login).then((result) => {
            if(result.isSuccess){
                setSelectUser(user);
                setDropdown(false);
            }
        });

    }

    useEffect(() => {
        if(isFocused && data.length > 0){
            setDropdown(true)
        }
    }, [isFocused, dropdown, data, repos]);

    useEffect(() => {
        if(isError){
            if ('status' in error) {
                const err: IFetchError = {
                    status: error.status,
                    data: error.data as  {
                        documentation_url : string,
                        message: string
                    }
                }
               setFetchError(err)
               setToglee(true)

            }
            else {
                console.log('error.message', JSON.stringify(error))

            }
        }
        else{
            setToglee(false)
            setFetchError(null)
        }
    }, [error, isError]);

    function addPortal(){
       //createPortal(<h2>TEST</h2>, document.body, '1')
        setToglee(!toglee)
    }


    return(
        <div className={c.search_page}>
            <div className={c.search_input_block}>

                <input
                    ref={inputEl}
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder='search for Github username...'
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    style={{ boxShadow: isError ? '0 0 3px 1px red': '' }}

                />

                {isLoading && <p>loading</p>}


                {dropdown &&  <ul className={c.dropdown_block}>
                    { isLoading && <p>Loading...</p>}
                    { data?.map((user: IUser) => (
                        <li
                            key={user.id}
                            className={c.result_item}
                            onClick={(event) => {
                                event.preventDefault()
                                clickHandler(user)
                            }}
                        >
                            <span className={c.ava}>
                                <img src={user.avatar_url} alt="avatar"/>
                            </span>

                            {user.login}
                        </li>
                    )) }
                </ul>}

            </div>
            <div className={c.search_result_block}>
                { data?.length === 0 && search.length > 3 && <p>user "{search}" is not found</p>}
                {data?.length > 0 && repos.length === 0 && <p>{search} is not found repos</p> }
                {areReposLoading && <p>Repos are loading...</p>}
                {data?.length > 0 && selectUser &&
                    <div className={c.user_info}>
                        <div className={c.user_ava}>
                            <img src={selectUser.avatar_url} alt="ava"/>
                        </div>
                        <div>
                            <p>username : <span>{selectUser.login}</span></p>
                            <a href={selectUser.html_url} target='_blank'>open user page</a>
                            <p>repos : <span>{repos.length}</span></p>
                        </div>
                    </div>
                }
                {!dropdown && data?.length > 0 &&
                    <div className={c.user_repo_list}>
                        {repos?.map((repo: IRepo) => <RepoCard key={repo.id} repo={repo} /> )}
                    </div>
                }

            </div>
            <button onClick={addPortal}>create portal</button>
            {toglee &&
                <Portal>
                    <Notification type='error' message={fetchError?.data.message} close={() => setToglee(false)}/>
                </Portal>
            }

        </div>
    )
}