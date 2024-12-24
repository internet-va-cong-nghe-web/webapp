/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from 'styled-components';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHome, faPhone } from '@fortawesome/free-solid-svg-icons';

const cs = classNames.bind(styled);

function Footer({ className }) {
    return (
        <FooterStyle>
            <div className={cs('wrapper', className)}>
                <div className={cs('info')}>
                    <h4 className={cs('heading')}>Contact</h4>
                    <ul className={cs('list')}>
                        <li className={cs('item')}>
                            <a href="tel:phonenumber" className={cs('item-link')}>
                                <FontAwesomeIcon className={cs('icon')} icon={faPhone} />
                                Phone Number : 0889539901889539901
                            </a>
                        </li>

                        <li className={cs('item')}>
                            <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox" className={cs('item-link')}>
                                <FontAwesomeIcon className={cs('icon')} icon={faEnvelope} />
                                Email : 22520326@gm.uit.edu.vnvn
                            </a>
                        </li>

                        <li className={cs('item')}>
                            <a
                                href="https://www.google.com/maps/search/K%C3%BD+t%C3%BAc+x%C3%A1+Khu+A+%C4%90H+Qu%E1%BB%91c+gia+TP.+H%E1%BB%93+Ch%C3%AD+Minh/@10.8787677,106.7840747,15z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
                                className={cs('item-link')}
                            >
                                <FontAwesomeIcon className={cs('icon')} icon={faHome} />
                                Address : KTX Khu A DHQG TPHCM 
                            </a>
                        </li>
                    </ul>
                </div>

                <div className={cs('info', 'info_follow')}>
                    <h4 className={cs('heading')}>Follow Me</h4>
                    <ul className={cs('list')}>
                        <li className={cs('item')}>
                            <a href="https://www.facebook.com/huy042003/" target="_blank" className={cs('item-link')}>
                                <FontAwesomeIcon className={cs('icon')} icon={faFacebook} />
                                Facebook
                            </a>
                        </li>

                        <li className={cs('item')}>
                            <a
                                href="https://www.instagram.com/triplet_ins22/"
                                target="_blank"
                                className={cs('item-link')}
                            >
                                <FontAwesomeIcon className={cs('icon')} icon={faInstagram} />
                                Instagram
                            </a>
                        </li>

                        <li className={cs('item')}>
                            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className={cs('item-link')}>
                                <FontAwesomeIcon className={cs('icon')} icon={faTelegram} />
                                Telegram
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </FooterStyle>
    );
}

export default Footer;
const FooterStyle = styled.div`
    .wrapper {
        display: flex;
        justify-content: space-around;
        border-top: 2px solid rgb(209, 207, 207);
        background-color: #1f1d1d;
    }
    .info {
      
        margin-bottom: 50px;
    }
    .heading {
        
        text-transform: uppercase;
        color: white;
        margin-top: 30px;
        margin-bottom: 10px;

    }

    .item {
        padding: 4px 0;
        &-link {
            margin-top: 10px;
            
            color: white;
            text-decoration: none;
            display: flex;
            align-items: center;
            &:hover {
                color: #da2020;
            }
        }
    }

    .icon {
        font-size: 1.4rem;
        margin: -1px 4px 0 0;
    }

    @media (max-width: 740px) {
        .wrapper {
            flex-direction: column;
            align-items: center;
        }

        .info_follow {
            width: 336px;
        }
    }
`;
