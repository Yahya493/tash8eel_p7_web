import React, { useEffect, useState } from 'react'
import BusDetailsHeader from './components/BusDetailsHeader'
import BusDetailsBody from './components/BusDetailsBody'
import './BusDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getBaseUrl } from '../../actions/urlService'
import ReactModal from 'react-modal';
import { deleteBus, getBusById , updateBus} from '../../actions/actions'

ReactModal.setAppElement('#root');

export default function BusDetails({ id, isEditing, exitEditing }) {
    const [bus, setBus] = useState({})
    const [driver, setDriver] = useState({})
    const drivers = useSelector(state => state.drivers)
    const buses = useSelector(state => state.buses)
    // const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [busNameVald, setBusNameVal] = useState('*')
    const [driverVald, setDriverVal] = useState('*')

    // const [isOpen, setIsOpen] = useState(isEditing);

    // const openModal = () => {
    //     setIsOpen(true);
    // };

    const closeModal = () => {
        exitEditing(false)
    };

    useEffect(() => {
        getBusById(id, setBus, setDriver)
        // const api = getBaseUrl()
        // fetch(api + "/buses", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ _id: id })
        // })
        //     .then(res => res.json())
        //     .then(bus => {
        //         fetch(api + "/drivers", {
        //             method: "POST",
        //             headers: {
        //                 "Content-Type": "application/json"
        //             },
        //             body: JSON.stringify({ _id: bus.driver })
        //         })
        //             .then(res => res.json())
        //             .then(driver => {
        //                 setBus(bus)
        //                 setDriver(driver)
        //             })
        //     })
    }, [])

    const handleDelete = () => {
        deleteBus(dispatch, bus, buses, drivers, closeModal)
        // const busInit = buses.find(item => item._id === bus._id)
        // const api = getBaseUrl()
        // fetch(api + '/buses' /*`/busesByDriver?user=${busInit.user}&driver=${busInit.driver}`*/, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({ user: busInit.user, driver:  busInit.driver})
        // })
        //     .then(res => res.json())
        //     .then(busArray => {
        //         if (busArray.length === 1) {
        //             fetch(api + `/deleteDriver/${busInit.driver}`, {
        //                 method: 'DELETE',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //             })
        //                 .then(res => res.json())
        //                 .then(deletedDriver => {
        //                     dispatch({ type: 'setDrivers', drivers: drivers.filter(driver => driver._id !== deletedDriver.data._id) })
        //                     console.log(`${deletedDriver.data.name}: ${deletedDriver.status}`)
        //                 })
        //         }
        //         fetch(api + `/deleteBus/${busInit._id}`, {
        //             method: 'DELETE',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         })
        //             .then(res => res.json())
        //             .then(deletedBus => {
        //                 dispatch({ type: 'setBuses', buses: buses.filter(buses => buses._id !== deletedBus.data._id) })
        //                 console.log(`${deletedBus.data.name}: ${deletedBus.status}`)
        //                 // dispatch({type:'update'})
        //                 closeModal()
        //             })
        //     })
    }

    const checkBusForm = () => {
        setBusNameVal('*')
        setDriverVal('*')
        let valide = true

        if (bus.name === '') {
            setBusNameVal('required')
            valide = false
        }
        if (bus.driver === '') {
            setDriverVal('required')
            valide = false
        }

        return valide
    }

    const handleUpdate = () => {
        if(!checkBusForm()) return

        updateBus(dispatch, bus, buses, closeModal)
        // const api = getBaseUrl()
        // if (bus.name === '' || bus.driver === '') {
        //     console.log("Bus name and driver shoudn't be empty!")
        //     return
        // }
        // fetch(api + "/updateBus",
        //     {
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(bus)
        //     })
        //     .then(res => res.json())
        //     .then(updatedBus => {
        //         dispatch({ type: 'setBuses', buses: [updatedBus, ...buses.filter(buses => buses._id !== updatedBus._id)] })
        //         console.log(`Bus: ${updatedBus.name} has been updated`)
        //         // dispatch({type:'update'})
        //         closeModal()
        //     })
    }

    const handleName = (e) => {
        setBus({ ...bus, name: e.target.value })
    }

    const handleSeats = (e) => {
        setBus({ ...bus, seats: e.target.value })
    }

    const handleDescription = (e) => {
        setBus({ ...bus, description: e.target.value })
    }

    const handleDriver = (e) => {
        setBus({ ...bus, driver: e.target.value })
        setDriver(drivers.find(driver => driver._id === e.target.value))
    }

    return (
        <div  className='busDetails'>

            {/* <button onClick={openModal}>Open Modal</button> */}
            <ReactModal isOpen={isEditing} onRequestClose={closeModal} className='busModal' shouldCloseOnOverlayClick={false}>
                <BusDetailsHeader handleUpdate={handleUpdate} handleDelete={handleDelete} handleCancel={closeModal} />
                <BusDetailsBody
                    bus={bus}
                    driver={driver}
                    handleName={handleName}
                    handleSeats={handleSeats}
                    handleDriver={handleDriver}
                    handleDescription={handleDescription}
                    busNameVald={busNameVald}
                    driverVald={driverVald}
                />
            </ReactModal>
        </div>
    )
}
