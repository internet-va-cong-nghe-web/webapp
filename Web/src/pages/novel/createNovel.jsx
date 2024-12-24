import React, { useEffect, useState, useContext } from 'react';
import useCreateNovel from '~/hooks/novel/useCreateNovel';
import Footer from '~/components/footer/Footer';
import styled from 'styled-components';
import DenyAccess from '~/components/access/403';
import { UserContext } from '~/context/authContext';
import NavbarAdmin from '~/components/Navbar/NavbarAdmin';

function CreateNovelPage() {
    const { allowAccess } = useContext(UserContext);
    const [novelInfor, setNovelInfor] = useState({
        name: '',
        genres: [],
        country: '',
        author: '',
        status: 'dang cap nhat',
        poster_img: null,
        releaseDate: '',
        description: '',
        totalChap: '',
    });
    console.log(novelInfor);

    const [genresList, setGenresList] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const { createNovel } = useCreateNovel();

    useEffect(() => {
        const getGenreList = async () => {
            const response = await fetch('/Api/api/genres/');
            const data = await response.json();
            if (response.ok) {
                setGenresList(data.datas);
            } else {
                console.log(response.message);
            }
        };
        getGenreList();
    }, []);

    const handleChange = (genreId) => {
        const isChecked = selectedGenres.includes(genreId);
        if (isChecked) {
            setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
        } else {
            setSelectedGenres([...selectedGenres, genreId]);
        }
    };
    console.log(selectedGenres)
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createNovel({ ...novelInfor, genres: selectedGenres });
        window.location.href = '/novelsInfor';
    };

    return (
        <CreateNovel>
            {allowAccess === true ? (
                <>
                    <NavbarAdmin />
                    <div className="container">
                        <div className="createNovelContairner">
                            <form className="formCreateNovel" onSubmit={handleSubmit}>
                                <label>Novel name</label>
                                <input
                                    value={novelInfor.name}
                                    type="text"
                                    name="name"
                                    onChange={(e) => {
                                        setNovelInfor({ ...novelInfor, name: e.target.value });
                                    }}
                                />
                                <label>Genres</label>
                                <div className="genresContainer">
                                    {genresList.map((genre) => {
                                        return (
                                            <div
                                                key={genre._id}
                                                style={{ display: 'flex', justifyContent: 'space-between' }}
                                            >
                                                <label>{genre.name}</label>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedGenres.includes(genre._id)}
                                                    onChange={() => handleChange(genre._id)}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                                <label>Novel country</label>
                                <input
                                    value={novelInfor.country}
                                    type="text"
                                    name="country"
                                    onChange={(e) => {
                                        setNovelInfor({ ...novelInfor, country: e.target.value });
                                    }}
                                />

                                <label>Novel author</label>
                                <input
                                    value={novelInfor.author}
                                    type="text"
                                    name="author"
                                    onChange={(e) => {
                                        setNovelInfor({ ...novelInfor, director: e.target.value });
                                    }}
                                />

                                <label>Novel status</label>
                                <select
                                    onChange={(e) => {
                                        setNovelInfor({ ...novelInfor, status: e.target.value });
                                    }}
                                >
                                    <option value="dang cap nhat">Đang cập nhật</option>
                                    <option value="hoan thanh">Đã hoàn thành</option>
                                </select>

                                <label>Novel Poster</label>
                                <input
                                    type="file"
                                    name="posterImg"
                                    onChange={(e) => {
                                        setNovelInfor({ ...novelInfor, poster_img: e.target.files[0] });
                                    }}
                                />
                                <label>Novel description</label>
                                <input
                                    value={novelInfor.description}
                                    type="text"
                                    name="description"
                                    onChange={(e) => {
                                        setNovelInfor({ ...novelInfor, description: e.target.value });
                                    }}
                                />
                                <label>Novel totalChap</label>
                                <input
                                    value={novelInfor.totalChap}
                                    type="text"
                                    name="totalChap"
                                    onChange={(e) => {
                                        setNovelInfor({ ...novelInfor, totalChap: e.target.value });
                                    }}
                                />

                                <button type="submit">Create</button>
                                <button>
                                    {' '}
                                    <a href="/novelsInfor">Back</a>
                                </button>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </>
            ) : (
                <DenyAccess />
            )}
        </CreateNovel>
    );
}

export default CreateNovelPage;

const CreateNovel = styled.div`
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 400px;
        padding-top: 100px;
        padding-bottom: 100px;
    }
    .createNovelContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Center vertically */
        background-color: #f9f9f9; /* Optional: Add a background color */
    }
    .create {
        padding: 0.5rem 10rem;
    }

    .formCreateNovel {
        display: flex;
        flex-direction: column;
        gap: 1em; /* Add space between elements */
        padding: 2em;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Optional: Add some shadow for better visibility */
        width: 40vw; /* Optional: Set a width for the form */
    }

    .formCreateNovel label {
        display: flex;
        justify-content: center;
        font-weight: bold;
        margin-bottom: 0.5em; /* Space between label and input */
    }

    .formCreateNovel input[type='text'],
    .formCreateNovel input[type='file'],
    .formCreateNovel select {
        width: 100%;
        padding: 0.5em;
        margin-bottom: 1em; /* Space below inputs */
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .genresContainer {
        display: flex;
        justify-content: center;
        gap: 0.5em;
        margin-bottom: 1em; /* Space below genres */
    }

    .genresContainer label {
        display: flex;
        align-items: center;
    }

    .genresContainer input[type='checkbox'] {
        margin-right: 0.5em;
        margin-bottom: 0.4em;
    }

    .formCreateNovel button {
        padding: 0.5em 1em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .formCreateNovel button[type='submit'] {
        background-color: #4caf50; /* Green */
        color: white;
    }

    .formCreateNovel button:nth-of-type(2) {
        background-color: #f44336; /* Red */
        color: white;
        margin-left: 0.5em; /* Space between buttons */
    }

    .buttonContainer {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
`;
