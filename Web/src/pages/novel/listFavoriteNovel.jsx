import StorysRow from '~/components/content/StorysRow';
import useGetFavoriteNovel from '~/hooks/novel/useGetFavoriteNovel.js';
import Navbar from '~/components/Navbar/Navbar';
import Footer from '~/components/footer/Footer';
import styled from 'styled-components';
function ListFavorite() {
    const { listNovels } = useGetFavoriteNovel();

    return (
        <ContainFavorite>
            <Navbar />
            <StorysRow storys={listNovels} title="Novel yêu thích" />
            <div className="space"></div>
            <Footer />
        </ContainFavorite>
    );
}

export default ListFavorite;

const ContainFavorite = styled.div`
    padding-top: 70px;
    .space {
        height: 38vh;
    }
`;
