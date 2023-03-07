import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { instance } from '../../utils'


// We calculate the recommended meals and return the top 10
async function RecommendedMeal(healthData) {
    console.log("Health Data before sending", healthData);
    const res = await instance.post('meals/recommend', healthData);
    console.log("Meal data after API call", res);

    /*const [profile, setProfile] = useState(null)
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

    // getProfile();
    // getHealth();
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



    // TODO: Get first 10 meals with this information. Lets aim for +/- 100 calories and for the rest of the macros, lets do +/- 5 */
    console.log("Returning that dang meal data");
    return [{image: 'https://www.allrecipes.com/thmb/mKY06P7OC1BDREL8DoSNxCK2vAo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2295590-Best-Ever-Meatloaf-ddmfs-083-4x3-1-6d7604c8b4204abd832a26ef85d0e58e.jpg', 
    name: 'Best Ever Meat Loaf', 
    protein: 28, carbs: 22, fats: 23, cals: 410, 
    description: 'This best ever meatloaf recipe lives up to its name and is my favorite I have found. Try it and you will see.'}];
}

export default RecommendedMeal;