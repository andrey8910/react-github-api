import React, {useState} from 'react';
import {useAppSelector} from "../../hooks/redux.ts";
import {useActions} from "../../hooks/actions.ts";
import c from './FavouritesPage.module.scss';
import {IconButton, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const FavouritesPage: React.FC = (): React.ReactElement => {
    const {favourites} = useAppSelector(state => state.github);
    const {removeFavourite} = useActions();
    if(favourites.length === 0) return <p>No items</p>

    const removeOnFavourite = (event: React.MouseEvent<HTMLButtonElement>, item: string) => {
        event.preventDefault();
        removeFavourite(item);
    }

    return(
        <div className={c.page_container}>
            <ul className={c.repo_list}>
                {favourites.map(f => (
                    <li className={c.repo_list_item} key={f.repo_link}>
                        <Tooltip title="open repo page">
                            <a href={f.repo_link} target="_blank">{f.repo_name}</a>
                        </Tooltip>
                        <Tooltip title="Remove">
                            <IconButton onClick={(event) => removeOnFavourite(event,f.repo_link)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default FavouritesPage;