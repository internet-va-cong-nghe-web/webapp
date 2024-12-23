import StorysRow from '~/components/content/StorysRow';
import Navbar from '~/components/Navbar/Navbar';
import Footer from '~/components/footer/Footer';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import useSearchNovel from '~/hooks/novel/useSeachNovel';
function ResultNovel() {
    const { keyword } = useParams();
    const { searchResult } = useSearchNovel(keyword);
    return (
        <ContainFavorite>
            <Navbar />
            <StorysRow storys={searchResult} title={`Phim theo tìm kiếm:${keyword}`} />
            <div className="space"></div>
            <Footer />
        </ContainFavorite>
    );
}

export default ResultNovel;

const ContainFavorite = styled.div`
    padding-top: 70px;
    .space {
        height: 38vh;
    }
`;
