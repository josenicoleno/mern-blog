import { Alert, Button, Checkbox, Modal, Table, TextInput } from 'flowbite-react'
import { useState, useEffect } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [createCategory, setCreateCategory] = useState(false);
    const [updateCategory, setUpdateCategory] = useState(false);
    const [name, setName] = useState("");
    const [inMenu, setInMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
    const [categoryIdToUpdate, setCategoryIdToUpdate] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`/api/category/`);
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, []);
    
    const handleSubmitCreateCategory = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setError(null);
        if (name.split(" ").join("").length < 3) {
            return setError("Name must be at least 3 words long");
        }
        try {
            setLoading(true);
            const res = await fetch(`/api/category/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, inMenu }),
            });
            if (!res.ok) {
                return setError("Failed to create category");
            }
            const data = await res.json();
            setName("");
            setSuccessMessage("Category created successfully");
            setSuccess(true);
            setCreateCategory(false);
            setCategories(prev => [...prev, data]);
        } catch (error) {
            return setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmitUpdateCategory = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setError(null);
        if (name.split(" ").join("").length < 3) {
            return setError("Name must be at least 3 words long");
        }
        try {
            setLoading(true);
            const res = await fetch(`/api/category/update/${categoryIdToUpdate}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, inMenu }),
            });
            if (!res.ok) {
                return setError("Failed to update category");
            }
            const data = await res.json();
            setName("");
            setSuccessMessage("Category updated successfully");
            setSuccess(true);
            setUpdateCategory(false);
            setCategories(prev => prev.map(category => category._id === categoryIdToUpdate ? data : category));
        } catch (error) {
            return setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteCategory = async () => {
        setShowModal(false);
        setLoading(true);
        setSuccessMessage("");
        setError(null);
        try {
            const res = await fetch(`/api/category/delete/${categoryIdToDelete}`,
                {
                    method: "DELETE",
                }
            );
            if (!res.ok) {
                return setError("Failed to delete category");
            }
            setSuccessMessage("Category deleted successfully");
            setSuccess(true);
            setCategories(prev => prev.filter(category => category._id !== categoryIdToDelete));
        } catch (error) {
            console.log(error.message);
        } finally {
            setCategoryIdToDelete(null);
            setLoading(false);
        }
    }

    return (
        /* Columna 1 */
        <div className="flex gap-4 p-4 max-w-4xl mx-auto">
            <div className="flex flex-col flex-1 gap-4 ">
                <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200 self-center'>
                    Categories
                </h1>
                <Button
                    className='self-center'
                    outline
                    gradientDuoTone="purpleToPink"
                    onClick={(e) => {
                        e.preventDefault();
                        setCreateCategory(true);
                        setUpdateCategory(false);
                        setName("");
                    }}
                >
                    Create Category
                </Button>
                <Table hoverable={true} >
                    <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>In Menu</Table.HeadCell>
                        <Table.HeadCell>Update</Table.HeadCell>
                        <Table.HeadCell>Delete</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {categories.map((category) => (
                            <Table.Row key={category._id}>
                                <Table.Cell>{category.name}</Table.Cell>
                                <Table.Cell>{category.inMenu ? (<FaCheck className='text-green-500' />) : <FaTimes className="text-red-500" />}</Table.Cell>
                                <Table.Cell>
                                    <p
                                        className="text-teal-500 cursor-pointer hover:underline"
                                        onClick={() => {
                                            setUpdateCategory(true)
                                            setName(category.name)
                                            setInMenu(category.inMenu)
                                            setCategoryIdToUpdate(category._id)
                                            setCreateCategory(false)
                                        }}
                                    >
                                        Update
                                    </p>
                                </Table.Cell>
                                <Table.Cell>
                                    <p
                                        className="text-red-500 cursor-pointer hover:underline"
                                        onClick={() => {
                                            setCreateCategory(null)
                                            setUpdateCategory(null)
                                            setCategoryIdToDelete(category._id)
                                            setShowModal(true)
                                        }}
                                    >
                                        Delete
                                    </p>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                {error && <Alert color="failure">{error}</Alert>}
                {success && <Alert color="success">{successMessage}</Alert>}
            </div>
            {/* Columna 2 */}
            {createCategory &&
                <div className="flex flex-col gap-4">
                    <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200 self-center'>Create Category</h1>
                    <div className="flex flex-col gap-4 p-4">
                        <form onSubmit={handleSubmitCreateCategory} className="flex flex-col gap-4">
                            <TextInput id="name" type="text" placeholder="Category name" onChange={(e) => setName(e.target.value)} value={name || ""} />
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="inMenu"
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={inMenu}
                                    onChange={e => setInMenu(e.target.checked)}
                                />
                                <label htmlFor="inMenu" className="text-sm">
                                    In Menu?
                                </label>
                            </div>
                            <Button
                                className='self-center'
                                type="submit"
                                disabled={loading}
                                gradientDuoTone="purpleToBlue"
                                outline
                            >
                                Create
                            </Button>
                        </form>
                    </div>
                </div>
            }
            {
                updateCategory &&
                <div className="flex flex-col gap-4">
                    <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200 self-center'>Update Category</h1>
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-4 p-4">
                            <form onSubmit={handleSubmitUpdateCategory} className="flex flex-col gap-4">
                                <TextInput id="name" type="text" placeholder="Category name" onChange={(e) => setName(e.target.value)} value={name || ""} />
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="inMenu"
                                        type="checkbox"
                                        onChange={(e) => setInMenu(e.target.checked)}
                                        value={inMenu || ""}
                                        checked={inMenu}
                                    />
                                    <label htmlFor="inMenu" className="text-sm">
                                        In Menu?
                                    </label>
                                </div>
                                <Button
                                    className='self-center'
                                    type="submit"
                                    disabled={loading}
                                    gradientDuoTone="purpleToBlue"
                                    outline
                                >
                                    Update
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            }
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
                <Modal.Header>Delete category?</Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400 ">
                            Are you sure you want to delete the category?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeleteCategory}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>No, I'm not.</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
    )
}
