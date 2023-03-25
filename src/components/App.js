import Navbar from "./Navbar";
import Moviecard from "./Moviecard";
import React from "react";
import { data } from "../data";
import { addMovies, showFavourites } from "../actions";

class App extends React.Component {
    componentDidMount() {
        const { store } = this.props;
        store.subscribe(() => {
            this.forceUpdate();
        })

        store.dispatch(addMovies(data))
    }

    isMovieFavourite = (movie) => {
        const { favourites } = this.props.store.getState();

        const index = favourites.indexOf(movie);

        if (index !== -1) {
            return true;
        }

        return false;
    }

    onChangeTab = (val) => {
        this.props.store.dispatch(showFavourites(val));
    }

    render() {
        const { list, favourites, showFavourites } = this.props.store.getState();
        console.log(this.props.store.getState());

        const displayMovies = showFavourites ? favourites : list;

        return (
            <>
                <Navbar />
                <div className="main">
                    <div className="tabs">
                        <div className={`tab ${showFavourites ? " " : "active-tabs"}`} onClick={() => this.onChangeTab(false)}>Movie</div>
                        <div className={`tab ${showFavourites ? "active-tabs" : ""}`} onClick={() => this.onChangeTab(true)}>Favourite</div>
                    </div>
                    <div className="list">
                        {displayMovies.map((movie, index) => {
                            return <Moviecard movie={movie} key={index} dispatch={this.props.store.dispatch} isFavourite={this.isMovieFavourite(movie)} />;
                        })}
                    </div>
                </div>
                {displayMovies.length === 0 ? <div className="no-movies">No movies to display!</div> : null}
            </>
        );
    }
}


export default App;