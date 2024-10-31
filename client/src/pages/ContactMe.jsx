import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CallToAction from "../components/CallToAction";

export default function ContactMe() {
    const { currentUser } = useSelector((state) => state.user)
    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.username)
            setEmail(currentUser.email)
        }
    }, [currentUser])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log(name, email, message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='min-h-screen mt-20 gap-5 sm:gap-10'>
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* left */}
                <div className="flex-1">
                    <img src="https://josenicoleno.ar/assets/images/perfil%20con%20fondo.png" alt="contact" className='md:w-full md:h-full object-cover md:rounded-md h-64 w-64 shadow-lg rounded-full mx-auto' />
                </div>
                {/* right */}
                <div className="flex-1">
                    <h1 className='text-4xl font-bold mb-5'>Contact Me</h1>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <Label htmlFor="name">Name</Label>
                        <TextInput type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <Label htmlFor="email">Email</Label>
                        <TextInput type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Label htmlFor="message">Message</Label>
                        <textarea className='rounded-md p-2 bg-[rgb(55 65 81 / var(--tw-bg-opacity))] dark:bg-gray-800' rows={6} id="message" name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <Button type="submit" gradientDuoTone='purpleToPink' className='mt-3' outline>
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
            {/* call to action */}
            <div className="mt-5 p-3 bg-amber-100 dark:bg-slate-700">
                <CallToAction />
            </div>
        </div>
    )
}
