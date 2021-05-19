import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useState, FormEvent } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation } from 'swiper';

import styles from '../styles/home.module.scss';
import { Alert } from '../components/Alert';
import { Input } from '../components/Input';
import { api } from '../services/api';

type Projects = {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

type ProjectsProps = {
    projects: Projects[];
}

export default function Home({ projects }: ProjectsProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneOne, setPhoneOne] = useState('');
    const [phoneTwo, setPhoneTwo] = useState('');

    const [nameChange, setNameChange] = useState('');
    const [emailChange, setEmailChange] = useState('');
    const [phoneOneChange, setPhoneOneChange] = useState('');
    const [phoneTwoChange, setPhoneTwoChange] = useState(''); 

    const [isVisible, setIsVisible] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    function handleName(event) {    
        setName(event.target.value);
    }

    function handleEmail(event) {
        setEmail(event.target.value);
    }

    function handlePhoneOne(event) {
        setPhoneOne(event.target.value);
    }

    function handlePhoneTwo(event) {
        setPhoneTwo(event.target.value);
    }

    function onUpdate(e:FormEvent) {
        e.preventDefault();

        setIsAlert(true);
        showAlert();

        setNameChange(name);
        setEmailChange(email);
        setPhoneOneChange(phoneOne);
        setPhoneTwoChange(phoneTwo);
        setIsVisible(true);

        resetFields();
    }

    function resetFields() {
        setName('');
        setEmail('');
        setPhoneOne('');
        setPhoneTwo('');
    }

    function showAlert() {
        setTimeout(function() { 
            setIsAlert(false);
        }, 3000);
    }

    SwiperCore.use([Autoplay, Navigation]);

    return (
        <div className={styles.homepage}>
            <Head>
                <title>Trabalhe conosco</title>
            </Head>

            <Alert isVisible={isAlert}/>

            <div className={styles.homepageContainer}>
                <div className={styles.homepageForm}>
                    <h1>Venha trabalhar na GNT</h1>
                    <p>Preencha o formulário abaixo e venha trabalhar em uma das startups mais desejadas do Brasil!</p>

                    <form className={styles.form} onSubmit={(e) => {onUpdate(e)}}>
                        <fieldset>
                            <legend>
                                <h2>Dados pessoais</h2>
                            </legend>

                            <div className={styles.field}>
                                <label>
                                    <span>* </span>
                                    Nome completo:
                                </label>
                                <Input 
                                    type="text"
                                    placeholder="seu nome completo" 
                                    onChange={handleName} 
                                    value={name} 
                                    required
                                />
                                <span>Mensagem de feedback</span>
                            </div>

                            <div className={styles.field}>
                                <label>
                                    <span>* </span>
                                    Email:
                                </label>
                                <Input 
                                    type="email"
                                    placeholder="seunome@sobrenome.com.br" 
                                    onChange={handleEmail} 
                                    value={email} 
                                    required
                                />
                                <span>Mensagem de feedback</span>
                            </div>

                            <div className={styles.fieldGroup}>
                                <div className={styles.field}>
                                    <label>
                                        <span>* </span>
                                        Telefone 1:
                                    </label>
                                    <Input 
                                        placeholder="(88) 8888-8888" 
                                        mask="(99) 9999-9999"
                                        maskChar=" " 
                                        pattern="\(\d{2}\) \d{4}-\d{4}"
                                        onChange={handlePhoneOne} 
                                        value={phoneOne}
                                        required
                                    />
                                    <span>Mensagem de feedback</span>
                                </div>

                                <div className={styles.field}>
                                    <label>
                                        Telefone 2:
                                    </label>
                                    <Input 
                                        placeholder="(88) 8888-8888" 
                                        mask="(99) 9999-9999"
                                        maskChar=" " 
                                        pattern="\(\d{2}\) \d{4}-\d{4}"
                                        onChange={handlePhoneTwo} 
                                        value={phoneTwo}
                                    />
                                    <span>Mensagem de feedback</span>
                                </div>
                            </div>
                        </fieldset>

                        <button type="submit">Enviar</button>
                    </form>
                </div>

                <div className={styles.homepageCandidate}>
                    <h1>Ficha do Candidato</h1>

                    <div className={styles.content}>
                        {!isVisible ? (
                            <p className={styles.hint}>Preencha o formulário e clique em "Enviar" após conferir atentamente.</p>
                        ) : (
                            <>
                                <div className={styles.field}>
                                    <p>Nome Completo:</p>
                                    <span>{nameChange}</span>
                                </div>

                                <div className={styles.field}>
                                    <p>E-mail:</p>
                                    <span>{emailChange}</span>
                                </div>

                                <div className={styles.field}>
                                    <p>Telefone 1:</p>
                                    <span>{phoneOneChange}</span>
                                </div>

                                <div className={styles.field}>
                                    <p>Telefone 2:</p>
                                    { 
                                        phoneTwoChange == '' ? (
                                            <span className={styles.none}>Não informado</span>
                                        ) : (
                                            <span>{phoneTwoChange}</span>
                                        )
                                    }
                                </div>
                            </>
                        )}
                    </div>
                   
                    <div className={styles.yourProjects}>
                        <p>Seus projetos:</p>
                        <div className={styles.swipper}>
                            <div className={styles.wrapperLeft} id="pagination-prevEl"></div>
                            <div className={styles.swipperContainer}>
                                <Swiper
                                    spaceBetween={5}
                                    slidesPerView={1}
                                    navigation={{
                                        nextEl: "#pagination-nextEl",
                                        prevEl: '#pagination-prevEl',
                                    }}
                                    breakpoints={{
                                        600: {
                                            slidesPerView: 2,
                                            spaceBetween: 20
                                        }
                                    }}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false
                                    }}
                                >
                                    {projects.map((item) => {
                                        return (
                                            <SwiperSlide key={item.id}>
                                                <img className={styles.imgSwipper} src={item.download_url} alt={item.download_url}></img>  
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>
                            <div className={styles.wrapperRight} id="pagination-nextEl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await api.get('list');

    const projects = data.map(item => {
        return {
            id: item.id,
            author: item.author,
            url: item.url,
            download_url: item.download_url
        };
    });

    return {
        props: {
            projects
        },
        revalidate: 60 * 60 * 8,
    }
}
