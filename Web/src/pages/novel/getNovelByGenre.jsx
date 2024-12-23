import StorysRow from '~/components/content/StorysRow';
import Navbar from '~/components/Navbar/Navbar';
import Footer from '~/components/footer/Footer';
import styled from 'styled-components';
import useGetNovelByGenreId from '~/hooks/novel/useGetNovelByGenreId';
import { useParams } from 'react-router-dom';

function FindNovelByGenre() {
    const { id } = useParams();
    const { listNovels, genreName } = useGetNovelByGenreId(id);
    console.log(genreName);
    return (
        <ContainFavorite>
            <Navbar />
            <StorysRow storys={listNovels} title={genreName} />
            <div className="space"></div>
            <Footer />
        </ContainFavorite>
    );
}

export default FindNovelByGenre;

const ContainFavorite = styled.div`
    padding-top: 70px;
    .space {
        height: 38vh;
    }
`;
