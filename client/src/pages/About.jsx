import { useEffect, useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { DiJavascript1, DiReact, DiNodejs, DiPython, DiDjango, DiHtml5, DiCss3, DiMongodb, DiPostgresql } from "react-icons/di";
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const [about, setAbout] = useState("");
  const [aboutTitle, setAboutTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const { language, setLanguage } = useLanguage();
  const backgroundImage = "https://firebasestorage.googleapis.com/v0/b/josenicoleno-blog.appspot.com/o/aboutme%2FAbout-me-maiori.jpg?alt=media&token=5536ecf8-68e4-4eb3-ac3f-18a2fc63a8d4"; // Replace with your image path
  const italianResume = "https://docs.google.com/document/d/e/2PACX-1vQ8i1-bMeq1M-4wlSzt1LGI2XXwcspMV6Hw6zByXNQ6SoBOiuQHzRv3O8WOEv_t3RSR8ftNId7SpiVJ/pub";
  const englishResume = "https://docs.google.com/document/d/e/2PACX-1vQocxpeO3s_JWl4iEEbNqSYvvvRNrVxzx_7LA7O_kneFGKxIydjru15UVjaOFHi4g/pub";

  const translations = {
    es: {
      title: "Sobre Mí",
      summary: "Resumen",
      contact: "Datos de Contacto",
      technologies: "Tecnologías",
      languages: "Idiomas",
      experience: "Experiencia Profesional",
      downloadCV: "Descargar CV",
      myResume: "Descargar CV",
      italianCV: "Scarica CV",
      job1: {
        title: "Desarrollador Full Stack",
        company: "Empresa XYZ",
        dates: "Enero 2022 - Presente",
        desc: "Desarrollo de aplicaciones web usando React y Node.js. Colaboración en equipos ágiles."
      },
      job2: {
        title: "Desarrollador Frontend",
        company: "Empresa ABC",
        dates: "Junio 2020 - Diciembre 2021",
        desc: "Creación de interfaces de usuario responsivas con HTML, CSS y JavaScript."
      },
      job3: {
        title: "Pasante en Desarrollo",
        company: "Empresa DEF",
        dates: "Enero 2019 - Mayo 2020",
        desc: "Aprendizaje de tecnologías backend y bases de datos."
      },
      techList: [
        { name: "JavaScript", icon: DiJavascript1 },
        { name: "React", icon: DiReact },
        { name: "Node.js", icon: DiNodejs },
        { name: "Python", icon: DiPython },
        { name: "Django", icon: DiDjango },
        { name: "HTML5", icon: DiHtml5 },
        { name: "CSS3", icon: DiCss3 },
        { name: "MongoDB", icon: DiMongodb },
        { name: "PostgreSQL", icon: DiPostgresql }
      ],
      langList: [
        { flag: "🇪🇸", language: "Spanish", level: "Native" },
        { flag: "🇬🇧", language: "English", level: "Advanced" },
        { flag: "🇮🇹", language: "Italian", level: "Advanced" }
      ]
    },
    en: {
      title: "About Me",
      summary: "Summary",
      contact: "Contact Information",
      technologies: "Technologies",
      languages: "Languages",
      experience: "Professional Experience",
      downloadCV: "Download CV",
      myResume: "Download CV",
      italianCV: "Scarica CV",
      job1: {
        title: "Full Stack Developer",
        company: "Company XYZ",
        dates: "January 2022 - Present",
        desc: "Development of web applications using React and Node.js. Collaboration in agile teams."
      },
      job2: {
        title: "Frontend Developer",
        company: "Company ABC",
        dates: "June 2020 - December 2021",
        desc: "Creation of responsive user interfaces with HTML, CSS and JavaScript."
      },
      job3: {
        title: "Development Intern",
        company: "Company DEF",
        dates: "January 2019 - May 2020",
        desc: "Learning backend technologies and databases."
      },
      techList: [
        { name: "JavaScript", icon: DiJavascript1 },
        { name: "React", icon: DiReact },
        { name: "Node.js", icon: DiNodejs },
        { name: "Python", icon: DiPython },
        { name: "Django", icon: DiDjango },
        { name: "HTML5", icon: DiHtml5 },
        { name: "CSS3", icon: DiCss3 },
        { name: "MongoDB", icon: DiMongodb },
        { name: "PostgreSQL", icon: DiPostgresql }
      ],
      langList: [
        { flag: "🇪🇸", language: "Spanish", level: "Native" },
        { flag: "🇬🇧", language: "English", level: "Advanced" },
        { flag: "🇮🇹", language: "Italian", level: "Advanced" }
      ]
    },
    it: {
      title: "About Me",
      summary: "Summary",
      contact: "Contact Information",
      technologies: "Technologies",
      languages: "Languages",
      experience: "Professional Experience",
      downloadCV: "Download CV",
      myResume: "My resume",
      italianCV: "Scarica CV",
      job1: {
        title: "Full Stack Developer",
        company: "Company XYZ",
        dates: "January 2022 - Present",
        desc: "Development of web applications using React and Node.js. Collaboration in agile teams."
      },
      job2: {
        title: "Frontend Developer",
        company: "Company ABC",
        dates: "June 2020 - December 2021",
        desc: "Creation of responsive user interfaces with HTML, CSS and JavaScript."
      },
      job3: {
        title: "Development Intern",
        company: "Company DEF",
        dates: "January 2019 - May 2020",
        desc: "Learning backend technologies and databases."
      },
      techList: [
        { name: "JavaScript", icon: DiJavascript1 },
        { name: "React", icon: DiReact },
        { name: "Node.js", icon: DiNodejs },
        { name: "Python", icon: DiPython },
        { name: "Django", icon: DiDjango },
        { name: "HTML5", icon: DiHtml5 },
        { name: "CSS3", icon: DiCss3 },
        { name: "MongoDB", icon: DiMongodb },
        { name: "PostgreSQL", icon: DiPostgresql }
      ],
      langList: [
        { flag: "🇪🇸", language: "Spanish", level: "Native" },
        { flag: "🇬🇧", language: "English", level: "Advanced" },
        { flag: "🇮🇹", language: "Italian", level: "Advanced" }
      ]
    }
  };

  const t = translations[language];
  const spanishResume = "https://docs.google.com/document/d/e/2PACX-1vRgatQMa6J4BCeLfjvvEKlZW4v2-cJ1ovkgAWEpoTdTPDcIpywucdxPyvlbdPMOVQ/pub";

  useEffect(() => {
    const fetchAbout = async () => {
      const res = await fetch(`/api/param/about`);
      if (res.ok) {
        const data = await res.json();
        setAbout(data.text);
      }
    };
    const fetchAboutTitle = async () => {
      const res = await fetch(`/api/param/aboutTitle`);
      if (res.ok) {
        const data = await res.json();
        setAboutTitle(data.text);
      }
    };
    fetchAbout();
    fetchAboutTitle();
  }, []);
  return (
    <div >
      {/* // Background image section */}
      <div className='relative'>
        <img src={backgroundImage} className="w-full h-[66.67vh] object-cover " alt="About me" />
        {/* //Titulo y botones de descarga del CV */}
        <div className='absolute inset-0 flex flex-col justify-between p-3'>
          {/* //Titulo */}
          <div className='p-3 text-left'   >
            <h1 className='text-3xl font-semibold p-3 text-left text-white'>Software Engineer. FullStack Developer.</h1>
          </div>
          {/* //Botones de descarga del CV */}
          <div className='p-3 flex flex-row flex-wrap justify-center gap-4 mt-20'   >
            <button className="w-52 bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition" onClick={() => { spanishResume ? window.open(spanishResume, "_blank") : console.log('CV en español no disponible') }}>
              🇪🇸
              Descargar CV
            </button>
            <button className="w-52 bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition" onClick={() => { englishResume ? window.open(englishResume, "_blank") : console.log('CV in English not available') }}>
              🇬🇧
              Download CV
            </button>
            <button className="w-52 bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition" onClick={() => { italianResume ? window.open(italianResume, "_blank") : console.log('CV in Italian not available') }}>
              🇮🇹
              Scarica CV
            </button>
          </div>
        </div>
      </div>
      {/* // About content section */}
      <div className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* // Resumen a la izquierda */}
          <div className='md:col-span-1'>
            <h2 className='text-2xl font-semibold mb-4'>{t.summary}</h2>
            <div className='mb-6'>
              <h3 className='text-xl font-medium mb-2 text-teal-500 underline'>{t.contact}</h3>
              <ul className='space-y-2'>
                <li><strong>Email:</strong> josenicoleno@hotmail.com</li>
                <li><strong>Teléfono: </strong>+39 3428360088</li>
                <li><strong>LinkedIn:</strong> linkedin.com/in/jose-nicoleno/</li>
                <li><strong>GitHub:</strong> github.com/josenicoleno</li>
              </ul>
            </div>
            <div className='mb-6'>
              <h3 className='text-xl font-medium mb-2 text-teal-500 underline'>{t.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: about }} />
            </div>
            <div className='mb-6'>
              <h3 className='text-xl font-medium mb-2 text-teal-500 underline'>{t.technologies}</h3>
              <ul className='grid grid-cols-2 gap-2'>
                {t.techList.map((tech, index) => (
                  <li key={index} className='flex items-center'>
                    <tech.icon className='w-6 h-6 mr-2' />
                    {tech.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className='mb-6'>
              <h3 className='text-xl font-medium mb-2 text-teal-500 underline'>{t.languages}</h3>
              <ul className='flex items-center gap-4'>
                {t.langList.map((lang, index) => (
                  <li key={index} className="flex items-center"> {lang.flag} {lang.level}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* // Línea histórica a la derecha */}
          <div className='md:col-span-2'>
            <h2 className='text-2xl font-semibold mb-4'>{t.experience}</h2>
            <div className='space-y-6'>
              <div className='border-l-4 border-blue-500 pl-4'>
                <h3 className='text-xl font-medium'>{t.job1.title}</h3>
                <p className='text-gray-600'>{t.job1.company}</p>
                <p className='text-sm text-gray-500'>{t.job1.dates}</p>
                <p className='mt-2'>{t.job1.desc}</p>
              </div>
              <div className='border-l-4 border-green-500 pl-4'>
                <h3 className='text-xl font-medium'>{t.job2.title}</h3>
                <p className='text-gray-600'>{t.job2.company}</p>
                <p className='text-sm text-gray-500'>{t.job2.dates}</p>
                <p className='mt-2'>{t.job2.desc}</p>
              </div>
              <div className='border-l-4 border-purple-500 pl-4'>
                <h3 className='text-xl font-medium'>{t.job3.title}</h3>
                <p className='text-gray-600'>{t.job3.company}</p>
                <p className='text-sm text-gray-500'>{t.job3.dates}</p>
                <p className='mt-2'>{t.job3.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}