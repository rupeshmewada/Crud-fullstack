import React, { useEffect, useState } from 'react'
// import EmployeeData from './EmployeeData'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

export default function Api() {

    const [user, setUser] = useState()

    const [fName, setFName] = useState("")
    const [age, setAge] = useState()
    const [mobile, setMobile] = useState()
    const [email, setEmail] = useState("")
    const [gender, setGender] = useState("")
    const [city, setCity] = useState("")
    const [id, setId] = useState()

    const [switchbtn, setSwitchbtn] = useState(true)
    const [errors, setErrors] = useState({});

    // const url = "http://localhost:5000"

    const validate = () => {
        let newErrors = {};

        if (!fName.trim()) {
            newErrors.fName = "Name is required";
        } else if (fName.length < 3) {
            newErrors.fName = "Name must be at least 3 characters long";
        }

        if (!age) {
            newErrors.age = "Age is required";
        }

        if (!mobile) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(mobile)) {
            newErrors.mobile = "Mobile number must be 10 digits";
        }

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!city) {
            newErrors.city = "City is required";
        }

        if (!gender) {
            newErrors.gender = "Gender is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEdit = async (itm) => {

        setSwitchbtn(false)
        setFName(itm.name)
        setAge(itm.age)
        setId(itm.id)
        setMobile(itm.mobile)
        setEmail(itm.email)
        setGender(itm.gender)
        setCity(itm.city)
    }

    const handleUpdate = async function (event) {
        event.preventDefault();
        if (validate()) {
            const updatedata = {
                id: id,
                name: fName,
                age: age,
                mobile: mobile,
                email: email,
                gender: gender,
                city: city
            }

            await axios.patch(`http://localhost:5000/updateuser/${id}`, updatedata).then((items) => {
                toast.success("update user successfully ");
                return items.data
            })

            await axios.get("http://localhost:5000/").then((items) => {
                return setUser(items.data)
            })

            setSwitchbtn(true)
            setFName("")
            setAge("")
            setId("")
            setMobile("")
            setEmail("")
            setGender("")
            setCity("")
        }
    }


    async function handleSave(e) {
        e.preventDefault()
        if (validate()) {
            alert("Form submitted successfully!");
            // Add form submission logic here
            let l
            if (user.length == 0) {
                l = 1
            } else {
                l = user[(user.length - 1)].id
            }

            await axios.post("http://localhost:5000/", {
                id: l + 1,
                name: fName,
                age: age,
                mobile: mobile,
                email: email,
                gender: gender,
                city: city,

            }).then((items) => {
                toast.success("Successfully save items");
                return "updated"
            })

            await axios.get("http://localhost:5000/").then((items) => {
                return setUser(items.data)
            })

            setSwitchbtn(true)
            setFName("")
            setAge("")
            setMobile("")
            setEmail("")
            setGender("")
            setCity("")
        }
    }

    const handleClear = (e) => {
        e.preventDefault()
        setSwitchbtn(true)
        setFName("")
        setAge("")
        setId("")
        setMobile("")
        setEmail("")
        setGender("")
        setCity("")
        toast.success("cleared successfully");
    }

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm("Are you sure you want delete  data?");
        if (confirmDelete) {

            await axios.delete(`http://localhost:5000/${id}`).then((items) => {
                // console.log('delete');
                return items.data
            })
            toast.success("Successfully Deleted");

            await axios.get("http://localhost:5000/").then((item) => {
                setUser(item.data)
            })
        }
    }

    useEffect(() => {
        axios.get("http://localhost:5000/").then((items) => {
            setUser(items.data)
        })

    }, [])


    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={true}
            />

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="input">
                    <div className="field-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={fName}
                            onChange={(e) => setFName(e.target.value)}
                        />
                        {errors.fName && <p className="text-red-500">{errors.fName}</p>}
                    </div>

                    <div className="field-group">
                        <label htmlFor="age">Age:</label>
                        <input
                            type="number"
                            id="age"
                            placeholder="Enter your age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        {errors.age && <p className="text-red-500">{errors.age}</p>}
                    </div>

                    <div className="field-group">
                        <label htmlFor="mobile">Mobile:</label>
                        <input
                            type="number"
                            id="mobile"
                            placeholder="Enter your mobile number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
                    </div>

                    <div className="field-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                </div>

                <div className="selec">
                    <div className="field-group border-black border-2 rounded-md p-2">
                        <label htmlFor="city">City:</label>
                        <select
                            name="mycity"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="">Select city</option>
                            <option value="indore">Indore</option>
                            <option value="bhopal">Bhopal</option>
                            <option value="ujjain">Ujjain</option>
                        </select>
                        {errors.city && <p className="text-red-500">{errors.city}</p>}
                    </div>

                    <div className="field-group border-black border-2 rounded-md p-2">
                        <label>Gender:</label>
                        <label htmlFor="male">
                            <input
                                type="radio"
                                name="gender"
                                id="male"
                                value="male"
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Male
                        </label>
                        <label htmlFor="female">
                            <input
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                                onChange={(e) => setGender(e.target.value)}
                            />
                            Female
                        </label>
                        {errors.gender && <p className="text-red-500">{errors.gender}</p>}
                    </div>

                    <div>
                        {switchbtn ? (
                            <button type="button" onClick={handleSave}>
                                Save
                            </button>
                        ) : (
                            <button type="button" className="bg-violet-500" onClick={handleUpdate}>
                                Update
                            </button>
                        )}

                        <button type="button" className="bg-orange-500 cursor-pointer" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </div>
            </form>

            <table className='m-auto border-gray-500 border-4 w-full'>
                <thead>
                    <tr className='text-lg font-bold bg-gray-600 text-white'>
                        <td>Serial No</td>
                        <td>Id</td>
                        <td>name</td>
                        <td>Age</td>
                        <td>Mobile</td>
                        <td>Email</td>
                        <td>Gender</td>
                        <td>City</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {user &&
                        user.map((item, index) => (
                            <tr key={index} className='border'>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.mobile}</td>
                                <td>{item.email}</td>
                                <td>{item.gender}</td>
                                <td>{item.city}</td>
                                <div className=''>
                                    <button className='bg-teal-600' onClick={(e) => handleEdit(item)}>Edit</button>
                                    <button className='bg-red-500' onClick={(e) => handleDelete(item.id)}>Delete</button>
                                </div>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
