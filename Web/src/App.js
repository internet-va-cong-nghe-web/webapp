import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';

import GenresPage from './pages/genre/getAllGenres';
import CreateGenre from './pages/genre/createGenre';
import UpdateGenre from './pages/genre/updateGenre';
import DeleteGenre from './pages/genre/deleteGenre';



import FilmInforPage from './pages/film/getAllFilmsInfor';
import CreateFilmInfor from './pages/film/createFilm';
import EditFilmPage from './pages/film/editFilm';
import CreateEpisode from './pages/episode/createEpisode';
import DetailFilm from './pages/film/detailFilms';
import WatchFilm from './pages/film/watchingFilm';
import Register from './pages/auth/register';
import LoginPage from './pages/auth/login';
import ListFavorite from './pages/film/listFavoriteFilm';
import { useContext } from 'react';
import { UserContext } from './context/authContext';
import useGetAccess from './hooks/auth/useGetAccess';
import HomePageAdmin from './pages/pageAdmin';
import DenyAccess from './components/access/403';
import FindFilmByGenre from './pages/film/getFilmByGenre';
import ResultFilm from './pages/film/resultFilm';
import Profile from './pages/auth/profile';
import ChangePass from './pages/auth/changePass';

// import NovelInforPage from './pages/novel/getAllNovelsInfor';
// import CreateNovelInfor from './pages/novel/createNovel';
// import EditNovelPage from './pages/novel/editNovel';
// import CreateEpisode from './pages/episode/createEpisode';
// import DetailNovel from './pages/novel/detailNovels';
// import WatchNovel from './pages/novel/watchingNovel';
// import Register from './pages/auth/register';
// import LoginPage from './pages/auth/login';
// import ListFavorite from './pages/novel/listFavoriteNovel';
// import { useContext } from 'react';
// import { UserContext } from './context/authContext';
// import useGetAccess from './hooks/auth/useGetAccess';
// import HomePageAdmin from './pages/pageAdmin';
// import DenyAccess from './components/access/403';
// import FindNovelByGenre from './pages/novel/getNovelByGenre';
// import ResultNovel from './pages/novel/resultNovel';
// import Profile from './pages/auth/profile';
// import ChangePass from './pages/auth/changePass';


function App() {
    const { allowAccess } = useContext(UserContext);
    useGetAccess();
    const { user } = useContext(UserContext);

    return (
        <Routes>
            <Route path="/" element={ <HomePage /> } />

            {/* <Route path="/admin" element={allowAccess === true ? <HomePageAdmin /> : <DenyAccess />} /> */}
            <Route path="/admin" element={allowAccess === true ? <HomePageAdmin /> : <DenyAccess />} />

            <Route path="/genres" element={<GenresPage />} />
            <Route path="/createGenre" element={<CreateGenre />} />
            <Route path="/updateGenre/:id" element={<UpdateGenre />} />
            <Route path="/deleteGenre/:id" element={<DeleteGenre />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/changePass" element={<ChangePass/>} />

            <Route path="/favorite-film" element={<ListFavorite />} />
            <Route path="/filmsInfor/" element={<FilmInforPage />} />
            <Route path="/filmCreate/" element={<CreateFilmInfor />} />
            <Route path="/film/edit/:id" element={<EditFilmPage />} />
            <Route path="/film/delete/:id" element={<CreateFilmInfor />} />
            {/* id cua movie */}
            <Route path="/film/createEpisode/:id" element={<CreateEpisode />} />
            <Route path="/film/detail/:id" element={<DetailFilm />} />
            <Route path="/film/watch/:id" element={<WatchFilm />} />
            <Route path="/find-by-genre/:id" element={<FindFilmByGenre />} />
            <Route path="/search-film/:keyword" element={<ResultFilm />} />


            {/* id cua novel
            <Route path="/favorite-novel" element={<ListFavorite />} />
            <Route path="/novelsInfor/" element={<NovelInforPage />} />
            <Route path="/novelCreate/" element={<CreateNovelInfor />} />
            <Route path="/novel/edit/:id" element={<EditNovelPage />} />
            <Route path="/novel/delete/:id" element={<CreateNovelInfor />} />
            
            <Route path="/novel/createEpisode/:id" element={<CreateEpisode />} />
            <Route path="/novel/detail/:id" element={<DetailNovel />} />
            <Route path="/novel/watch/:id" element={<WatchNovel />} />
            <Route path="/find-by-genre/:id" element={<FindNovelByGenre />} />
            <Route path="/search-novel/:keyword" element={<ResultNovel />} /> */}

            {/* login */}
            <Route path="/register" element={user ? <HomePage /> : <Register />} />
            <Route path="/login" element={user ? <HomePage /> : <LoginPage />} />
        </Routes>
    );
}

export default App;
