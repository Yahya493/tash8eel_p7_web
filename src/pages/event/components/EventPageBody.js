
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo } from 'react';
import { useState } from 'react';
import EventDetails from '../EventDetails'


export default function EventPageBody({ events }) {

  const [eventId, setEventId] = useState()
  const [isEditing, setIsEditing] = useState(false)

  const dateFormatter = p => {
    const value = p.value.substring(0, 10).split('-')
    return `${value[2]}-${value[1]}-${value[0]}`
  }

  const timeFormatter = p => {
    const value = p.value.substring(11, 16).split(':')
    let time = (+value[0] > 12) ? `${+value[0] % 12}:${value[1]} PM` : `${+value[0]}:${value[1]} AM`
    return time
  }

  const columnDefs = [
    {
      headerName: 'Event Name',
      field: 'name',
      pinned: true
    },
    {
      field: 'validFrom',
      valueFormatter: dateFormatter,
    },
    {
      field: 'validTo',
      valueFormatter: dateFormatter,
    },
    {
      field: 'departureTime',
      valueFormatter: timeFormatter,
    },
    {
      field: 'arrivalTime',
      valueFormatter: timeFormatter,
    },
    {
      field: 'departureLocation',
    },
    {
      field: 'duration',
      valueFormatter: p => p.value + ' min'
    },
    {
      field: 'numberOfPerson',
    },
    {
      field: 'fees',
    },
    {
      field: 'buses',
      valueFormatter: p => p.value.length,
      // tooltipField: 'buses',
      tooltipValueGetter: p => p.value
    },
    {
      field: 'photos',
      valueFormatter: p => p.value.length,
      // tooltipValueGetter: p => p.value
    },
    {
      field: 'publishDate',
      valueFormatter: dateFormatter,
    },
    {
      field: 'description',
      tooltipValueGetter: p => p.value
    },
  ]

  const defaultColDef = useMemo(() => (
    {
      resizable: true,
      sortable: true,
      width: 170,
      // flex: 1
    }
  ), [])

  const handleRowDoubleClick = (e) => {
    // console.log(e)
    // console.log(e.data._id)
    setEventId(e.data._id)
    setIsEditing(true)
  }

  const handleMouseOver = (e) => {
    // const key = e.column.colId
    // console.log(e.value)
  }

  return (
    <div id='eventPageBody' className="ag-theme-alpine" /*style={{height: '83vh', width: '100%'}}*/>
      {isEditing ? <EventDetails id={eventId} isEditing={isEditing} exitEditing={setIsEditing} /> : null}
      <AgGridReact
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={events}
        onRowDoubleClicked={handleRowDoubleClick}
        onCellMouseOver={handleMouseOver}
      />
      {/* {events.map(event => <div className='eventCard' key={event._id}>
        <Link to={`/events/${event._id}`} >
          <img src={event.photos[0]} className='photo' alt='eventPhoto'/>
          <div id='details'>
            <h5>{event.name}</h5>
            Valid From: {event.validFrom}<br />
            Valid To: {event.validTo}<br />
            Departure Time: {event.departureTime}<br />
            Arrival Time: {event.arrivalTime}<br />
            Departure Location: {event.departureLocation}<br />
            Trail: {event.trail}<br />
            Buses: {event.buses}<br />
            Number Of Person: {event.numberOfPerson}<br />
            Duration: {event.duration}<br />
            Photos: {event.photos}<br />
            Fees: {event.fees}<br />
            Publish Date: {event.publishDate}<br />
            Description: {event.description}
          </div>
        </Link>
      </div>)} */}
    </div>
  )
}
