import React, { useEffect, useState } from 'react'
import EmployeeData from './EmployeeData'

export default function Test() {
    const [user, setUser] = useState()

    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [age, setAge] = useState("")
    const [id, setId] = useState()
    const [switchbtn, setSwitchbtn] = useState(true)

    // console.log(user);

    useEffect(() => {
        setUser(EmployeeData)
    }, [])

    const handleEdit = (itm) => {
        // console.log(itm);
        setSwitchbtn(false)
        setFName(itm.firstname)
        setLName(itm.lastname)
        setAge(itm.age)
        setId(itm.id)
    }

    const handleUpdate = function (event) {
        event.preventDefault();

        const mymap = user.map((data) => {
            return data.id
        })

        let index = mymap.indexOf(id)
        // console.log(index);

        // const dt = [...user[]
        const dt = [...user]

        dt[index].firstname = fName
        dt[index].lastname = lName
        dt[index].age = age
        // console.log(dt);
        setUser(dt)

        setSwitchbtn(true)
        setFName("")
        setLName("")
        setAge("")


    }

    function handleSave(e) {
        e.preventDefault()
        let l = user[(user.length - 1)].id
        // console.log("lengh" l);

        const add = {
            id: l + 1,
            firstname: fName,
            lastname: lName,
            age: age,
        }

        const user1 = [...user, add]
        console.log(user1);
        setUser(user1)
    }

    const handleClear = (e) => {
        e.preventDefault()
        setSwitchbtn(true)
        setFName("")
        setLName("")
        setAge("")
    }

    const handleDelete = (id) => {
        const filterdata = user.filter((item) => {
            return item.id !== id
        })
        setUser(filterdata)

    }

    return (
        <>
            <form action="" >
                <div className='mb-12'>
                    <input type="text" placeholder='enter your name' value={fName} onChange={(e) => setFName(e.target.value)} />
                    <input type="text" placeholder='enter your last name' value={lName} onChange={(e) => { setLName(e.target.value) }} />
                    <input type="text" placeholder='enter your age' value={age} onChange={(e) => setAge(e.target.value)} />

                    {
                        (switchbtn == true) ?
                            <button onClick={(e) => handleSave(e)} >Save </button>
                            : <button className='bg-violet-500' onClick={(e) => handleUpdate(e)}>Update </button>
                    }

                    <button className='bg-orange-500 cursor-pointer' onClick={handleClear}>Clear</button>
                </div>
            </form>

            <table className='m-auto border-black border-2 w-full'>
                <thead>
                    <tr className='text-lg font-bold bg-gray-600 text-white'>
                        <td>Serial No</td>
                        <td>Id</td>
                        <td>FirstName</td>
                        <td>LastName</td>
                        <td>Age</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {user &&
                        user.map((item, index) => (
                            <tr key={index} className='border'>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.firstname}</td>
                                <td>{item.lastname}</td>
                                <td>{item.age}</td>
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
