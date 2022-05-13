import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import {RestaurantsContext} from '../context/RestaurantsContext';

export const UpdateRestaurant = (props) => {
    const {id}= useParams();
    const {restaurants}=useContext(RestaurantsContext);
    const[name,setName]=useState("");
    const[location,setLocation]=useState("");
    const[price_range,setPriceRange]=useState("");
    let navigate= useNavigate();

    useEffect(()=>{
        const fetchData= async() => {
            const response= await RestaurantFinder.get(`/${id}`);
            console.log(response.data.data.restaurant.name);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        }
        fetchData();
    },[]);

    const handleSubmit= async (e)=>
    {
        e.preventDefault();
        const updateRestaurant= await RestaurantFinder.put(`/${id}`,{
            name,
            location,
            price_range: price_range
        });
        console.log(updateRestaurant);
        navigate('/');
    }

    return (
    <div>
        <form action=''>
        <div className="form-group">
            <label htmlFor='name'>Name</label>
            <input value={name} onChange={(e)=> setName(e.target.value)} type="text" id="name" className="form-control"/>
        </div>
        <div className="form-group">
            <label htmlFor='location'>Location</label>
            <input value={location} onChange={(e)=> setLocation(e.target.value)} type="text" id="location" className="form-control"/>
        </div>
        <div className="form-group">
            <label htmlFor='price_range'>Price Range</label>
            <input value={price_range} onChange={(e)=> setPriceRange(e.target.value)} type="number" id="price_range" className="form-control"/>
        </div>
        <button onClick={handleSubmit} type="submit" className='btn btn-primary'>Save</button>
        </form>
    </div>
  )
}

export default UpdateRestaurant;