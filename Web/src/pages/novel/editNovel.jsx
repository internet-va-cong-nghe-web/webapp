import React, { useEffect, useState } from 'react';
import Footer from '~/components/footer/Footer';
import DenyAccess from '~/components/access/403';
import useUpdateNovel from '~/hooks/novel/useUpdateNovel';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '~/context/authContext';
import styled from 'styled-components';
import NavbarAdmin from '~/components/Navbar/NavbarAdmin';

function EditNovelPage() {
    const { id } = useParams();
    const { allowAccess } = useContext(UserContext);
    const [novelInfor, setNovelInfor] = useState({
        name: '',
        genres: [],
        country: '',
        actors: [],
        director: '',
        status: '',
        poster_img: '',
        releaseDate: '',
        description: '',
        totalChap: '',
        storyDuration: '',
    });
    const statusList = ['hoan thanh', 'dang cap nhat'];
    console.log(novelInfor);
    const [genresList, setGenresList] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const { updateNovel } = useUpdateNovel(id);

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

        const getNovel = async () => {
            const response = await fetch(`/Api/api/novels/get/${id}`);
            const data = await response.json();
            if (response.ok) {
                setNovelInfor(data.datas);
                setSelectedGenres(data.datas.genres);
            } else {
                console.log(data.message);
            }
        };
        getGenreList();
        getNovel();
    }, []);
  

    const handleChange = (genreId) => {
        const isChecked = selectedGenres.includes(genreId);
        if (isChecked) {
            setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
        } else {
            setSelectedGenres([...selectedGenres, genreId]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateNovel({ ...novelInfor, genres: selectedGenres });
    };

    return (
        <CreateNovel>
            {allowAccess === true ? (
                <div>
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
                                <label> Genres</label>
                                <div className="genresContainer">
                                    {genresList.map((genre) => (
                                        <div key={genre._id}>
                                            <label>{genre.name}</label>
                                            <input
                                                type="checkbox"
                                                value={genre._id}
                                                checked={selectedGenres.includes(genre._id)}
                                                onChange={() => {
                                                    handleChange(genre._id);
                                                }}
                                            />
                                        </div>
                                    ))}
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
                                <label>Novel director</label>
                                <input
                                    value={novelInfor.director}
                                    type="text"
                                    name="director"
                                    onChange={(e) => {
                                        setNovelInfor({ ...novelInfor, director: e.target.value });
                                    }}
                                />

                                <label>Novel status</label>
                                <select
                                    value={novelInfor.status} // Set the initial value based on novelInfor
                                    onChange={(e) => {
                                        setNovelInfor({ ...novelInfor, status: e.target.value });
                                    }}
                                >
                                    {statusList.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                <label>Novel Poster</label>
                                <img src={novelInfor.poster_img} />
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
                                <label>Novel storyDuration</label>
                                <input
                                    value={novelInfor.storyDuration}
                                    type="text"
                                    name="storyDuration"
                                    onChange={(e) => {
                                        setNovelInfor({ ...novelInfor, storyDuration: e.target.value });
                                    }}
                                />

                                <Link to={`/novel/createEpisode/${novelInfor?._id}`}> Create New Episode</Link>

                                <button
                                    type="submit"
                                    onClick={() => {
                                        window.location.href = '/novelsInfor';
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => {
                                        window.location.href = '/novelsInfor';
                                    }}
                                >
                                    Back
                                </button>
                            </form>
                        </div>
                    </div>
                    <Footer />
                </div>
            ) : (
                <DenyAccess />
            )}
        </CreateNovel>
    );
}

export default EditNovelPage;
const CreateNovel = styled.div`
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .createNovelContainer {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Center vertically */
        background-color: #f9f9f9; /* Optional: Add a background color */
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
        margin-top: 5rem;
        margin-left: 50%;
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
