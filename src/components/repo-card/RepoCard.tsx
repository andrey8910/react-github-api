import {IFavouritesState, IRepo} from "../../models/models.ts";
import c from './RepoCard.module.scss';
import React, {useState} from "react";
import {useActions} from "../../hooks/actions.ts";
import {useAppSelector} from "../../hooks/redux.ts";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {IconButton, Tooltip} from "@mui/material";


interface IRepoCardProps {
    repo: IRepo
}
export function RepoCard(props: IRepoCardProps){
    const {repo} = props;
    const {favourites} = useAppSelector(state => state.github);
    const {addFavourite, removeFavourite} = useActions();
    const [isFav, setIsFav] = useState(!!favourites.find(r => r.repo_link === repo.html_url));

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const favRepo:IFavouritesState = {
            repo_name: repo.full_name,
            repo_link:repo.html_url
        }
        addFavourite(favRepo);
        setIsFav(true)
    };

    const removeOnFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        removeFavourite(repo.html_url);
        setIsFav(false)
    }
    return(
        <div className={c.card}>
            <a className={c.card_link} href={repo.html_url} target="_blank">
                <h3 className={c.card_title}>{repo.full_name}</h3>
                <p className={c.card_subtitle}>
                    <span>Forks: {repo.forks}</span>
                    <span>Watchers: {repo.watchers}</span>
                </p>
                <p className={c.card_description}>{repo?.description}</p>
            </a>

            {isFav ? <Tooltip title="remove from favorites">
                        <IconButton  onClick={removeOnFavourite} aria-label="remove-fav" color="secondary">
                            <FavoriteIcon/>
                        </IconButton>
                    </Tooltip>
                 :  <Tooltip title="add to favorites">
                        <IconButton onClick={addToFavourite} aria-label="add-fav" >
                            <FavoriteBorderIcon/>
                        </IconButton>
                    </Tooltip>
            }

        </div>
    )
}