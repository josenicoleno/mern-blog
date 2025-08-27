import { Button } from "flowbite-react";
import { useSelector } from "react-redux";

export default function CallToAction() {
    const { currentUser } = useSelector(state => state.user);
    const title = "¡Sumate al blog para comentar y recibir noticias!"
    const description = "¿Necesitás ayuda para armar tu viaje, hacer algún trámite de ciudadanía italiana, o simplemente querés conversar de cualquier cosa?"
    const imageUrl = "https://firebasestorage.googleapis.com/v0/b/josenicoleno-blog.appspot.com/o/public%2FCallToAction.png?alt=media&token=09dd7d3f-5956-46d0-acea-509cf148f2cd"
    return (
        <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
            <div className="flex flex-col flex-1 justify-center">
                <h2 className="text-2xl">
                    {title}
                </h2>
                <p className="text-gray-500 my-2">
                    {description}
                </p>
                {currentUser &&
                    <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none" onClick={() => { window.location.href = '/contact-me' }}>
                        Escríbeme!
                    </Button>
                }
                {!currentUser &&
                    <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none" onClick={() => { window.location.href = '/sign-up' }}>
                        Sumarse!
                    </Button>
                }
            </div>
            <div className="p-7 flex-1">
                <img src={imageUrl} alt="callToAction" className="max-h-[300px]" />
            </div>
        </div>
    )
}
