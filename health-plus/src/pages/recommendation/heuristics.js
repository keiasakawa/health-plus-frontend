import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { instance } from '../../utils'


// We calculate the recommended meals and return the top 10
const RecommendedMeal = (id) => {

    const [profile, setProfile] = useState(null)
    const [health, setHealth ] = useState(null)

    const getProfile = async() => {
        try {
            const res = await instance.get(`users/info/${id}`)
            setProfile(res.data);
        }
        catch (err) {
            console.error(err.message)
        }
    }

    const getHealth = async() => {
        try {
            const res = await instance.get(`users/health/${id}`)
            setHealth(res.data);
        }
        catch (err) {
            console.error(err.message)
        }
    }

    getProfile();
    getHealth();
    let bmr;
    if (profile.gender === "male") {
        bmr = 66.5 + (13.75 * (profile.weight / 2.2)) + (5 * (profile.height * 2.54)) - (6.75 * profile.age) 
    }
    else if (profile.gender === "female") {
        bmr = 655.1 + (9.563 * (profile.weight /2.2)) + (1.85 * (profile.height * 2.54)) - (4.676 * profile.age)
    }

    // TODO: Find equation for non binary/ gender fluid population

    // TODO: Determine appropriate activity factor

    let calories;
    if (profile.fitness_goal === "lose") {
        calories = bmr - 500
    }
    else if (profile.fitness_goal === "gain") {
        calories = bmr + 500
    }
    else {
        calories = bmr
    }

    let protein = profile.weight * 0.8

    let carbs = (calories * .52) / 4

    let fats = (calories * .28) / 9

    // TODO: Get first 10 meals with this information. Lets aim for +/- 100 calories and for the rest of the macros, lets do +/- 5
    return;
}

export default RecommendedMeal;