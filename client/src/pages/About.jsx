import { useEffect, useState } from "react";
import { AiFillGoogleCircle, AiOutlineDownload, AiOutlineExport, AiOutlineOpenAI } from "react-icons/ai";
import { DiJavascript1, DiReact, DiNodejs, DiPython, DiDjango, DiHtml5, DiCss3, DiMongodb, DiPostgresql, DiMsqlServer, DiJava, DiTerminal, DiWindows } from "react-icons/di";
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
      summary: "Desarrollador de software con amplia experiencia en el desarrollo web de sistemas complejos y gestión de bases de datos. Especializado en tecnologías como GeneXus, ReactJS y Python, con sólidos conocimientos en metodologías ágiles como Scrum y prácticas DevOps. Capacidad para liderar equipos, para comunicarse con clientes con diferentes perfiles, diseñar soluciones escalables y optimizar procesos. Enfoque centrado en la eficiencia, la automatización y la mejora continua.",
      contact: "Datos de Contacto",
      technologies: "Tecnologías",
      languages: "Idiomas",
      experience: "Experiencia Profesional",
      downloadCV: "Descargar CV",
      myResume: "Descargar CV",
      italianCV: "Scarica CV",
      job1: {
        title: "Technical Leader",
        company: "Capgemini",
        dates: "Septiembre 2023 - Presente",
        desc: "Gestiono equipos de Italia, India y España para un cliente multinacional en actividades diarias de mantenimiento de entornos de producción y no producción.\n Colaboro en la planificación de sprints y en la resolución de incidencias críticas. Asigno tareas a los equipos y realizo el seguimiento de las mismas. \nTrabajo utilizando tecnologías como shell scripting y Python para automatización de tareas; mantenimiento y actualización de bases de datos como MongoDB, PostgreSQL y Oracle; mantenimiento de servidores Linux y Windows; documentación técnica; despliegue de aplicaciones; prevención de incidencias a través de monitorización con herramientas como Dynatrace y análisis de logs."
      },
      job2: {
        title: "Analista-Desarrollador / FullStack Developer",
        company: "Tecnologística Consultores",
        dates: "Junio 2022 - Agosto 2023",
        desc: "Trabajé como analista y desarrollador de un sistema de logística, realizando mantenimiento de la aplicación y creación de nuevas funcionalidades. Utilicé Genexus con C# para el desarrollo de la aplicación y SQL Server para las bases de datos. Estuve en un entorno ágil, colaborando con el equipo para planificar y ejecutar tareas, y asegurando la calidad del código mediante pruebas unitarias y revisiones de código. Hemos utilizado como metodologías ágil Scrum, participando en reuniones diarias, planificación de sprints y retrospectivas. Utilicé herramientas de gestión de proyectos para las asignaciones, seguimiento y control de tareas. Colaboré estrechamente con el equipo para garantizar la entrega de funcionalidades de alta calidad dentro de los plazos establecidos."
      },
      job3: {
        title: "Project Manager y Analista funcional",
        company: "Dirmod",
        dates: "Noviembre 2021 - Mayo 2022",
        desc: "Gestioné equipos de desarrollo, tuve reuniones con clientes para revisiones contractuales; hice reuniones de revisión de proyectos, planificación de tareas y asignación de las mismas. Realicé análisis funcionales para definir los requisitos del proyecto y asegurar que el equipo de desarrollo comprendiera claramente las necesidades del cliente. Hice uso de Azure DevOps para la gestión de proyectos, diseño con Figma para el diseño de pantallas y Draw.io para el diseño de diagramas de flujo y arquitectura del sistema. Trabajé en estrecha colaboración con el equipo de desarrollo para garantizar la entrega de soluciones de alta calidad que cumplieran con los requisitos del cliente dentro de los plazos establecidos."
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
        { name: "PostgreSQL", icon: DiPostgresql },
        { name: "Linux", icon: DiTerminal },
        { name: "Windows Server", icon: DiWindows }
      ],
      langList: [
        { flag: "🇪🇸", language: "Spanish", level: "Native" },
        { flag: "🇬🇧", language: "English", level: "Advanced" },
        { flag: "🇮🇹", language: "Italian", level: "Advanced" }
      ]
    },
    en: {
      title: "About Me",
      summary: "Software developer with extensive experience in web development of complex systems and database management. Specialized in technologies such as GeneXus, ReactJS and Python, with solid knowledge in agile methodologies such as Scrum and DevOps practices. Ability to lead teams, communicate with clients with different profiles, design scalable solutions and optimize processes. Focus on efficiency, automation and continuous improvement.",
      contact: "Contact Information",
      technologies: "Technologies",
      languages: "Languages",
      experience: "Professional Experience",
      downloadCV: "Download CV",
      myResume: "Download CV",
      italianCV: "Scarica CV",
      job1: {
        title: "Technical Leader",
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
        title: "Technical Leader",
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
        { name: "HTML5", icon: DiHtml5 },
        { name: "CSS3", icon: DiCss3 },
        { name: "React", icon: DiReact },
        { name: "Node.js", icon: DiNodejs },
        { name: "Python", icon: DiPython },
        { name: "MongoDB", icon: DiMongodb },
        { name: "PostgreSQL", icon: DiPostgresql },
        { name: "SQLServer", icon: DiMsqlServer },  
        { name: "Oracle SQL", icon: DiJava },
        { name: "Shell scripting", icon: DiTerminal }
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
        setAbout(translations.es.summary)
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
              <AiOutlineDownload className="inline-block ml-2" />
            </button>
            <button className="w-52 bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition" onClick={() => { englishResume ? window.open(englishResume, "_blank") : console.log('CV in English not available') }}>
              🇬🇧
              Download CV
              <AiOutlineDownload className="inline-block ml-2" />
            </button>
            <button className="w-52 bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition" onClick={() => { italianResume ? window.open(italianResume, "_blank") : console.log('CV in Italian not available') }}>
              🇮🇹
              Scarica CV
              <AiOutlineDownload className="inline-block ml-2" />
            </button>
          </div>
        </div>
      </div>
      {/* // About content section */}
      <div className='p-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* // Resumen a la izquierda */}
          <div className='md:col-span-1'>
            <div className='mb-6'>
              <h3 className='text-xl font-medium mb-2 text-teal-500 underline'>{t.contact}</h3>
              <ul className='space-y-2'>
                <li><strong>Email:</strong> josenicoleno@hotmail.com <a href="mailto:josenicoleno@hotmail.com"><AiOutlineExport className="inline-block ml-2" /></a></li>
                {/* <li><strong>Teléfono: </strong>+39 3428360088</li> */}
                <li><strong>LinkedIn:</strong> linkedin.com/in/jose-nicoleno
                  <a href="https://linkedin.com/in/jose-nicoleno/" target="_blank" rel="noopener noreferrer"><AiOutlineExport className="inline-block ml-2" /></a>
                </li>
                <li><strong>GitHub:</strong> github.com/josenicoleno <a href="https://github.com/josenicoleno/" target="_blank" rel="noopener noreferrer"><AiOutlineExport className="inline-block ml-2" /></a></li>
              </ul>
            </div>
            <div className='mb-6'>
              <h3 className='text-xl font-medium mb-2 text-teal-500 underline'>{t.title}</h3>
              {/* <div dangerouslySetInnerHTML={{ __html: about }} /> */}
              {about}
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