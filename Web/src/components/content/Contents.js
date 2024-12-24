import React from 'react';
import StorysRow from './StorysRow';
import useGetGenres from '~/hooks/genre/useGetGenres';
import useGetAllNovel from '~/hooks/novel/useGetAllNovel';

function Content() {
    const { genreList } = useGetGenres();
    const { novelList } = useGetAllNovel();

    const filterNovelByGenre = (genreId) => {
        return novelList.filter((novel) => novel.genres.includes(genreId));
    };

    return (
        <div>
            {genreList.map((genre) => (
                <StorysRow key={genre._id} storys={filterNovelByGenre(genre._id)} title={genre.name} />
            ))}

        </div>
    );
}

export default Content;
