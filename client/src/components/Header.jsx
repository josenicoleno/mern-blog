import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const { language, setLanguage } = useLanguage();

    const t = {
        es: {
            home: 'Inicio',
            posts: 'Posts',
            about: 'Sobre mí',
            contact: 'Contáctame',
            profile: 'Perfil',
            signout: 'Cerrar sesión',
            signin: 'Iniciar sesión'
        },
        en: {
            home: 'Home',
            posts: 'Posts',
            about: 'About me',
            contact: 'Contact me',
            profile: 'Profile',
            signout: 'Sign out',
            signin: 'Sign in'
        },
        it: {
            home: 'Home',
            posts: 'Posts',
            about: 'Su di me',
            contact: 'Contattami',
            profile: 'Profilo',
            signout: 'Disconnettersi',
            signin: 'Accedi'
        }
    }[language];

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
        }
    }, [location.search])

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch('/api/category')
            const data = await res.json()
            setCategories(data.sort((a, b) => a.order - b.order))
        }
        fetchCategories()
    }, [])

    const handleSignout = async () => {
        try {
            const res = await fetch(`api/user/signout`, {
                method: 'POST'
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message)
            } else {
                dispatch(signoutSuccess())
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString();
        if (!searchQuery)
            return
        navigate(`/search?${searchQuery}`)
    }

    return (
        <div>
            <Navbar className='border-b-2'>
                <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                    José
                    <span className='px-2 py-1 bg-gradient-to-r from-blue-500 via-light-blue-500 to-cyan-500 rounded-lg text-white'>Nicoleno
                    </span>
                </Link>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        type='text'
                        placeholder='Search...'
                        rightIcon={AiOutlineSearch}
                        className='hidden lg:inline'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </form>
                <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                    <Link to='/search'>
                        <AiOutlineSearch />
                    </Link>
                </Button>
                <div className="flex gap-2 md:order-2">
                    {/* language selector */}
                    <div className="flex center border rounded-xl ">
                        <Dropdown inline label={language === 'es' ? '🇪🇸' : language === 'en' ? '🇬🇧' : '🇮🇹'}>
                            <Dropdown.Item onClick={() => setLanguage('es')} className="flex items-center gap-2">
                                🇪🇸
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setLanguage('en')} className="flex items-center gap-2">
                                🇬🇧
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => setLanguage('it')} className="flex items-center gap-2">
                                🇮🇹
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                    <Button className='w-12 h-10 sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                        {theme === 'light' ? <FaMoon /> : <FaSun />}
                    </Button>
                    {currentUser ? (
                        <Dropdown arrowIcon={false} inline label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}>
                            <Dropdown.Header>
                                <span className="block text-sm">@{currentUser.username}</span>
                                <span className="block text-sm truncate font-semibold">{currentUser.email}</span>
                            </Dropdown.Header>
                            <Link to='/dashboard?tab=profile'>
                                <Dropdown.Item>{t.profile}</Dropdown.Item>
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleSignout}>{t.signout}</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Link to='/sign-in'>
                            <Button gradientDuoTone='purpleToBlue' outline>
                                {t.signin}
                            </Button>
                        </Link>)
                    }
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Navbar.Link active={path === "/"} as={'div'}>
                        <Link to='/'>
                            {t.home}
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/search"} as={'div'}>
                        <Link to='/search'>
                            {t.posts}
                        </Link>
                    </Navbar.Link>
                    {categories.filter(category => category.inMenu).map(category => (
                        <Navbar.Link key={category._id} active={path === `/search?category=${category.name}`} as={'div'}>
                            <Link to={`/search?category=${category.name}`}>
                                {category.name}
                            </Link>
                        </Navbar.Link>
                    ))}
                    <Navbar.Link active={path === "/about"} as={'div'}>
                        <Link to='/about'>
                            {t.about}
                        </Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/contact-me"} as={'div'}>
                        <Link to='/contact-me'>
                            {t.contact}
                        </Link>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar >
        </div >
    )
}

export default Header
